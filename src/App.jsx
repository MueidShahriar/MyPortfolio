import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight, Menu, X, Github, Mail, Phone, MapPin, Linkedin, MessageCircle,
  Code2, Smartphone, Palette, Users, ExternalLink, Activity, Terminal, Layers3, Search, Command,
  Award, Bot, Database, Sparkles, Eye, Globe, TrendingUp, Send
} from "lucide-react";
import { projects } from "./data/projects";
import { skillGroups } from "./data/skills";
import { creativeWorks } from "./data/creativeWorks";
import { certificates } from "./data/certificates";
import { additionalService, leadershipOrganizations } from "./data/leadership";
import profileImage from "../img/mueid.jpeg";

const nav = ["Home","About","Projects","Creative","Skills","Experience","Leadership","Education","Certificates","Contact"];
const sections = nav;
const skillGroupIcons = [Code2, Layers3, Smartphone, Users, Activity, Palette, Command];
const routeFor = (label) => label === "Home" ? "/" : `/${label.toLowerCase()}`;
const currentPage = () => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return nav.find((label) => routeFor(label) === path)?.toLowerCase() || "home";
};
const focusModes = {
  build: {
    label: "BUILD",
    eyebrow: "SOFTWARE · SYSTEMS · PRODUCT",
    title: "Turning complex ideas into useful software.",
    description: "I design and develop practical web and mobile products with clear interfaces, reliable data flows and a strong focus on real users.",
    code: "shipProduct()",
    metric: "03 shipped product concepts",
    icon: Code2,
  },
  design: {
    label: "DESIGN",
    eyebrow: "VISUALS · INTERACTION · IDENTITY",
    title: "Making technology feel clear and human.",
    description: "I bring a visual and interaction design perspective to every build, shaping interfaces that are expressive, understandable and memorable.",
    code: "shapeExperience()",
    metric: "01 engineer with a design lens",
    icon: Palette,
  },
  impact: {
    label: "IMPACT",
    eyebrow: "COMMUNITY · LEADERSHIP · MOMENTUM",
    title: "Building work that moves people forward.",
    description: "From blood donation operations to student organizations, I use technology, communication and leadership to turn participation into measurable impact.",
    code: "createImpact()",
    metric: "200+ community donations",
    icon: Activity,
  },
};

function Navbar({ page, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const closeMenu = () => setOpen(false);
    const closeOnOutsidePointer = (event) => {
      const target = event.target;
      if (target instanceof Element && (target.closest("#mobile-navigation") || target.closest(".menu-toggle"))) return;
      closeMenu();
    };
    const closeOnScroll = (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("#mobile-navigation")) return;
      closeMenu();
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("scroll", closeOnScroll, true);
    window.addEventListener("blur", closeMenu);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("scroll", closeOnScroll, true);
      window.removeEventListener("blur", closeMenu);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all sm:px-4 sm:pt-4 lg:px-6 lg:pt-5 ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-nav mx-auto flex max-w-[88rem] items-center justify-between">
        <a href="/" onClick={(event) => onNavigate(event, "/")} className="site-brand"><span className="site-brand-mark"><Code2 size={17}/></span><span>MD. MUEID <b>SHAHRIAR</b></span></a>
        <nav aria-label="Main navigation" className="desktop-nav hidden items-center gap-0 xl:flex">
          {nav.map((item) => <a key={item} href={routeFor(item)} onClick={(event) => onNavigate(event, routeFor(item))} aria-current={page === item.toLowerCase() ? "page" : undefined} className={`nav-link ${page === item.toLowerCase() ? "is-active" : ""}`}>{item}</a>)}
        </nav>
        <div className="nav-actions hidden items-center gap-2 xl:flex">
          <a href="/contact" onClick={(event) => onNavigate(event, "/contact")} className="nav-connect rounded-full border border-white/15 px-4 py-2 text-xs font-medium transition hover:border-white/30 hover:bg-white/5">Let's Connect <ArrowUpRight size={14}/></a>
        </div>
        <div className="mobile-header-actions flex items-center gap-2 xl:hidden"><a href="/contact" onClick={(event) => onNavigate(event, "/contact")} className="nav-connect-mobile"><Mail size={14}/> Contact</a><button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" className="menu-toggle" onClick={() => setOpen(!open)}>{open ? <X size={17}/> : <Menu size={17}/>}</button></div>
      </div>
      {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav grid grid-cols-1 gap-2 sm:grid-cols-2 xl:hidden">
        {nav.map((item) => <a key={item} onClick={(event) => { setOpen(false); onNavigate(event, routeFor(item)); }} href={routeFor(item)} aria-current={page === item.toLowerCase() ? "page" : undefined} className={`mobile-nav-link ${page === item.toLowerCase() ? "is-active" : ""}`}>{item}<ArrowUpRight size={13}/></a>)}
      </nav>}
    </header>
  );
}

function PageArtwork({ number }) {
  const artwork = {
    "01": <><rect className="art-panel" x="34" y="22" width="112" height="136" rx="15"/><path d="M49 43h30M49 52h22M49 137h25"/><circle className="art-soft-fill" cx="108" cy="70" r="20"/><path className="art-soft-fill" d="M72 130c3-22 16-34 36-34s33 12 36 34"/><path d="M100 68c4-5 11-5 16 0M104 77h8"/><path d="m30 35-8 8 8 8M150 125l8 8-8 8"/></>,
    "02": <><path className="art-soft-fill" d="m31 53 63-31 54 23-63 32z"/><path d="m31 53 54 24v62l-54-25zM85 77l63-32v61l-63 33z"/><path d="m43 59 42 19 49-25M49 76l26 12M49 87l26 12M98 88l38-19M98 101l38-19M98 114l25-13"/><path d="m124 128 18 9-20 8"/></>,
    "03": <><path className="art-soft-fill" d="M91 26c-35 0-63 25-63 57 0 30 22 53 48 53h10c7 0 11-8 7-14-5-7-2-14 7-14h14c21 0 37-15 37-36 0-25-27-46-60-46Z"/><circle className="art-cutout" cx="63" cy="64" r="7"/><circle className="art-cutout" cx="89" cy="51" r="7"/><circle className="art-cutout" cx="114" cy="62" r="7"/><circle className="art-cutout" cx="68" cy="91" r="7"/><path d="m111 126 30-48 10 7-30 48-16 8z"/><path d="m111 126 10 7"/></>,
    "04": <><path d="M28 145h126M35 145V93h17v52M63 145V69h17v76M91 145V84h17v61M119 145V46h17v99"/><path className="art-soft-fill" d="m34 76 33-27 30 12 35-35 16 9-46 43-32-12-29 24z"/><path d="m34 76 33-27 30 12 35-35 16 9-46 43-32-12-29 24z"/><circle className="art-node" cx="132" cy="26" r="4"/></>,
    "05": <><path d="M28 136h124M43 137V48M89 137V76M137 137V35"/><path className="art-route" d="M43 101c19 0 20-34 42-34s18 39 39 39 20-47 36-47"/><circle className="art-node" cx="43" cy="101" r="5"/><circle className="art-node" cx="85" cy="67" r="5"/><circle className="art-node" cx="124" cy="106" r="5"/><circle className="art-node" cx="160" cy="59" r="5"/><path d="M34 35h24v20H34zM80 62h18v18H80zM128 21h18v18h-18z"/></>,
    "06": <><path d="m90 80-45-36M90 80l48-41M90 80l-54 40M90 80l54 43M90 80V25"/><path className="art-soft-fill" d="M68 78c0-13 10-23 22-23s22 10 22 23-10 23-22 23-22-10-22-23Z"/><circle className="art-node" cx="45" cy="42" r="8"/><circle className="art-node" cx="140" cy="38" r="8"/><circle className="art-node" cx="33" cy="123" r="8"/><circle className="art-node" cx="151" cy="128" r="8"/><circle className="art-node" cx="90" cy="22" r="8"/><path d="M70 133h40M77 143h26"/></>,
    "07": <><path className="art-soft-fill" d="m22 56 66-26 69 26-67 28z"/><path d="m22 56 68 28v12L22 68zM157 56 90 84v12l67-28z"/><path d="m45 70 1 31c25 18 53 18 88 0V70M90 84v13"/><path d="M48 111c26 15 51 15 86 0M77 119l13 7 13-7"/><path d="M155 57v39M151 96h8"/></>,
    "08": <><path className="art-soft-fill" d="M54 24h55l28 28v98H54z"/><path d="M109 24v30h28M68 73h53M68 86h45M68 99h40"/><path className="art-panel" d="m117 119 9 9 17-20 9 8-25 29-18-18z"/><circle cx="76" cy="126" r="5"/><path d="m36 39-9 9 9 9M153 45l9 9-9 9"/></>
  }[number];

  return <svg viewBox="0 0 180 180" fill="none" aria-hidden="true">{artwork}</svg>;
}

