import { useState, useEffect, useRef } from "react";

const ACCENT = "#38bdf8";
const BG = "#0f172a";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: ${BG};
    color: #e2e8f0;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    line-height: 1.7;
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    font-family: 'Syne', sans-serif;
    letter-spacing: -0.02em;
  }

  ::selection { background: #38bdf830; color: #38bdf8; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0f172a; }
  ::-webkit-scrollbar-thumb { background: #38bdf840; border-radius: 2px; }

  .noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .glow-orb {
    position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0;
  }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 1.25rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(15,23,42,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(56,189,248,0.08);
    transition: all 0.3s;
  }

  .nav-logo {
    width: 48px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .nav-links {
    display: flex; gap: 2rem; list-style: none;
  }

  .nav-links a {
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s;
    position: relative;
  }

  .nav-links a::after {
    content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
    height: 1px; background: #38bdf8; transform: scaleX(0);
    transform-origin: left; transition: transform 0.3s;
  }

  .nav-links a:hover { color: #38bdf8; }
  .nav-links a:hover::after { transform: scaleX(1); }

  section {
    position: relative; z-index: 1;
  }

  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 6rem 2rem 4rem;
    max-width: 1200px; margin: 0 auto;
    gap: 4rem;
  }

  .hero-left { flex: 1; }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(56,189,248,0.1);
    border: 1px solid rgba(56,189,248,0.2);
    padding: 0.35rem 0.875rem;
    border-radius: 100px;
    font-size: 0.8rem;
    color: #38bdf8;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }

  .hero-badge span { width: 6px; height: 6px; background: #38bdf8; border-radius: 50%; animation: pulse 2s infinite; }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .hero h1 {
    font-size: clamp(2.8rem, 6vw, 5rem);
    font-weight: 800;
    line-height: 1.05;
    color: #f1f5f9;
    margin-bottom: 0.75rem;
  }

  .hero h1 .accent { color: #38bdf8; }

  .hero-tagline {
    font-size: 1.15rem;
    color: #64748b;
    font-weight: 300;
    font-style: italic;
    margin-bottom: 1.25rem;
    letter-spacing: 0.01em;
  }

  .hero-intro {
    font-size: 1.05rem;
    color: #94a3b8;
    max-width: 480px;
    line-height: 1.8;
    margin-bottom: 2.5rem;
  }

  .btn-row { display: flex; gap: 1rem; flex-wrap: wrap; }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: #38bdf8;
    color: #0f172a;
    padding: 0.75rem 1.75rem;
    border-radius: 6px;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    font-size: 0.9rem;
    text-decoration: none;
    border: none; cursor: pointer;
    transition: all 0.25s;
    letter-spacing: 0.01em;
  }

  .btn-primary:hover {
    background: #7dd3fc;
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(56,189,248,0.3);
  }

  .btn-secondary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: transparent;
    color: #94a3b8;
    padding: 0.75rem 1.75rem;
    border-radius: 6px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    text-decoration: none;
    border: 1px solid rgba(148,163,184,0.2);
    cursor: pointer;
    transition: all 0.25s;
  }

  .btn-secondary:hover {
    border-color: #38bdf8;
    color: #38bdf8;
    transform: translateY(-2px);
  }

  .hero-right {
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }

  .avatar-wrap {
    position: relative;
    width: 280px; height: 280px;
  }

  .avatar-wrap::before {
    content: '';
    position: absolute; inset: -12px;
    border-radius: 50%;
    border: 1px solid rgba(56,189,248,0.2);
    animation: spin 20s linear infinite;
  }

  .avatar-wrap::after {
    content: '';
    position: absolute; inset: -24px;
    border-radius: 50%;
    border: 1px dashed rgba(56,189,248,0.1);
    animation: spin 35s linear infinite reverse;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .avatar-inner {
    width: 280px; height: 280px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1e3a5f 0%, #0f2744 50%, #0f172a 100%);
    border: 2px solid rgba(56,189,248,0.2);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
    position: relative;
  }

  .avatar-svg { width: 200px; height: 200px; }

  /* Section styles */
  .section-wrap {
    max-width: 1100px; margin: 0 auto; padding: 6rem 2rem;
  }

  .section-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    color: #38bdf8;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: 'Syne', sans-serif;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  .section-tag::before {
    content: '';
    width: 24px; height: 1px;
    background: #38bdf8;
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: #f1f5f9;
    margin-bottom: 1rem;
    line-height: 1.1;
  }

  .section-divider {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, rgba(56,189,248,0.3) 0%, transparent 100%);
    margin-bottom: 4rem;
  }

  /* About */
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 4rem; align-items: start;
  }

  .about-text p {
    color: #94a3b8;
    font-size: 1.05rem;
    line-height: 1.85;
    margin-bottom: 1.25rem;
  }

  .about-list {
    list-style: none;
    display: flex; flex-direction: column; gap: 0.75rem;
  }

  .about-list li {
    display: flex; align-items: center; justify-content: flex-start; gap: 0.75rem;
    color: #94a3b8; font-size: 0.95rem;
    text-align: left;
    padding: 0.875rem 1rem;
    background: rgba(56,189,248,0.04);
    border: 1px solid rgba(56,189,248,0.08);
    border-radius: 8px;
    transition: all 0.25s;
  }

  .about-list li:hover {
    background: rgba(56,189,248,0.08);
    border-color: rgba(56,189,248,0.2);
    transform: translateX(4px);
  }

  .about-list li::before {
    content: '▸';
    color: #38bdf8;
    font-size: 0.8rem;
    margin-top: 0;
    align-self: center;
    flex-shrink: 0;
  }

  /* Projects */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .project-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 1.75rem;
    transition: all 0.3s;
    cursor: default;
    position: relative;
    overflow: hidden;
  }

  .project-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, #38bdf8, transparent);
    transform: scaleX(0);
    transition: transform 0.4s;
  }

  .project-card:hover {
    border-color: rgba(56,189,248,0.25);
    background: rgba(56,189,248,0.04);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  }

  .project-card:hover::before { transform: scaleX(1); }

  .project-num {
    font-family: 'Syne', sans-serif;
    font-size: 0.75rem;
    color: #38bdf8;
    font-weight: 600;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
    opacity: 0.7;
  }

  .project-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 0.625rem;
  }

  .project-desc {
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.7;
    margin-bottom: 1.25rem;
  }

  .tag-row {
    display: flex; flex-wrap: wrap; gap: 0.4rem;
    margin-bottom: 1.5rem;
  }

  .tag {
    display: inline-block;
    background: rgba(56,189,248,0.1);
    color: #38bdf8;
    border: 1px solid rgba(56,189,248,0.2);
    padding: 0.2rem 0.625rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    font-family: 'Syne', sans-serif;
  }

  .card-btns { display: flex; gap: 0.75rem; }

  .btn-card-ghost {
    display: inline-flex; align-items: center; gap: 0.35rem;
    padding: 0.45rem 1rem;
    border: 1px solid rgba(148,163,184,0.15);
    border-radius: 5px;
    color: #94a3b8;
    font-size: 0.8rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s;
    background: transparent;
    cursor: pointer;
  }

  .btn-card-ghost:hover {
    border-color: #38bdf8;
    color: #38bdf8;
  }

  /* Skills */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem;
  }

  .skill-category {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 1.5rem;
    transition: border-color 0.25s;
  }

  .skill-category:hover { border-color: rgba(56,189,248,0.2); }

  .skill-cat-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    color: #38bdf8;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(56,189,248,0.15);
  }

  .skill-badges {
    display: flex; flex-wrap: wrap; gap: 0.5rem;
  }

  .skill-badge {
    background: rgba(241,245,249,0.04);
    color: #94a3b8;
    border: 1px solid rgba(241,245,249,0.08);
    padding: 0.3rem 0.75rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .skill-badge:hover {
    background: rgba(56,189,248,0.1);
    color: #38bdf8;
    border-color: rgba(56,189,248,0.2);
  }

  /* Resume */
  .resume-section {
    text-align: center;
    padding: 5rem 2rem;
    background: rgba(56,189,248,0.02);
    border-top: 1px solid rgba(56,189,248,0.08);
    border-bottom: 1px solid rgba(56,189,248,0.08);
  }

  .resume-section h2 { margin-bottom: 0.75rem; }
  .resume-section p { color: #64748b; margin-bottom: 2rem; font-size: 1rem; }

  .btn-download {
    display: inline-flex; align-items: center; gap: 0.625rem;
    background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
    color: #0f172a;
    padding: 0.875rem 2.25rem;
    border-radius: 6px;
    font-weight: 800;
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    text-decoration: none;
    border: none; cursor: pointer;
    transition: all 0.3s;
    letter-spacing: 0.02em;
  }

  .btn-download:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(56,189,248,0.35);
  }

  /* Contact */
  .contact-grid {
    display: flex; flex-wrap: wrap;
    gap: 1.25rem; justify-content: flex-start;
    margin-top: 3rem;
  }

  .contact-card {
    display: flex; align-items: center; gap: 1rem;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 1.25rem 1.75rem;
    min-width: 220px;
    text-decoration: none;
    transition: all 0.25s;
  }

  .contact-card:hover {
    border-color: rgba(56,189,248,0.3);
    background: rgba(56,189,248,0.05);
    transform: translateY(-3px);
  }

  .contact-icon {
    width: 42px; height: 42px;
    border-radius: 8px;
    background: rgba(56,189,248,0.12);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .contact-label {
    font-size: 0.75rem;
    color: #475569;
    font-weight: 500;
    margin-bottom: 0.2rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .contact-value {
    font-size: 0.9rem;
    color: #94a3b8;
    font-weight: 400;
  }

  footer {
    text-align: center;
    padding: 2rem;
    color: #334155;
    font-size: 0.8rem;
    border-top: 1px solid rgba(255,255,255,0.04);
    position: relative; z-index: 1;
  }

  footer span { color: #38bdf8; }

  /* Fade-in animations */
  .fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Mobile */
  @media (max-width: 768px) {
    .hero { flex-direction: column; padding-top: 7rem; text-align: center; gap: 2.5rem; }
    .hero-intro { max-width: 100%; }
    .btn-row { justify-content: center; }
    .hero-right { display: none; }
    .about-grid { grid-template-columns: 1fr; gap: 2rem; }
    .nav-links { display: none; }
    .contact-grid { justify-content: stretch; }
    .contact-card { min-width: 0; flex: 1; }
  }
`;

const projects = [
  {
    num: "01",
    title: "Smart Fraud Detection System",
    desc: "ML-powered real-time fraud detection pipeline with REST API, achieving high accuracy on financial transaction datasets.",
    tags: ["Python", "FastAPI", "Scikit-learn", "Pandas", "REST API"],
    github: "https://github.com/karthikeyan110/fraud_detection_system",
    demo: "https://frauddetectionsystem-karthikeyan110.streamlit.app/",
  },
  {
    num: "02",
    title: "Election Management System",
    desc: "End-to-end election platform handling voter registration, ballot submission, and result tabulation with secure data management.",
    tags: ["Java", "MySQL", "JDBC", "Swing UI"],
    github: "#",
    demo: "#",
  },
  {
    num: "03",
    title: "Data Science Portfolio",
    desc: "Collection of data analysis and visualization projects exploring real-world datasets with statistical insights and ML models.",
    tags: ["Python", "NumPy", "Pandas", "Matplotlib", "Jupyter"],
    github: "#",
    demo: "#",
  },
  {
    num: "04",
    title: "AGRIFLASK - Smart Crop Prediction System",
    desc: "Crop prediction web app that recommends suitable crops using data-driven inputs for practical agricultural planning.",
    tags: ["Python", "Flask", "Machine Learning", "Pandas"],
    github: "#",
    demo: "#",
  },
];

const skills = [
  { category: "Languages", items: ["C", "Java", "Python"] },
  { category: "Frontend", items: ["HTML", "CSS", "JavaScript"] },
  { category: "Backend", items: ["FastAPI", "Node.js", "REST APIs"] },
  { category: "Data Science", items: ["NumPy", "Pandas", "Matplotlib"] },
  { category: "Tools & IDEs", items: ["Git", "VS Code", "IntelliJ", "Jupyter"] },
];

function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeUp({ children, delay = 0, style: s = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="fade-up" style={s}>
      {children}
    </div>
  );
}

function AvatarIllustration() {
  return (
    <svg viewBox="0 0 200 200" className="avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0f2744" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Body */}
      <ellipse cx="100" cy="155" rx="52" ry="30" fill="#1e3a5f" opacity="0.7" />
      <rect x="72" y="115" width="56" height="45" rx="8" fill="url(#bodyGrad)" />
      {/* Neck */}
      <rect x="90" y="105" width="20" height="18" rx="4" fill="#c4a882" />
      {/* Head */}
      <ellipse cx="100" cy="88" rx="32" ry="36" fill="#d4b896" />
      {/* Hair */}
      <ellipse cx="100" cy="60" rx="32" ry="18" fill="#2d1b1b" />
      <rect x="68" y="60" width="10" height="20" rx="4" fill="#2d1b1b" />
      <rect x="122" y="60" width="10" height="20" rx="4" fill="#2d1b1b" />
      {/* Eyes */}
      <ellipse cx="88" cy="88" rx="5" ry="5.5" fill="white" />
      <ellipse cx="112" cy="88" rx="5" ry="5.5" fill="white" />
      <ellipse cx="89" cy="88.5" rx="3" ry="3.5" fill="#1a1a2e" />
      <ellipse cx="113" cy="88.5" rx="3" ry="3.5" fill="#1a1a2e" />
      {/* Smile */}
      <path d="M90 102 Q100 110 110 102" stroke="#b8845a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Laptop */}
      <rect x="62" y="130" width="76" height="42" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
      <rect x="65" y="133" width="70" height="34" rx="4" fill="url(#screenGrad)" opacity="0.9" />
      {/* Code lines on screen */}
      <rect x="70" y="138" width="25" height="2" rx="1" fill="#7dd3fc" opacity="0.8" />
      <rect x="70" y="143" width="40" height="2" rx="1" fill="#38bdf8" opacity="0.6" />
      <rect x="74" y="148" width="30" height="2" rx="1" fill="#7dd3fc" opacity="0.5" />
      <rect x="74" y="153" width="35" height="2" rx="1" fill="#38bdf8" opacity="0.4" />
      <rect x="70" y="158" width="20" height="2" rx="1" fill="#7dd3fc" opacity="0.6" />
      {/* Keyboard base */}
      <rect x="55" y="172" width="90" height="6" rx="3" fill="#1e3a5f" stroke="#334155" strokeWidth="0.5" />
      {/* Decorative dots */}
      <circle cx="155" cy="75" r="3" fill="#38bdf8" opacity="0.5" />
      <circle cx="45" cy="100" r="2" fill="#38bdf8" opacity="0.3" />
      <circle cx="160" cy="110" r="2" fill="#7dd3fc" opacity="0.4" />
    </svg>
  );
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{style}</style>

      <div className="grid-bg" />
      <div className="noise" />
      <div
        className="glow-orb"
        style={{ width: 600, height: 600, top: -200, right: -200, background: "rgba(56,189,248,0.06)" }}
      />
      <div
        className="glow-orb"
        style={{ width: 400, height: 400, bottom: "20%", left: -150, background: "rgba(14,165,233,0.05)" }}
      />

      {/* NAV */}
      <nav style={{ boxShadow: scrolled ? "0 1px 40px rgba(0,0,0,0.5)" : "none" }}>
        <div className="nav-logo" aria-label="Karthikeyan Pandita logo">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="20" fill="rgba(56,189,248,0.08)" />
            <circle cx="24" cy="24" r="20" stroke="rgba(125,211,252,0.5)" />
            <circle cx="24" cy="24" r="16" stroke="rgba(56,189,248,0.3)" />
            <path d="M14 33V15.5H17.3V23.2L24.2 15.5H28.4L20.9 23.7L28.9 33H24.7L18.9 26.1L17.3 27.8V33H14Z" fill="#38bdf8" />
            <path d="M30.2 33V15.5H34.8C38.5 15.5 40.9 17.5 40.9 20.9C40.9 24.3 38.5 26.3 34.8 26.3H33.5V33H30.2ZM33.5 18.5V23.3H34.7C36.5 23.3 37.5 22.4 37.5 20.9C37.5 19.4 36.5 18.5 34.7 18.5H33.5Z" fill="#bae6fd" />
          </svg>
        </div>
        <ul className="nav-links">
          {["About", "Projects", "Skills", "Resume", "Contact"].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}>{l}</a>
            </li>
          ))}
        </ul>
        <a className="btn-primary" href="#contact" style={{ padding: "0.5rem 1.25rem", fontSize: "0.82rem" }}>
          Hire Me
        </a>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero">
          <div className="hero-left">
            <div className="hero-badge">
              <span />
              Available for Opportunities
            </div>
            <h1>
              Karthikeyan
              <br />
              <span className="accent">Pandita.</span>
            </h1>
            <p className="hero-tagline">CSE Student</p>
            <p className="hero-intro">
              Computer Science Engineering student with hands-on experience in data-driven applications. I build
              scalable solutions using Python and modern technologies, focusing on performance and real-world impact.
            </p>
            <div className="btn-row">
              <a className="btn-primary" href="#projects">
                View Projects ↓
              </a>
              <a className="btn-secondary" href="/main cv.pdf" download="main cv.pdf">
                Download Resume
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="avatar-wrap">
              <div className="avatar-inner">
                <AvatarIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-wrap">
          <FadeUp>
            <div className="section-tag">Who I Am</div>
            <h2 className="section-title">About Me</h2>
            <div className="section-divider" />
          </FadeUp>
          <div className="about-grid">
            <FadeUp delay={100}>
              <div className="about-text">
                <p>
                  Computer Science Engineering student with hands-on experience in data-driven applications. I build
                  scalable solutions using Python and modern technologies, focusing on performance and real-world
                  impact.
                </p>
                <p>
                  My work includes projects in fraud detection and data analysis, where I combine problem-solving with
                  practical implementation.
                </p>
                <p>
                  Currently focused on AI, machine learning, and Python.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={200}>
              <div>
                <p
                  style={{
                    color: "#475569",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                    fontFamily: "Syne, sans-serif",
                  }}
                >
                  Currently Working On
                </p>
                <ul className="about-list">
                  <li>Smart Fraud Detection System — ML pipeline with FastAPI</li>
                  <li>Election Management System — Java + MySQL backend</li>
                  <li>Data Science Projects — exploratory analysis & visualization</li>
                  <li>AGRIFLASK - Smart Crop Prediction System</li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ background: "rgba(56,189,248,0.015)" }}>
        <div className="section-wrap">
          <FadeUp>
            <div className="section-tag">What I've Built</div>
            <h2 className="section-title">Projects</h2>
            <div className="section-divider" />
          </FadeUp>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <FadeUp key={p.num} delay={i * 120}>
                <div className="project-card">
                  <div className="project-num">{p.num} —</div>
                  <div className="project-title">{p.title}</div>
                  <p className="project-desc">{p.desc}</p>
                  <div className="tag-row">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="card-btns">
                    <a className="btn-card-ghost" href={p.github}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                    <a className="btn-card-ghost" href={p.demo}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Live Demo
                    </a>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-wrap">
          <FadeUp>
            <div className="section-tag">Tech Stack</div>
            <h2 className="section-title">Skills</h2>
            <div className="section-divider" />
          </FadeUp>
          <div className="skills-grid">
            {skills.map((cat, i) => (
              <FadeUp key={cat.category} delay={i * 100}>
                <div className="skill-category">
                  <div className="skill-cat-title">{cat.category}</div>
                  <div className="skill-badges">
                    {cat.items.map((item) => (
                      <span key={item} className="skill-badge">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* RESUME */}
      <section id="resume" className="resume-section">
        <FadeUp>
          <div className="section-tag" style={{ justifyContent: "center" }}>
            My Resume
          </div>
          <h2 className="section-title">Download CV</h2>
          <p>Get a full overview of my education, experience, and projects.</p>
          <a className="btn-download" href="/main cv.pdf" download="main cv.pdf">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </FadeUp>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-wrap">
          <FadeUp>
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title">Contact</h2>
            <div className="section-divider" />
            <p style={{ color: "#64748b", maxWidth: 500 }}>
              Open to internships, collaborations, and interesting conversations. Feel free to reach out!
            </p>
          </FadeUp>
          <div className="contact-grid">
            {[
              {
                label: "Email",
                value: "110karthikeyan@gmail.com",
                href: "mailto:110karthikeyan@gmail.com",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.75">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
              },
              {
                label: "GitHub",
                value: "github.com/karthikeyan110",
                href: "https://github.com/karthikeyan110",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#38bdf8">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                value: "linkedin.com/in/karthikeyan-pandita-900a7a287",
                href: "https://linkedin.com/in/karthikeyan-pandita-900a7a287",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#38bdf8">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                ),
              },
            ].map((c, i) => (
              <FadeUp key={c.label} delay={i * 100}>
                <a className="contact-card" href={c.href} target="_blank" rel="noreferrer">
                  <div className="contact-icon">{c.icon}</div>
                  <div>
                    <div className="contact-label">{c.label}</div>
                    <div className="contact-value">{c.value}</div>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <p>
          Designed &amp; built by <span>Karthikeyan Pandita</span> · {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}