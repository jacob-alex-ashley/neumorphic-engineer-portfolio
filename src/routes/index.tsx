import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Code2, Cpu, GitBranch, Layers3, MoveUpRight, Radio, Workflow, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/engineer-portrait.jpg.asset.json";
import { ArticleLinks, ContactForm, PortfolioHeader, TestimonialCarousel } from "@/components/portfolio/portfolio-interactions";
import { expertise, projects } from "@/components/portfolio/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Engineer & Systems Architect | Portfolio" },
      { name: "description", content: "AI engineer specializing in multi-agent systems, distributed architecture, and scalable AI applications. Explore selected projects, experience, and technical writing." },
      { property: "og:title", content: "AI Engineer & Systems Architect | Portfolio" },
      { property: "og:description", content: "Building intelligent systems that scale. Explore AI engineering, distributed systems, selected projects, and technical writing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioHome,
});

const architectureIcons: LucideIcon[] = [Workflow, GitBranch, Layers3, Cpu];
const architectureLabels = ["Orchestrate", "Coordinate", "Scale", "Learn"];

function PortfolioHome() {
  return (
    <main className="portfolio-shell">
      <PortfolioHeader />
      <section className="hero-section" id="home">
        <div className="hero-copy">
          <div className="availability"><span className="availability-dot" /> AI SYSTEMS ENGINEER <span className="availability-divider">/</span> OPEN TO SELECT PROJECTS</div>
          <h1>Building intelligent systems <span>that scale.</span></h1>
          <p className="hero-lede">AI engineering, multi-agent architectures, and distributed systems—thoughtfully designed for the real world.</p>
          <p className="hero-note">I design, develop, and deploy intelligent systems that solve real problems. From autonomous agents to distributed architectures, my focus is building reliable systems made to grow.</p>
          <div className="hero-actions">
            <Button asChild size="lg"><a href="#contact">Let’s work together <MoveUpRight aria-hidden="true" /></a></Button>
            <Button asChild variant="outline" size="lg"><a href="#projects">Explore my work <ArrowDownRight aria-hidden="true" /></a></Button>
          </div>
          <div className="hero-proof" aria-label="Professional experience">
            <div><strong>5<span>+</span></strong><span>Years engineering</span></div>
            <div><strong>45<span>+</span></strong><span>Clients served</span></div>
            <div><strong>AI<span>×</span>SYS</strong><span>Engineering & training</span></div>
          </div>
        </div>
        <div className="portrait-stage">
          <div className="orbit-ring orbit-ring-one" /><div className="orbit-ring orbit-ring-two" />
          <div className="portrait-frame"><img src={portrait.url} alt="Portrait of an AI engineer" fetchPriority="high" /></div>
          <div className="portrait-index"><span>FIELD NOTES — 001</span><span>HUMAN-CENTERED SYSTEMS</span></div>
          <div className="floating-chip chip-ai"><span className="chip-spark" /> AI engineer</div>
          <div className="floating-chip chip-systems"><Workflow aria-hidden="true" /> Multi-agent systems</div>
          <div className="portrait-caption"><span>BUILDING WHAT’S NEXT</span><ArrowUpRight aria-hidden="true" /></div>
        </div>
        <a href="#about" className="hero-scroll"><span>SCROLL TO EXPLORE</span><ArrowDownRight aria-hidden="true" /></a>
      </section>

      <section className="ticker" aria-label="Areas of focus"><div className="ticker-line"><span>INTELLIGENCE, ENGINEERED</span><i /><span>DISTRIBUTED BY DESIGN</span><i /><span>BUILT FOR THE REAL WORLD</span><i /><span>INTELLIGENCE, ENGINEERED</span></div></section>

      <section id="about" className="section about-section">
        <SectionHeading number="01" eyebrow="A little about me" title={<>Engineering <span>beyond intelligence.</span></>} />
        <div className="about-grid">
          <p className="about-statement">I turn complex ideas into <span>intelligent systems</span> people can rely on.</p>
          <div className="about-detail"><p>With 5+ years in AI engineering, I design, build, and scale systems from early architecture through deployment. I’ve worked with 45+ clients across diverse projects, and contributed to large-scale applications including Drip.</p><p>My work spans multi-agent systems, distributed computing, microservices, cyber-physical systems, and the infrastructure that makes modern AI useful. I also teach AI engineering, machine learning engineering, and data analytics.</p><a className="text-link" href="#expertise">What I bring to the table <MoveUpRight aria-hidden="true" /></a></div>
        </div>
        <div className="focus-grid">{["Multi-agent systems", "Distributed computing", "Microservices architecture", "Cyber-physical systems", "Scalable AI infrastructure", "Large language models"].map((item, index) => <div key={item} className="focus-item"><span>0{index + 1}</span><strong>{item}</strong><ArrowUpRight aria-hidden="true" /></div>)}</div>
      </section>

      <section id="experience" className="section experience-section">
        <SectionHeading number="02" eyebrow="Where I’ve made an impact" title={<>A practice built on <span>experience.</span></>} />
        <div className="timeline">
          {[
            { role: "Consultant AI Engineer", organization: "[Company name]", status: "CONSULTING", description: "Designing AI-powered systems, integrating large language models, and shaping application architectures built to scale." },
            { role: "AI Lead", organization: "[Company name]", status: "TECHNICAL LEADERSHIP", description: "Guiding AI initiatives, designing intelligent systems, and helping teams bring AI ideas into development." },
            { role: "AI Trainer", organization: "SMIT Peshawar", status: "EDUCATION & TRAINING", description: "Delivering practical technical training in AI, machine learning, and related emerging technologies." },
          ].map((role, index) => <article key={role.role} className="timeline-item"><div className="timeline-year">0{index + 1}<span className="timeline-stem" /></div><div className="timeline-content"><div className="timeline-heading"><div><span className="eyebrow">{role.status}</span><h3>{role.role}</h3></div><span className="timeline-dates">[DATES TO ADD]</span></div><div className="timeline-detail"><strong>{role.organization}</strong><p>{role.description}</p></div></div></article>)}
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <SectionHeading number="03" eyebrow="Selected work & ideas" title={<>Intelligent work. <span>Thoughtful systems.</span></>} />
        <p className="section-intro">A mix of featured projects and forward-looking concepts. Each is labeled honestly; no unverified results or client claims.</p>
        <div className="projects-grid">{projects.map((project) => <article key={project.number} className="project-card"><div className="project-card-top"><span className="project-number">{project.number} / 07</span><span className={`project-status${project.status === "CONCEPT" ? " status-concept" : ""}`}>{project.status}</span></div><div className="project-art" aria-hidden="true"><ArchitectureGraphic variant={Number(project.number) % 4} /><span>{project.type}</span></div><h3>{project.name}</h3><p className="project-description">{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><span>{project.status === "CONCEPT" ? "PROPOSED CONCEPT" : "PROJECT OVERVIEW"}</span><span className="project-link-placeholder">[Link to add]</span></div></article>)}</div>
        <div className="projects-footnote"><span className="footnote-mark">i</span><p>Featured work descriptions are based on the supplied brief. Repository and live demo links are placeholders until verified URLs are provided. Concepts are not presented as deployed work.</p></div>
      </section>

      <section id="expertise" className="section expertise-section">
        <SectionHeading number="04" eyebrow="What I work with" title={<>Designed in layers. <span>Engineered as one.</span></>} />
        <p className="section-intro">The tools are only as useful as the systems they support.</p>
        <div className="expertise-grid">{expertise.map((group, index) => { const Icon = architectureIcons[index]; return <article key={group.title} className="expertise-group"><div className="expertise-group-top"><Icon aria-hidden="true" /><span>0{index + 1} / 04</span></div><h3>{group.title}</h3><div className="expertise-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>; })}</div>
      </section>

      <section id="education" className="section education-section">
        <SectionHeading number="05" eyebrow="The foundations" title={<>Grounded in <span>curiosity.</span></>} />
        <div className="education-grid"><article className="education-card"><span>01 / GRADUATE STUDY</span><Code2 aria-hidden="true" /><h3>Master’s in Data Science</h3><p>IMSciences</p><span className="education-meta">DATA · RESEARCH · COMPUTATION</span></article><article className="education-card"><span>02 / UNDERGRADUATE STUDY</span><Layers3 aria-hidden="true" /><h3>Bachelor’s in Computer Systems Engineering</h3><p>University of Engineering and Technology (UET), Peshawar</p><span className="education-meta">COMPUTER SYSTEMS · ENGINEERING</span></article></div>
      </section>

      <section className="section testimonials-section">
        <SectionHeading number="06" eyebrow="A note on references" title={<>Good work, told <span>by others.</span></>} />
        <div className="testimonial-layout"><p className="testimonial-intro">These spaces are reserved for verified feedback. Nothing here is attributed to a real person until you add their permission-based reference.</p><TestimonialCarousel /></div>
      </section>

      <section id="writing" className="section writing-section">
        <SectionHeading number="07" eyebrow="Ideas in progress" title={<>Thinking about <span>what’s next.</span></>} />
        <div className="writing-header"><p className="section-intro">Technical notes on the systems, architectures, and decisions behind practical AI.</p><span>01—06 / FIELD NOTES</span></div>
        <div className="articles-grid"><ArticleLinks /></div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="contact-intro"><span className="eyebrow"><Radio aria-hidden="true" /> OPEN CHANNEL</span><h2>Have an interesting <span>problem to solve?</span></h2><p>Building an AI-powered product? Scaling an existing system? Exploring multi-agent architectures? Let’s talk about the hard part.</p><div className="contact-direct"><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <MoveUpRight aria-hidden="true" /></a><a href="https://x.com/" target="_blank" rel="noreferrer">X / Twitter <MoveUpRight aria-hidden="true" /></a><a href="mailto:your.email@example.com">Email <MoveUpRight aria-hidden="true" /></a></div><span className="contact-placeholder">SOCIAL PROFILE LINKS & EMAIL TO CONFIRM</span></div>
        <ContactForm />
      </section>

      <footer className="site-footer"><a href="#home" className="wordmark">AE<span>.</span></a><p>Intelligence, engineered. <span>Systems, made human.</span></p><nav aria-label="Footer navigation">{navigation.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}</nav><span className="footer-credit">LINKS TO CONFIRM · © {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function SectionHeading({ number, eyebrow, title }: { number: string; eyebrow: string; title: React.ReactNode }) {
  return <div className="section-heading"><span className="section-number">{number} <i /></span><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div></div>;
}

function ArchitectureGraphic({ variant }: { variant: number }) {
  const points = [
    [[13, 50], [35, 23], [38, 73], [62, 35], [65, 68], [87, 50]],
    [[14, 32], [34, 60], [50, 30], [68, 66], [87, 38]],
    [[16, 65], [28, 35], [50, 48], [72, 27], [86, 62]],
    [[14, 48], [35, 48], [50, 26], [50, 71], [70, 48], [88, 48]],
  ][variant];
  const Icon = architectureIcons[variant];
  return <div className={`architecture-graphic architecture-variant-${variant}`}><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><line x1="13" y1="50" x2="35" y2="23"/><line x1="35" y1="23" x2="38" y2="73"/><line x1="38" y1="73" x2="62" y2="35"/><line x1="62" y1="35" x2="65" y2="68"/><line x1="65" y1="68" x2="87" y2="50"/><line x1="35" y1="23" x2="62" y2="35"/><line x1="38" y1="73" x2="65" y2="68"/>{points.map(([x, y], index) => <circle key={index} cx={x} cy={y} r={index === 2 ? 2.8 : 1.9} />)}</svg><span className="architecture-center"><Icon aria-hidden="true" /></span></div>;
}