function SectionHeading({number, title, children}) {
  return <div className="page-heading mb-12">
    <div className="page-heading-copy"><p className="mb-4 text-xs font-medium tracking-[0.25em] text-violet-300">{number} — {title}</p>{children}</div>
    <div className={`page-heading-art page-heading-art-${number}`} aria-hidden="true">
      <PageArtwork number={number}/>
    </div>
  </div>
}

function ProjectPreview({ project }) {
  if (!project.live) {
    return <div className="project-unavailable">
      <Smartphone size={22}/>
      <span className="project-preview-label">NO PUBLIC PREVIEW</span>
      <p>{project.type === "phone" ? "This Android project has no hosted build or screenshot attached yet." : "A live preview has not been provided for this project."}</p>
      {project.github && <a href={project.github} target="_blank" rel="noreferrer">View source code <ExternalLink size={14}/></a>}
    </div>;
  }

  return <div className="project-live-frame">
    <div className="project-live-toolbar">
      <span><i/> LIVE PROJECT</span>
      <a href={project.live} target="_blank" rel="noreferrer">Open full site <ExternalLink size={13}/></a>
    </div>
    <iframe src={project.live} title={`${project.title} live project`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="fullscreen" />
  </div>;
}


function CommandPalette({ open, onClose, onFocusChange, onNavigate }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setSelected(0);
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const commands = [
    ...sections.map((item) => ({ label: `Open ${item} page`, detail: "PAGE", action: () => onNavigate(routeFor(item)) })),
    ...projects.map((project) => ({ label: `Open ${project.title}`, detail: "PROJECT", action: () => onNavigate("/projects") })),
    ...Object.entries(focusModes).map(([key, mode]) => ({ label: `Show ${mode.label.toLowerCase()} perspective`, detail: "HERO LENS", action: () => { onFocusChange(key); onNavigate("/"); } })),
  ];
  const visibleCommands = commands.filter((item) => `${item.label} ${item.detail}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => setSelected(0), [query]);
  if (!open) return null;

  const runCommand = (command) => {
    command.action();
    onClose();
  };

  return <div className="command-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="command-palette" role="dialog" aria-modal="true" aria-label="Portfolio quick navigation">
      <div className="command-search"><Search size={18}/><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => {
        if (event.key === "ArrowDown") { event.preventDefault(); setSelected((value) => Math.min(value + 1, visibleCommands.length - 1)); }
        if (event.key === "ArrowUp") { event.preventDefault(); setSelected((value) => Math.max(value - 1, 0)); }
        if (event.key === "Enter" && visibleCommands[selected]) runCommand(visibleCommands[selected]);
      }} placeholder="Jump to a section, project, or perspective…" aria-label="Search portfolio commands"/><kbd>ESC</kbd><button className="command-close" onClick={onClose} aria-label="Close command palette"><X size={16}/></button></div>
      <div className="command-results" role="listbox" aria-label="Commands">
        {visibleCommands.length ? visibleCommands.map((command, index) => <button key={`${command.detail}-${command.label}`} role="option" aria-selected={selected === index} className={`command-option ${selected === index ? "is-selected" : ""}`} onMouseEnter={() => setSelected(index)} onClick={() => runCommand(command)}><span>{command.label}</span><span className="command-detail">{command.detail}</span></button>) : <p className="command-empty">No matching sections or projects.</p>}
      </div>
      <div className="command-footer"><span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span><span><kbd>↵</kbd> to open</span><span className="command-brand"><Command size={13}/> MUEID.SH</span></div>
    </section>
  </div>;
}

function PagePreloader({ page }) {
  const title = page === "home" ? "Home" : page.charAt(0).toUpperCase() + page.slice(1);
  const pageNumber = String(nav.findIndex((item) => item.toLowerCase() === page) + 1).padStart(2, "0");
  return <div className="page-preloader" role="status" aria-live="polite" aria-label={`Loading ${title} page`}>
    <div className="preloader-glow preloader-glow-one"/>
    <div className="preloader-glow preloader-glow-two"/>
    <div className="preloader-grid" aria-hidden="true"/>
    <div className="preloader-topline"><span className="preloader-brand"><span className="preloader-brand-mark"><Code2 size={17}/></span>MUEID <b>SHAHRIAR</b></span><span className="preloader-status"><i/> PAGE {pageNumber} / {String(nav.length).padStart(2, "0")}</span></div>
    <div className="preloader-center">
      <div className="preloader-emblem" aria-hidden="true"><span className="preloader-orbit preloader-orbit-one"/><span className="preloader-orbit preloader-orbit-two"/><span className="preloader-orbit preloader-orbit-three"/><span className="preloader-emblem-core"><Code2 size={26}/></span><i className="preloader-spark preloader-spark-one"/><i className="preloader-spark preloader-spark-two"/></div>
      <p className="preloader-eyebrow">A DIGITAL PORTFOLIO</p>
      <h2>{title}</h2>
      <p className="preloader-subtitle">A portfolio shaped with purpose</p>
      <div className="preloader-progress-wrap" aria-hidden="true"><div className="preloader-progress-caption"><span>LOADING EXPERIENCE</span></div><div className="preloader-progress"><span/></div></div>
    </div>
    <div className="preloader-footer"><span>DESIGN · DEVELOPMENT · IMPACT</span><span className="preloader-loading"><i/> LOADING</span></div>
  </div>;
}

function createPageViewId() {
  return window.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function VisitorStats({ page }) {
  const [stats, setStats] = useState(null);
  const [connection, setConnection] = useState("connecting");
  const [writeIssue, setWriteIssue] = useState(null);
  const pageView = useRef(null);
  if (!pageView.current || pageView.current.page !== page) pageView.current = { page, id: createPageViewId() };

  useEffect(() => {
    const viewId = pageView.current.id;
    let active = true;
    let unsubscribe;
    setWriteIssue(null);
    setStats((current) => ({ ...current, pageViews: undefined, currentPageOnline: undefined }));

    import("./firebase")
      .then(({ trackPortfolioPage, subscribePortfolioStats }) => {
        if (!active) return;
        void trackPortfolioPage(page, viewId).catch((error) => {
          if (!active) return;
          setWriteIssue(error?.code?.startsWith("auth/") ? "auth-setup" : "write-blocked");
        });
        unsubscribe = subscribePortfolioStats(page, setStats, setConnection);
      })
      .catch(() => active && setConnection("unavailable"));

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [page]);

  const count = (value) => Number.isFinite(Number(value)) ? new Intl.NumberFormat().format(Number(value)) : "—";

  return <section className="visitor-stats-wrap" aria-labelledby="visitor-stats-title">
    <div className="visitor-stats-panel">
      <div className="visitor-stats-heading">
        <h2 id="visitor-stats-title"><i aria-hidden="true"/>PAGE VISITS</h2>
        <div className="visitor-stats-meta">
          <span
            className={`visitor-stats-status is-${writeIssue || connection}`}
            aria-live="polite"
            title={writeIssue === "auth-setup" ? "Enable Anonymous sign-in and authorize this website domain in Firebase Authentication." : writeIssue ? "Firebase Realtime Database rejected the visitor counter write." : undefined}
          >
            <i aria-hidden="true"/>{writeIssue === "auth-setup" ? "AUTH SETUP" : writeIssue === "write-blocked" ? "WRITE BLOCKED" : connection === "connected" ? "LIVE" : connection === "connecting" ? "CONNECTING" : "UNAVAILABLE"}
          </span>
          <span><strong>{count(stats?.onlineNow)}</strong> online now</span>
          <span><strong>{count(stats?.currentPageOnline)}</strong> on this page</span>
        </div>
      </div>
      <div className="visitor-stats-summary">
        <article className="visitor-stat-card"><span className="visitor-stat-icon"><Eye size={17}/></span><div><span className="visitor-stat-label">THIS PAGE</span><strong>{count(stats?.pageViews)}</strong></div></article>
        <article className="visitor-stat-card"><span className="visitor-stat-icon"><Globe size={17}/></span><div><span className="visitor-stat-label">WEBSITE</span><strong>{count(stats?.totalViews)}</strong></div></article>
        <article className="visitor-stat-card"><span className="visitor-stat-icon"><TrendingUp size={17}/></span><div><span className="visitor-stat-label">TODAY</span><strong>{count(stats?.todayViews)}</strong></div></article>
      </div>
    </div>
  </section>;
}

function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const replyTimer = useRef(null);
  const wordTimer = useRef(null);
  const messagesRef = useRef(null);
  const pointerGaze = useRef(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m AI Assistant. Ask me about Mueid’s work or schedule a contact." },
  ]);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  useEffect(() => () => {
    window.clearTimeout(replyTimer.current);
    window.clearInterval(wordTimer.current);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const handlePointerMove = (event) => {
      const bot = document.querySelector(".portfolio-bot-face");
      if (!bot) return;
      pointerGaze.current = true;
      const rect = bot.getBoundingClientRect();
      setGaze({
        x: Math.max(-3, Math.min(3, (event.clientX - (rect.left + rect.width / 2)) / 28)),
        y: Math.max(-3, Math.min(3, (event.clientY - (rect.top + rect.height / 2)) / 28)),
      });
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (mediaQuery.matches) return;
    const idleGaze = window.setInterval(() => {
      if (pointerGaze.current) return;
      setGaze((current) => ({
        x: current.x === 0 ? (Math.random() > 0.5 ? 2 : -2) : 0,
        y: current.y === 0 ? (Math.random() > 0.5 ? 1 : -1) : 0,
      }));
    }, 1700);
    return () => window.clearInterval(idleGaze);
  }, []);

  useEffect(() => {
    const messagesElement = messagesRef.current;
    if (!messagesElement) return;
    const frame = window.requestAnimationFrame(() => {
      messagesElement.scrollTop = messagesElement.scrollHeight;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages, isTyping, open]);

  const replyTo = (question) => {
    const text = question.toLowerCase();
    if (text.includes("project")) return "Mueid builds practical web and mobile products, including donor coordination and community-focused platforms.";
    if (text.includes("skill") || text.includes("technology")) return "His toolkit includes JavaScript, React, Firebase, web development, mobile development, UI/UX, and graphics design.";
    if (text.includes("leadership") || text.includes("club")) return "He currently contributes to BAUET BDC, BARC, Hult Prize, ICT Club, Welfare Club, BPMC, BMIC and IEEE BAUET Student Branch.";
    if (text.includes("contact") || text.includes("email") || text.includes("schedule") || text.includes("meeting")) {
      setScheduleOpen(true);
      return "Sure! Choose a preferred date and time below. I’ll prepare an email request for Mueid.";
    }
    return "I can tell you about Mueid’s projects, skills, leadership experience, or how to contact him.";
  };

  const submit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const question = input.trim();
    if (!question || isTyping) return;
    const reply = replyTo(question);
    setMessages((current) => [...current, { from: "user", text: question }]);
    setInput("");
    setIsTyping(true);
    replyTimer.current = window.setTimeout(() => {
      const words = reply.split(" ");
      let wordIndex = 0;
      setMessages((current) => [...current, { from: "bot", text: "" }]);
      wordTimer.current = window.setInterval(() => {
        wordIndex += 1;
        setMessages((current) => current.map((message, index) => (
          index === current.length - 1 ? { ...message, text: words.slice(0, wordIndex).join(" ") } : message
        )));
        if (wordIndex >= words.length) {
          window.clearInterval(wordTimer.current);
          setIsTyping(false);
        }
      }, 75);
    }, Math.min(1800, Math.max(650, reply.length * 18)));
  };

  const scheduleContact = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Contact schedule request — ${data.get("topic")}`);
    const body = encodeURIComponent(`Hi Mueid,\n\nI would like to schedule a contact.\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nPreferred date: ${data.get("date")}\nPreferred time: ${data.get("time")}\nTopic: ${data.get("topic")}\n\nSent through AI Assistant.`);
    window.location.href = `mailto:mueidshahriar_cse1616@std.bauet.ac.bd?subject=${subject}&body=${body}`;
  };

  return <aside className={`portfolio-chatbot ${open ? "is-open" : ""}`}>
    {open && <div className="portfolio-chat-panel" role="dialog" aria-label="AI Assistant">
      <div className="portfolio-chat-heading"><div><span className="portfolio-chat-status"/><strong>AI ASSISTANT</strong><small>CONTACT &amp; PORTFOLIO GUIDE</small></div><button type="button" onClick={() => setOpen(false)} aria-label="Close AI Assistant">×</button></div>
      <div ref={messagesRef} className="portfolio-chat-messages" aria-live="polite">{messages.map((message, index) => <p className={`portfolio-chat-message is-${message.from}`} key={`${message.from}-${index}`}>{message.text}</p>)}{isTyping && !messages.at(-1)?.text && <p className="portfolio-chat-message is-bot portfolio-chat-typing" aria-label="AI Assistant is typing"><i/><i/><i/></p>}</div>
      {scheduleOpen && <form className="portfolio-schedule-form" onSubmit={scheduleContact}>
        <strong>Schedule a contact</strong>
        <input name="name" required placeholder="Your name" aria-label="Your name"/>
        <input name="email" required type="email" placeholder="Your email" aria-label="Your email"/>
        <div className="portfolio-schedule-row"><input name="date" required type="date" aria-label="Preferred date"/><input name="time" required type="time" aria-label="Preferred time"/></div>
        <input name="topic" required placeholder="What would you like to discuss?" aria-label="Discussion topic"/>
        <button type="submit">Prepare email request <ArrowUpRight size={13}/></button>
      </form>}
      <form className="portfolio-chat-form" onSubmit={submit} onClick={(event) => event.stopPropagation()}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask me anything..." aria-label="Ask the AI assistant" disabled={isTyping}/><button type="submit" aria-label="Send message" disabled={isTyping}><Send size={15}/></button></form>
    </div>}
    <button type="button" className="portfolio-bot-launcher" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close AI assistant" : "Open AI assistant"}>
      <span className="portfolio-bot-face" style={{ "--gaze-x": `${gaze.x}px`, "--gaze-y": `${gaze.y}px` }}><span className="portfolio-bot-antenna"/><span className="portfolio-bot-ear portfolio-bot-ear-left"/><span className="portfolio-bot-ear portfolio-bot-ear-right"/><span className="portfolio-bot-screen"><i/><i/><b/></span></span>
      <span className="portfolio-bot-label">AI ASSISTANT</span>
    </button>
  </aside>;
}

