import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  getDatabase,
  onDisconnect,
  onValue,
  ref,
  runTransaction,
  serverTimestamp,
  set,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCuXkwI9fisfNb5wBclEF9m7KQmy9K4ngI",
  authDomain: "protfolio-d8443.firebaseapp.com",
  databaseURL: "https://protfolio-d8443-default-rtdb.firebaseio.com",
  projectId: "protfolio-d8443",
  storageBucket: "protfolio-d8443.firebasestorage.app",
  messagingSenderId: "656326953031",
  appId: "1:656326953031:web:dbdfcaf068c0729cb20962",
  measurementId: "G-S56ZEF3Y3S",
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
let analyticsPromise;
let anonymousSignInPromise;
const trackedViews = new Map();
const sessionTabId = window.crypto?.randomUUID?.()
  || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

function getDhakaDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function pageLabel(page) {
  return page === "home" ? "Home" : page.charAt(0).toUpperCase() + page.slice(1);
}

function nextDhakaMidnightDelay() {
  const now = Date.now();
  const dhakaClock = new Date(now + 6 * 60 * 60 * 1000);
  const nextMidnightUtc = Date.UTC(
    dhakaClock.getUTCFullYear(),
    dhakaClock.getUTCMonth(),
    dhakaClock.getUTCDate() + 1,
  ) - 6 * 60 * 60 * 1000;
  return Math.max(1_000, nextMidnightUtc - now + 100);
}

function ensureAnonymousUser() {
  if (auth.currentUser) return Promise.resolve(auth.currentUser);
  anonymousSignInPromise ??= signInAnonymously(auth)
    .then(({ user }) => user)
    .catch((error) => {
      anonymousSignInPromise = null;
      throw error;
    });
  return anonymousSignInPromise;
}

async function incrementCounter(path) {
  const result = await runTransaction(
    ref(database, path),
    (currentValue) => (Number.isFinite(currentValue) ? currentValue : 0) + 1,
    { applyLocally: false },
  );
  if (!result.committed) throw new Error(`Could not increment ${path}`);
}

async function incrementPortfolioViews(page) {
  await ensureAnonymousUser();
  const today = getDhakaDate();
  await Promise.all([
    incrementCounter("portfolioStats/totalViews"),
    incrementCounter(`portfolioStats/pageViews/${page}`),
    incrementCounter(`portfolioStats/dailyViews/${today}/total`),
    incrementCounter(`portfolioStats/dailyViews/${today}/pages/${page}`),
  ]);
}

export function trackPortfolioPage(page, viewId) {
  if (viewId && trackedViews.has(viewId)) return trackedViews.get(viewId);

  const trackingTask = (async () => {
    const analyticsTask = (async () => {
      if (!import.meta.env.PROD) return;
      analyticsPromise ??= isSupported().then((supported) => (supported ? getAnalytics(firebaseApp) : null));
      const analytics = await analyticsPromise;
      if (!analytics) return;
      const path = page === "home" ? "/" : `/${page}`;
      logEvent(analytics, "portfolio_page_view", {
        page_name: pageLabel(page),
        page_path: path,
        page_title: `${pageLabel(page)} | MD. Mueid Shahriar`,
      });
    })();

    const [, viewResult] = await Promise.allSettled([analyticsTask, incrementPortfolioViews(page)]);
    if (viewResult.status === "rejected") throw viewResult.reason;
  })();

  if (viewId) {
    trackedViews.set(viewId, trackingTask);
    if (trackedViews.size > 100) trackedViews.delete(trackedViews.keys().next().value);
    trackingTask.catch(() => trackedViews.delete(viewId));
  }

  return trackingTask;
}

export function subscribePortfolioStats(page, onStats, onConnection) {
  let active = true;
  let heartbeatId;
  let todayTimerId;
  let todayUnsubscribe;
  const unsubscribers = [];
  let user;

  const updatePresence = async () => {
    if (!active || !user) return;
    const presenceRef = ref(database, `portfolioStats/presence/${user.uid}/${sessionTabId}`);
    await set(presenceRef, { page, lastSeen: serverTimestamp() });
    if (active) onConnection("connected");
  };

  const startSubscriptions = (signedInUser = null) => {
    if (!active) return;
    user = signedInUser;

    const watchNumber = (path, key) => {
      const unsubscribe = onValue(
        ref(database, path),
        (snapshot) => {
          if (!active) return;
          onStats((current) => ({ ...current, [key]: Number(snapshot.val()) || 0 }));
        },
        () => active && onConnection("unavailable"),
      );
      unsubscribers.push(unsubscribe);
    };

    watchNumber("portfolioStats/totalViews", "totalViews");
    watchNumber(`portfolioStats/pageViews/${page}`, "pageViews");

    const refreshTodayCounter = () => {
      todayUnsubscribe?.();
      todayUnsubscribe = onValue(
        ref(database, `portfolioStats/dailyViews/${getDhakaDate()}/total`),
        (snapshot) => {
          if (active) onStats((current) => ({ ...current, todayViews: Number(snapshot.val()) || 0 }));
        },
        () => active && onConnection("unavailable"),
      );
    };
    const scheduleTodayRefresh = () => {
      todayTimerId = window.setTimeout(() => {
        if (!active) return;
        refreshTodayCounter();
        scheduleTodayRefresh();
      }, nextDhakaMidnightDelay());
    };
    refreshTodayCounter();
    scheduleTodayRefresh();

    const presenceUnsubscribe = onValue(
      ref(database, "portfolioStats/presence"),
      (snapshot) => {
        if (!active) return;
        const now = Date.now();
        const onlineUsers = new Set();
        const pageUsers = new Set();
        snapshot.forEach((userSnapshot) => {
          userSnapshot.forEach((tabSnapshot) => {
            const session = tabSnapshot.val();
            if (session && Number(session.lastSeen) >= now - 90_000 && Number(session.lastSeen) <= now + 5_000) {
              onlineUsers.add(userSnapshot.key);
              if (session.page === page) pageUsers.add(userSnapshot.key);
            }
          });
        });
        onStats((current) => ({
          ...current,
          onlineNow: onlineUsers.size,
          currentPageOnline: pageUsers.size,
        }));
      },
      () => active && onConnection("unavailable"),
    );
    unsubscribers.push(presenceUnsubscribe);

    const connectionUnsubscribe = onValue(
      ref(database, ".info/connected"),
      async (snapshot) => {
        if (!active) return;
        if (!snapshot.val()) {
          onConnection("connecting");
          return;
        }
        try {
          if (!user) return;
          const presenceRef = ref(database, `portfolioStats/presence/${user.uid}/${sessionTabId}`);
          await onDisconnect(presenceRef).remove();
          await updatePresence();
          if (heartbeatId === undefined) {
            heartbeatId = window.setInterval(() => {
              updatePresence().catch(() => active && onConnection("unavailable"));
            }, 30_000);
          }
        } catch {
          if (active) onConnection("unavailable");
        }
      },
      () => active && onConnection("unavailable"),
    );
    unsubscribers.push(connectionUnsubscribe);
  };

  ensureAnonymousUser()
    .then(startSubscriptions)
    .catch(() => active && onConnection("unavailable"));

  return () => {
    active = false;
    if (heartbeatId !== undefined) window.clearInterval(heartbeatId);
    if (todayTimerId !== undefined) window.clearTimeout(todayTimerId);
    todayUnsubscribe?.();
    unsubscribers.forEach((unsubscribe) => unsubscribe());
  };
}
