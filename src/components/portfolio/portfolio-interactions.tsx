import { useState, type FormEvent } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { articles, testimonials } from "./portfolio-data";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Expertise", href: "#expertise" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#home" className="wordmark" onClick={() => setOpen(false)} aria-label="Home">AE<span>.</span></a>
        <div className={`nav-links${open ? " nav-links-open" : ""}`}>
          {navigation.map(({ label, href }) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </div>
        <Button asChild variant="default" className="nav-cta"><a href="#contact">Let’s talk <ArrowRight aria-hidden="true" /></a></Button>
        <Button type="button" variant="outline" size="icon" className="nav-menu" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </nav>
    </header>
  );
}

export function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const selected = testimonials[active];
  return (
    <div className="quote-panel">
      <div className="quote-topline"><span>VERIFIED FEEDBACK</span><span>{String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span></div>
      <div className="quote-mark" aria-hidden="true">“</div>
      <blockquote>{selected.quote}</blockquote>
      <div className="quote-bottom"><div><strong>[Client name]</strong><span>[Role] · [Company]</span></div><span className="quote-placeholder">SAMPLE PLACEHOLDER</span></div>
      <div className="quote-controls">
        <span>Replace with a verified reference</span>
        <div>
          <Button variant="outline" size="icon" aria-label="Previous testimonial" onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}><ChevronLeft /></Button>
          <Button variant="outline" size="icon" aria-label="Next testimonial" onClick={() => setActive((active + 1) % testimonials.length)}><ChevronRight /></Button>
        </div>
      </div>
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!subject || !message) {
      setStatus("error");
      return;
    }
    const emailSubject = encodeURIComponent(subject);
    const body = encodeURIComponent(`${message}\n\nFrom: ${String(data.get("name") ?? "")}\nReply to: ${String(data.get("email") ?? "")}`);
    window.location.href = `mailto:your.email@example.com?subject=${emailSubject}&body=${body}`;
    setStatus("success");
  }
  return (
    <form className="contact-form" onSubmit={submitForm}>
      <div className="contact-form-row">
        <label>Your name<input name="name" autoComplete="name" placeholder="Jane Smith" required maxLength={100} /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" placeholder="jane@company.com" required maxLength={254} /></label>
      </div>
      <label>Subject<input name="subject" placeholder="A little about your project" required maxLength={160} /></label>
      <label>Message<textarea name="message" placeholder="What are you working on?" required minLength={10} maxLength={4000} rows={5} /></label>
      {status === "error" && <p className="form-status form-error" role="alert">Please add a subject and a message before sending.</p>}
      {status === "success" && <p className="form-status" role="status"><Check aria-hidden="true" /> Your email app should open with your message. Add your email address to enable replies.</p>}
      <Button type="submit" size="lg" className="submit-button">Send a message <ArrowRight aria-hidden="true" /></Button>
      <p className="form-note">Opens your email app; connect a form service for direct delivery.</p>
    </form>
  );
}

export function ArticleLinks() {
  const navigate = useNavigate();
  return <>{articles.map((article) => (
    <Link key={article.slug} to="/writing/$slug" params={{ slug: article.slug }} className="article-link">
      <div className="article-meta"><span>{article.category}</span><span>{article.minutes} MIN READ</span></div>
      <h3>{article.title}</h3><p>{article.excerpt}</p>
      <span className="article-read">Read article <ArrowRight aria-hidden="true" /></span>
    </Link>
  ))}</>;
}

export function BlogFooterLink({ slug }: { slug: string }) {
  const navigate = useNavigate();
  return <Button variant="link" className="article-return" onClick={() => navigate({ to: "/#writing" })}>Back to writing</Button>;
}