function App() {
  const [filter, setFilter] = useState("All");
  const [certificateFilter, setCertificateFilter] = useState("All");
  const [certificateQuery, setCertificateQuery] = useState("");
  const [focus, setFocus] = useState("build");
  const [page, setPage] = useState(currentPage);
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    const syncPage = () => { setPageLoading(true); setPage(currentPage()); };
    window.addEventListener("popstate", syncPage);
    return () => window.removeEventListener("popstate", syncPage);
  }, []);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const moveLight = (event) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", moveLight, { passive: true });
    return () => {
      window.removeEventListener("pointermove", moveLight);
      document.documentElement.style.removeProperty("--pointer-x");
      document.documentElement.style.removeProperty("--pointer-y");
    };
  }, []);
  useEffect(() => {
    const title = page === "home" ? "Home" : page.charAt(0).toUpperCase() + page.slice(1);
    document.title = `${title} | MD. Mueid Shahriar`;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);
  useEffect(() => {
    if (!pageLoading) return;
    const timeout = window.setTimeout(() => setPageLoading(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [page, pageLoading]);
  const navigateTo = (path) => {
    setPageLoading(true);
    if (window.location.pathname !== path) window.history.pushState({}, "", path);
    setPage(currentPage());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleNavigation = (event, path) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateTo(path);
  };
  const categories = ["All", ...new Set(creativeWorks.map(work => work.category))];
  const filtered = filter === "All" ? creativeWorks : creativeWorks.filter(w => w.category === filter);
  const certificateCategories = ["All", "AI & Technology", "Development", "Data & Analytics", "Design", "Leadership & Recognition"];
  const visibleCertificates = certificates.filter((certificate) => {
    const matchesCategory = certificateFilter === "All" || certificate.category === certificateFilter;
    const searchText = `${certificate.title} ${certificate.issuer} ${certificate.category} ${certificate.credentialId}`.toLowerCase();
    return matchesCategory && searchText.includes(certificateQuery.trim().toLowerCase());
  });
  const activeFocus = focusModes[focus];
  const FocusIcon = activeFocus.icon;

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(data.get("subject"));
    const body = encodeURIComponent(`Hi Mueid,\n\n${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`);
    window.location.href = `mailto:mueidshahriar_cse1616@std.bauet.ac.bd?subject=${subject}&body=${body}`;
  };

  return <div className={`site-shell page-${page} min-h-screen bg-[#0b0712] text-zinc-100`}>
    <div className="cursor-light" aria-hidden="true"/>
    <Navbar page={page} onNavigate={handleNavigation}/>
    {pageLoading && <PagePreloader page={page}/>}
    <main>
      <section id="home" className={`relative overflow-hidden pt-32 lg:pt-40 ${page === "home" ? "" : "hidden"}`}>
        <div className="hero-grid absolute inset-0 -z-10"/>
        <div className="hero-glow absolute inset-0 -z-10"/>
        <div className="hero-graphic" aria-hidden="true"><svg viewBox="0 0 600 600" fill="none"><path className="hero-chart-grid" d="M70 120h470M70 220h470M70 320h470M70 420h470M170 70v400M270 70v400M370 70v400M470 70v400"/><path className="hero-chart-area" d="M76 407 158 360l72 22 83-115 77 54 87-142 77 34v257H76Z"/><path className="hero-chart-line" d="m76 407 82-47 72 22 83-115 77 54 87-142 77 34"/><path className="hero-chart-bars" d="M117 470V430M207 470v-58M297 470v-78M387 470v-99M477 470V235"/><circle className="hero-chart-point" cx="477" cy="213" r="9"/><circle className="hero-chart-point" cx="313" cy="267" r="6"/><circle className="hero-chart-point" cx="230" cy="382" r="5"/></svg></div>
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-24 lg:grid-cols-[1.1fr_.9fr] lg:gap-14 lg:px-8 lg:pb-32">
          <div className="order-2 animate-rise lg:order-1">
            <div className="mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.22em] text-violet-300"><span className="status-dot"/> CSE STUDENT · FRONTEND DEVELOPER</div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.04em] sm:text-7xl lg:text-[6.2rem]">MD. MUEID<br/>SHAHRIAR<span className="text-violet-300">.</span></h1>
            <p className="mt-8 max-w-2xl text-2xl font-medium leading-tight text-zinc-200">{activeFocus.title}</p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400">{activeFocus.description}</p>
            <div className="focus-switcher mt-8" aria-label="Choose a focus mode">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-medium tracking-[0.2em] text-zinc-500"><Layers3 size={13}/> SELECT A LENS</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(focusModes).map(([key, mode]) => {
                  const ModeIcon = mode.icon;
                  return <button key={key} onClick={() => setFocus(key)} className={`focus-pill ${focus === key ? "is-active" : ""}`} aria-pressed={focus === key}><ModeIcon size={14}/>{mode.label}</button>;
                })}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/projects" onClick={(event) => handleNavigation(event, "/projects")} className="inline-flex items-center gap-2 rounded-full bg-violet-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:scale-[1.02] hover:bg-violet-700">View Projects <ArrowUpRight size={16}/></a>
              <a href="/contact" onClick={(event) => handleNavigation(event, "/contact")} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium transition hover:border-white/30 hover:bg-white/5">Contact Me</a>
            </div>
            <div className="mt-9 flex gap-4">
              <a href="https://github.com/MueidShahriar" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="rounded-full border border-white/10 p-2.5 text-zinc-400 transition hover:border-white/25 hover:text-white"><Github size={17}/></a>
              <a href="mailto:mueidshahriar_cse1616@std.bauet.ac.bd" aria-label="Send email" className="rounded-full border border-white/10 p-2.5 text-zinc-400 transition hover:border-white/25 hover:text-white"><Mail size={17}/></a>
            </div>
          </div>
          <div className="order-1 animate-float lg:order-2">
            <div className="hero-panel rounded-3xl border border-white/10 bg-white/[0.025] p-4 shadow-2xl">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f12]">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3"><span className="h-2.5 w-2.5 rounded-full bg-white/15"/><span className="h-2.5 w-2.5 rounded-full bg-white/15"/><span className="h-2.5 w-2.5 rounded-full bg-white/15"/><span className="ml-4 text-[10px] text-zinc-600">mueid.config.js</span><span className="ml-auto text-[10px] text-emerald-300">● LIVE</span></div>
                <div className="hero-photo"><img src={profileImage} alt="MD. Mueid Shahriar" className="aspect-[4/5] w-full object-cover object-top"/><div className="hero-mini-chart" aria-hidden="true"><span>WEB · MOBILE · VISUAL</span><svg viewBox="0 0 110 32" fill="none"><path d="M2 25 22 19 37 22 54 9 68 16 85 5 108 10"/><circle cx="85" cy="5" r="2.5"/></svg></div></div>
                <div className="grid grid-cols-3 gap-2 border-t border-white/10 p-4"><div className="rounded-lg bg-white/[0.035] p-3"><Code2 size={15}/><span className="mt-2 block text-[10px] text-zinc-500">CODE</span></div><div className="rounded-lg bg-white/[0.035] p-3"><Smartphone size={15}/><span className="mt-2 block text-[10px] text-zinc-500">MOBILE</span></div><div className="rounded-lg bg-white/[0.035] p-3"><Palette size={15}/><span className="mt-2 block text-[10px] text-zinc-500">DESIGN</span></div></div>
              </div>
              <div className="mt-3 flex items-center gap-3 px-2 text-xs text-zinc-500"><FocusIcon size={14} className="text-violet-300"/><span>{activeFocus.metric}</span><span className="ml-auto"><Terminal size={14}/></span></div>
            </div>
          </div>
        </div>
      </section>

      <section className={`home-overview ${page === "home" ? "" : "hidden"}`} aria-labelledby="home-overview-title">
        <div className="home-overview-heading">
          <div><p className="home-kicker">A QUICK LOOK</p><h2 id="home-overview-title">A little about the work I do.</h2></div>
          <a href="/about" onClick={(event) => handleNavigation(event, "/about")} className="home-about-link">More about me <ArrowUpRight size={15}/></a>
        </div>
        <div className="home-overview-grid">
          <a href="/projects" onClick={(event) => handleNavigation(event, "/projects")} className="home-featured-card">
            <div className="home-featured-art" aria-hidden="true"><svg viewBox="0 0 280 240" fill="none"><path className="featured-drop" d="M142 25c-17 28-61 79-61 119a61 61 0 1 0 122 0c0-40-44-91-61-119Z"/><path className="featured-pulse" d="M98 146h31l13-30 20 55 17-34h26"/><path className="featured-highlight" d="M111 137c0-18 13-41 25-57"/></svg></div>
            <div className="home-featured-content"><span className="home-kicker">FEATURED PROJECT · LIVE</span><h3>{projects[0].title}</h3><p>{projects[0].description}</p><div className="home-featured-footer"><span>Explore the project and live website</span><ArrowUpRight size={16}/></div></div>
          </a>
          <div className="home-side-cards">
            <a href="/leadership" onClick={(event) => handleNavigation(event, "/leadership")} className="home-impact-card"><svg className="home-impact-wave" viewBox="0 0 190 130" fill="none" aria-hidden="true"><path d="M8 68h29l15-29 18 59 22-42 17 27h20l13-19 14 4 19-30"/><path d="M15 108h160"/><circle cx="52" cy="39" r="4"/><circle cx="92" cy="56" r="4"/><circle cx="143" cy="64" r="4"/></svg><div><span className="home-kicker">COMMUNITY IMPACT</span><strong>200<span>+</span></strong><p>Blood donations completed through BAUET Blood Donation Club.</p></div><Activity className="home-impact-icon" size={44}/><ArrowUpRight className="home-card-arrow" size={17}/></a>
            <a href="/skills" onClick={(event) => handleNavigation(event, "/skills")} className="home-skills-card"><span className="home-skills-icon"><Layers3 size={18}/></span><div><span className="home-kicker">MY TOOLKIT</span><h3>Web · Mobile · Visual design</h3><p>See the technologies and tools I use.</p></div><ArrowUpRight className="home-card-arrow" size={17}/></a>
          </div>
        </div>
      </section>

      <section id="about" className={`section-wrap ${page === "about" || page === "home" ? "" : "hidden"}`}>
        <SectionHeading number="01" title="ABOUT"><h2 className="section-title">A developer with a creative perspective.</h2></SectionHeading>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-5 text-base leading-7 text-zinc-400"><p>I am an undergraduate Computer Science and Engineering student at Bangladesh Army University of Engineering & Technology (BAUET), currently in my 8th semester.</p><p>My technical interests include web development, mobile application development, Java, JavaScript, Firebase and modern web technologies. I have developed practical projects that combine frontend interfaces, backend services, databases, authentication and application functionality.</p><p>Beyond development, I work in graphics design and creative content creation. This combination of technical and visual skills allows me to approach digital products from both an engineering and design perspective.</p><p>I have also taken active leadership roles across several university organizations, gaining practical experience in teamwork, communication, event coordination, project management and organizational leadership.</p></div>
          <div className="grid grid-cols-2 gap-3">{[[Code2,"Software Development"],[Smartphone,"Web & Mobile Development"],[Palette,"Graphics Design"],[Users,"Leadership"]].map(([I,t])=><div key={t} className="about-capability-card rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:bg-white/[0.04]"><span className="about-capability-icon"><I size={18}/></span><h3 className="mt-8 text-sm font-medium">{t}</h3><span className="about-capability-line" aria-hidden="true"/></div>)}</div>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">{[["3.30 / 4.00","Current CGPA"],["8th","Semester"],["2026","Expected Graduation"],["200+","Blood Donations"]].map(([v,l])=><div key={l} className="border-t border-white/10 pt-5"><div className="text-2xl font-semibold">{v}</div><div className="mt-1 text-xs text-zinc-500">{l}</div></div>)}</div>
      </section>

      <section id="projects" className={`section-wrap ${page === "projects" ? "" : "hidden"}`}>
        <SectionHeading number="02" title="SELECTED WORK"><h2 className="section-title">Projects built with purpose.</h2></SectionHeading>
        <div className="space-y-8">
          {projects.map((p) => <article id={`project-${p.number}`} key={p.number} className="project-card overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            <div className="project-layout grid lg:grid-cols-[.82fr_1.18fr]">
              <div className="project-preview-cell order-1 lg:order-2"><ProjectPreview project={p}/></div>
              <div className="project-details order-2 p-6 sm:p-8 lg:order-1 lg:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs text-zinc-600">{p.number}</span><span className="text-[10px] tracking-[.15em] text-violet-300">{p.category}</span></div>
                <h3 className="mt-7 text-2xl font-semibold tracking-tight sm:text-3xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{p.description}</p>
                {p.highlight && <div className="mt-5 rounded-xl border border-violet-300/15 bg-violet-300/5 p-4"><span className="text-sm font-semibold text-violet-200">{p.highlight}</span></div>}
                <div className="mt-5 flex flex-wrap gap-2">{p.technologies.map((technology) => <span key={technology} className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-zinc-400">{technology}</span>)}</div>
                <div className="mt-7 flex flex-wrap gap-5">
                  {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-zinc-300 transition hover:text-white">GitHub <ExternalLink size={13}/></a>}
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-zinc-300 transition hover:text-white">Open live project <ExternalLink size={13}/></a>}
                </div>
              </div>
            </div>
          </article>)}
        </div>
      </section>

      <section id="creative" className={`section-wrap ${page === "creative" ? "" : "hidden"}`}>
        <SectionHeading number="03" title="CREATIVE WORKS"><h2 className="section-title">Designing the visual side of technology.</h2><p className="mt-5 max-w-2xl text-zinc-400">A collection of {creativeWorks.length} original posters, identities, event graphics and digital designs.</p></SectionHeading>
        <div className="mb-7 flex flex-wrap gap-2" aria-label="Filter creative work">{categories.map(category=><button key={category} onClick={()=>setFilter(category)} aria-pressed={filter===category} className={`creative-filter rounded-full border px-4 py-2 text-xs transition ${filter===category?"is-active":""}`}>{category}</button>)}</div>
        <div className="creative-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((work,index)=><article key={work.driveId || work.title} className="creative-card group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"><a className="creative-preview-link" href={work.source} target="_blank" rel="noreferrer" aria-label={work.driveId ? `Open ${work.title} in Google Drive` : `Open original artwork: ${work.title}`}><div className="creative-preview"><img src={work.image} alt={`${work.title} preview`} loading="lazy" decoding="async"/><span className="creative-format">{work.format}</span></div></a><div className="creative-card-body"><div className="creative-card-meta"><span>{work.category}</span><span>{String(index+1).padStart(2,"0")}</span></div><h3>{work.title}</h3><p>{work.description}</p><a className="creative-original-link" href={work.source} target="_blank" rel="noreferrer">{work.driveId ? "Open original" : work.format.startsWith("PDF") ? "Open full PDF" : "View full artwork"} <ExternalLink size={14}/></a></div></article>)}</div>
      </section>

      <section id="certificates" className={`section-wrap ${page === "certificates" ? "" : "hidden"}`}>
        <SectionHeading number="08" title="CERTIFICATIONS">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div><h2 className="section-title">Learning, put into practice.</h2><p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-400">A growing collection of credentials in software, data, design and emerging technology.</p></div>
            <div className="certificate-total"><Award size={18}/><span><strong>{certificates.length}</strong> credentials</span></div>
          </div>
        </SectionHeading>
        <div className="certificate-overview" aria-label="Certificate category totals">
          {certificateCategories.slice(1).map((category) => {
            const CategoryIcon = category === "AI & Technology" ? Bot : category === "Development" ? Code2 : category === "Design" ? Sparkles : category === "Leadership & Recognition" ? Award : Database;
            const count = certificates.filter((certificate) => certificate.category === category).length;
            return <div className="certificate-overview-item" key={category}><span className="certificate-overview-icon"><CategoryIcon size={16}/></span><span className="certificate-overview-count">{String(count).padStart(2, "0")}</span><span className="certificate-overview-label">{category}</span></div>;
          })}
        </div>
        <div className="certificate-controls">
          <div className="certificate-filters" aria-label="Filter certificates by category">
            {certificateCategories.map((category) => <button key={category} type="button" onClick={() => setCertificateFilter(category)} aria-pressed={certificateFilter === category} className={`creative-filter rounded-full border px-4 py-2 text-xs transition ${certificateFilter === category ? "is-active" : ""}`}>{category}</button>)}
          </div>
          <label className="certificate-search"><Search size={15} aria-hidden="true"/><span className="sr-only">Search certificates</span><input value={certificateQuery} onChange={(event) => setCertificateQuery(event.target.value)} placeholder="Search credentials"/></label>
        </div>
        <div className="certificate-grid">
          {visibleCertificates.map((certificate, index) => {
            const CategoryIcon = certificate.category === "AI & Technology" ? Bot : certificate.category === "Development" ? Code2 : certificate.category === "Design" ? Sparkles : certificate.category === "Leadership & Recognition" ? Award : Database;
            return <article className="certificate-card" key={certificate.credentialId || certificate.title}>
              <div className="certificate-card-top"><span className="certificate-card-icon"><CategoryIcon size={19}/></span><span className="certificate-card-number">{String(index + 1).padStart(2, "0")} / {String(visibleCertificates.length).padStart(2, "0")}</span></div>
              {certificate.preview ? <a className="certificate-preview" href={certificate.pdfUrl || certificate.preview} target="_blank" rel="noreferrer" aria-label={certificate.pdfUrl ? `Open the full ${certificate.title} PDF` : `Open the ${certificate.title} image`}><img src={certificate.preview} alt={`${certificate.title} certificate`} loading="lazy" decoding="async"/><span className="certificate-preview-label">{certificate.pdfUrl ? "PDF PREVIEW" : "CERTIFICATE IMAGE"} <ExternalLink size={12}/></span></a> : <a className="certificate-preview certificate-preview-fallback" href={certificate.pdfUrl || certificate.credentialUrl || "#"} target={certificate.pdfUrl || certificate.credentialUrl ? "_blank" : undefined} rel={certificate.pdfUrl || certificate.credentialUrl ? "noreferrer" : undefined} aria-label={certificate.pdfUrl ? `Open the full ${certificate.title} PDF` : certificate.credentialUrl ? `Open the ${certificate.title} credential` : `${certificate.title} credential details`}><CategoryIcon size={34}/><span>{certificate.pdfUrl ? "CERTIFICATE PDF" : certificate.credentialUrl ? "ONLINE CREDENTIAL" : "CREDENTIAL DETAILS"} <ExternalLink size={12}/></span></a>}
              <div className="certificate-card-meta"><span>{certificate.category}</span><span>{certificate.issued}</span></div>
              <h3>{certificate.title}</h3>
              <p className="certificate-issuer">{certificate.issuer}</p>
              {certificate.credentialId && <div className="certificate-id"><span>CREDENTIAL ID</span><code title={certificate.credentialId}>{certificate.credentialId}</code></div>}
              {(certificate.pdfUrl || certificate.credentialUrl) && <div className="certificate-actions">
                {certificate.pdfUrl && <a className="certificate-pdf-action" href={certificate.pdfUrl} target="_blank" rel="noreferrer">Open full certificate PDF <ExternalLink size={13}/></a>}
                {certificate.credentialUrl && <a className="certificate-link" href={certificate.credentialUrl} target="_blank" rel="noreferrer">{certificate.pdfUrl ? "Verify credential online" : certificate.linkLabel}<ExternalLink size={13}/></a>}
              </div>}
            </article>;
          })}
          {!visibleCertificates.length && <div className="certificate-empty"><Award size={23}/><p>No certificates match that search.</p><button type="button" onClick={() => { setCertificateQuery(""); setCertificateFilter("All"); }}>Clear filters</button></div>}
        </div>
        <p className="certificate-source-note">Credential details are listed on my <a href="https://www.linkedin.com/in/mueid16" target="_blank" rel="noreferrer">public LinkedIn profile <ExternalLink size={12}/></a>.</p>
      </section>

      <section id="skills" className={`section-wrap ${page === "skills" ? "" : "hidden"}`}>
        <SectionHeading number="04" title="TECHNOLOGY"><h2 className="section-title">Tools I work with.</h2></SectionHeading>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{skillGroups.map((g,index)=>{const GroupIcon=skillGroupIcons[index%skillGroupIcons.length];return <div key={g.title} className="skill-group-card rounded-2xl border border-white/10 p-6"><div className="skill-group-heading"><span className="skill-group-icon"><GroupIcon size={18}/></span><span className="skill-group-index">0{index+1}</span></div><h3 className="mt-5 text-sm font-medium">{g.title}</h3><div className="mt-5 flex flex-wrap gap-2">{g.items.map(s=><span key={s} className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-zinc-400">{s}</span>)}</div></div>})}</div>
      </section>
      <section id="experience" className={`section-wrap ${page === "experience" ? "" : "hidden"}`}>
        <SectionHeading number="05" title="EXPERIENCE"><h2 className="section-title">Industry exposure.</h2></SectionHeading>
        <article className="experience-feature">
          <div className="experience-feature-art" aria-hidden="true"><svg viewBox="0 0 300 220" fill="none"><path d="M24 175h252M51 175V99h50v76M126 175V55h50v120M201 175V83h50v92"/><path className="experience-route" d="m38 76 68-38 56 29 93-44"/><circle cx="38" cy="76" r="6"/><circle cx="106" cy="38" r="6"/><circle cx="162" cy="67" r="6"/><circle cx="255" cy="23" r="7"/><path d="M64 118h23M64 132h23M139 81h24M139 96h24M214 106h24M214 121h24"/></svg></div>
          <div className="experience-feature-content"><div className="experience-feature-meta"><span><i aria-hidden="true"/> DEC 2025 — JAN 2026</span><span>INDUSTRIAL ATTACHMENT</span></div><h3>Intern <span>at</span> Ontek Horizon</h3><p>Hands-on exposure across e-commerce operations, digital marketing, creative content and web development.</p><a href="https://ontek-horizon.vercel.app/" target="_blank" rel="noreferrer">Visit Ontek Horizon <ExternalLink size={14}/></a><div className="experience-toolset">{["Amazon EBS","Amazon FBA","Canva","Creative Content Creation","Digital Marketing","Web Development","E-commerce"].map((s)=><span key={s}>{s}</span>)}</div></div>
        </article>
      </section>

      <section id="leadership" className={`section-wrap ${page === "leadership" ? "" : "hidden"}`}>
        <SectionHeading number="06" title="LEADERSHIP">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="section-title">Leadership, experience, and service.</h2>
            <div className="max-w-md">
              <p className="text-sm leading-6 text-zinc-400">Campus and community roles arranged by organization, with each position in its own timeline—following the structure of my LinkedIn experience.</p>
              <a className="leadership-profile-link mt-4" href="https://www.linkedin.com/in/mueid16" target="_blank" rel="noreferrer">View LinkedIn experience <ExternalLink size={14}/></a>
            </div>
          </div>
        </SectionHeading>
        <div className="leadership-overview">
          <div className="leadership-overview-copy"><span className="home-kicker">COMMUNITY IMPACT · BAUET BDC</span><p>More than <strong>200 donations</strong> completed through coordinated donor and community service.</p><a href="/projects" onClick={(event) => handleNavigation(event, "/projects")}>Explore the donor platform <ArrowUpRight size={14}/></a></div>
          <div className="leadership-overview-art" aria-hidden="true"><svg viewBox="0 0 340 130" fill="none"><path d="M4 102h55l28-52 30 64 40-80 36 58 38-24 36 34h68"/><path d="M6 119h328M45 86v33M88 50v69M157 34v85M229 58v61M267 92v27"/><circle cx="87" cy="50" r="5"/><circle cx="157" cy="34" r="6"/><circle cx="231" cy="58" r="5"/><circle cx="267" cy="92" r="4"/><path d="M157 43c-11-10-25 6 0 25 25-19 11-35 0-25Z"/></svg></div>
          <div className="leadership-overview-stats"><span><strong>09</strong> organizations</span><span><strong>16</strong> roles</span><span><strong>200+</strong> donations</span></div>
        </div>

        <div className="leadership-list-heading"><div><span className="home-kicker">EXPERIENCE · BY ORGANIZATION</span><h3>Positions & contributions</h3></div><span className="leadership-list-count">09 ORGANIZATIONS</span></div>
        <div className="linkedin-experience-list">
          {leadershipOrganizations.map((organization, organizationIndex) => <article className="linkedin-org" key={organization.name} style={{ "--org-accent": organization.accent }}>
            <header className="linkedin-org-header">
              <div className={`linkedin-org-logo ${organization.logo ? "has-logo" : organization.logoSheet ? "has-sheet-logo" : "has-monogram"} ${organization.logoClass || ""}`} aria-hidden="true">
                {organization.logo ? <img src={organization.logo} alt="" loading="lazy"/> : organization.logoSheet ? <img src={organization.logoSheet} alt="" loading="lazy" style={{ "--sheet-width": organization.logoCrop.width, "--sheet-left": organization.logoCrop.left, "--sheet-top": organization.logoCrop.top }}/> : <span>{organization.initials}</span>}
              </div>
              <div className="linkedin-org-summary"><h4>{organization.name}</h4><p>{organization.engagement}</p><p className="linkedin-org-location">{organization.location}</p></div>
              <span className="linkedin-org-role-count">{organization.roles.length} {organization.roles.length === 1 ? "role" : "roles"}</span>
              <span className="linkedin-org-index">{String(organizationIndex + 1).padStart(2, "0")}</span>
            </header>
            <div className="linkedin-roles">
              {organization.roles.map((role, roleIndex) => <section className="linkedin-role" key={`${role.title}-${role.period}`}>
                <span className="linkedin-role-node" aria-hidden="true"/>
                <div className="linkedin-role-content">
                  <h5>{role.title}</h5>
                  <p className="linkedin-role-period">{role.period}</p>
                  {role.location && role.location !== organization.location && <p className="linkedin-role-location">{role.location}</p>}
                  {role.description && <p className="linkedin-role-description">{role.description}</p>}
                  {role.media?.length > 0 && <div className="linkedin-media-grid">{role.media.map((media) => <a className="linkedin-media-card" key={media.image} href={media.image} target="_blank" rel="noreferrer"><div className="linkedin-media-preview"><img src={media.image} alt={media.title} loading="lazy" decoding="async"/><span>{media.label}</span></div><strong>{media.title}</strong></a>)}</div>}
                  {role.featured && (Array.isArray(role.featured) ? role.featured : [role.featured]).map((media) => <div className="linkedin-featured" key={media}><span className="linkedin-featured-art" aria-hidden="true"><Sparkles size={17}/></span><span><small>MEDIA</small><strong>{media}</strong></span></div>)}
                  {role.skills?.length > 0 && <p className="linkedin-role-skills"><Sparkles size={14} aria-hidden="true"/><span>{role.skills.join(", ")}</span></p>}
                </div>
                {roleIndex < organization.roles.length - 1 && <span className="linkedin-role-rail" aria-hidden="true"/>}
              </section>)}
            </div>
          </article>)}
        </div>

        <div className="leadership-list-heading additional-service-heading"><div><span className="home-kicker">VOLUNTEERING · SERVICE</span><h3>Additional contributions</h3></div><span className="leadership-list-count">04 ENTRIES</span></div>
        <div className="additional-service-list">
          {additionalService.map((entry, index) => <article className="additional-service-entry" key={entry.organization}>
            <span className="additional-service-number">{String(index + 1).padStart(2, "0")}</span><div><p className="additional-service-period">{entry.period}</p><h4>{entry.role}</h4><p className="additional-service-org">{entry.organization}</p><p className="additional-service-description">{entry.description}</p>{entry.media?.length > 0 && <div className="linkedin-media-grid additional-service-media">{entry.media.map((media) => <a className="linkedin-media-card" key={media.image} href={media.image} target="_blank" rel="noreferrer"><div className="linkedin-media-preview"><img src={media.image} alt={media.title} loading="lazy" decoding="async"/><span>{media.label}</span></div><strong>{media.title}</strong></a>)}</div>}</div>
          </article>)}
        </div>
      </section>

      <section id="education" className={`section-wrap ${page === "education" ? "" : "hidden"}`}>
        <SectionHeading number="07" title="EDUCATION"><h2 className="section-title">Academic foundation.</h2></SectionHeading>
        <div className="education-timeline space-y-0 border-l border-white/10 pl-6">{[
          ["B.Sc. in Computer Science & Engineering","Bangladesh Army University of Engineering & Technology (BAUET)","CGPA: 3.30 / 4.00 · 8th Semester · Expected Graduation: 31 December 2026"],
          ["Higher Secondary Certificate","Kurigram Government College","Science · Dinajpur Board · GPA: 5.00 · 2020"],
          ["Secondary School Certificate","Kurigram Government High School","Science · Dinajpur Board · GPA: 5.00 · 2018"]
        ].map(([d,i,m],index)=><div key={d} className="education-entry relative pb-10"><span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-[#0b0712] bg-violet-300"/><span className="education-index">0{index+1}</span><h3 className="text-xl font-semibold">{d}</h3><p className="mt-2 text-sm text-zinc-300">{i}</p><p className="mt-1 text-sm text-zinc-500">{m}</p></div>)}</div>
      </section>

      <section className={`section-wrap pt-0 ${page === "skills" ? "" : "hidden"}`}><div className="flex flex-wrap gap-x-8 gap-y-4 border-y border-white/10 py-8 text-sm text-zinc-400">{["Software Engineering","Web Development","Mobile Development","Artificial Intelligence","UI/UX","Graphics Design","Digital Products","Creative Technology"].map(x=><span key={x}>{x}</span>)}</div></section>

      <section id="contact" className={`section-wrap pb-20 ${page === "contact" || page === "home" ? "" : "hidden"}`}><div className="contact-panel rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-12"><div className="contact-graphic-wrap" aria-hidden="true"><svg className="contact-graphic" viewBox="0 0 220 160" fill="none"><path className="contact-flight" d="m8 122 61-12M65 106l38-57 80-31-34 83-57 38 11-34-38-2Z"/><path className="contact-fold" d="m65 106 70 23 14-46M103 49l31 80"/><path className="contact-flight" d="M26 38h34M14 56h28M33 74h21"/></svg></div><div className="contact-content grid gap-12 lg:grid-cols-[.9fr_1.1fr]"><div><p className="text-xs tracking-[.2em] text-violet-300">CONTACT</p><h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Have an idea worth building?</h2><p className="mt-5 max-w-md text-sm leading-6 text-zinc-400">I’m open to software development opportunities, internships, collaborative projects, creative technology initiatives and meaningful digital products.</p><div className="contact-details mt-8 grid gap-4 text-sm"><a className="contact-detail" href="mailto:mueidshahriar_cse1616@std.bauet.ac.bd"><Mail size={17} aria-hidden="true"/><span>mueidshahriar_cse1616@std.bauet.ac.bd</span></a><a className="contact-detail" href="tel:+8801712460423"><Phone size={17} aria-hidden="true"/><span>+8801712-460423</span></a><p className="contact-detail"><MapPin size={17} aria-hidden="true"/><span>Kurigram, Bangladesh</span></p></div><div className="contact-socials mt-6 flex flex-wrap gap-3"><a className="contact-social" href="https://wa.me/8801712460423" target="_blank" rel="noreferrer"><MessageCircle size={16} aria-hidden="true"/><span>WhatsApp</span><ArrowUpRight size={14} aria-hidden="true"/></a><a className="contact-social" href="https://www.linkedin.com/in/mueid16" target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true"/><span>LinkedIn</span><ArrowUpRight size={14} aria-hidden="true"/></a></div></div>
        <form onSubmit={handleContactSubmit} className="space-y-4"><label className="sr-only" htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" required placeholder="Name" className="field"/><label className="sr-only" htmlFor="contact-email">Email</label><input id="contact-email" name="email" autoComplete="email" required type="email" placeholder="Email" className="field"/><label className="sr-only" htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" required placeholder="Subject" className="field"/><label className="sr-only" htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" required placeholder="Message" rows="6" className="field resize-none"/><button type="submit" className="inline-flex items-center gap-2 rounded-full bg-violet-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:scale-[1.01] hover:bg-violet-700">Open email draft <ArrowUpRight size={16}/></button><p className="text-xs text-zinc-600">Your email app will open with the message ready to send.</p></form>
      </div></div></section>
    </main>
    {page === "home" && <PortfolioChatbot />}
    <VisitorStats page={page}/>
    <footer className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div><div className="font-medium text-zinc-300">MD. MUEID SHAHRIAR</div><div className="mt-1">Computer Science & Engineering · Software Development · Graphics Design</div></div><div>© 2026 MD. Mueid Shahriar. All rights reserved.</div></div></footer>
  </div>
}
export default App;
