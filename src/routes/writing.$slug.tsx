import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock3, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles } from "@/components/portfolio/portfolio-data";

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => {
    const article = articles.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Article"} | AI Engineering Notes` },
      { name: "description", content: loaderData?.excerpt ?? "Notes on AI engineering, distributed systems, and scalable software architecture." },
      { property: "og:title", content: `${loaderData?.title ?? "Article"} | AI Engineering Notes` },
      { property: "og:description", content: loaderData?.excerpt ?? "Notes on AI engineering, distributed systems, and scalable software architecture." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WritingArticle,
});

const articleBody: Record<string, Array<{ heading: string; paragraphs: string[] }>> = {
  "designing-scalable-multi-agent-systems": [
    { heading: "Start with the work, not the agents", paragraphs: ["Multi-agent design begins with a problem that genuinely benefits from parallel responsibilities. Break down the user’s task first, then decide which responsibilities need separate boundaries.", "A handful of clearly scoped roles is easier to reason about than an open-ended collection of agents that can all do the same thing."] },
    { heading: "Give every agent a useful boundary", paragraphs: ["An agent’s job, available information, and expected result should be easy to describe. A coordinator can assign work, check outputs, and decide when the system has enough information to answer.", "Explicit boundaries make it easier to test a single step and understand what went wrong when a complete workflow misses its goal."] },
    { heading: "Plan for failure and observability", paragraphs: ["Models can return uncertain, incomplete, or unexpected results. Production workflows need input validation, time limits, controlled retries, and a defined response when a step cannot finish.", "Record each meaningful handoff and the decisions that shape it. This helps teams investigate behavior while keeping the user-facing experience clear and respectful of sensitive information."] },
    { heading: "Measure the complete workflow", paragraphs: ["Evaluate representative end-to-end tasks, not only a single agent’s response. Consider correctness, consistency, latency, and resource use alongside the quality of the final result.", "A good multi-agent system earns its complexity by making important work more dependable—not by adding more agents to the diagram."] },
  ],
  "llm-prototypes-to-production": [
    { heading: "A promising prototype is a starting point", paragraphs: ["A prototype shows that a model can produce a useful response for a particular example. A production feature has to perform acceptably across many inputs, including unclear, unusual, and incomplete requests.", "The next step is to define what success means for the real people and workflows the product supports."] },
    { heading: "Build the system around the model", paragraphs: ["Production AI includes a model, application logic, context, evaluation, and a user experience. Retrieval, structured outputs, access control, and validation each need a specific purpose.", "Keep model access behind an application boundary so changes to a provider, prompt, or model do not spread throughout the product."] },
    { heading: "Make quality observable", paragraphs: ["Collect a representative evaluation set and examine how the feature behaves over time. Monitor latency, failures, retrieval quality, and user corrections without recording unnecessary personal data.", "Useful traces help teams distinguish a model issue from a missing source, a workflow decision, or an application-level problem."] },
    { heading: "Release with clear fallbacks", paragraphs: ["Set timeouts and expectations. Provide a helpful alternative when a model or dependent service is unavailable, and avoid presenting uncertain output as verified fact.", "Production readiness is an ongoing practice: measure, improve, and revisit the boundaries of the system as real use reveals new needs."] },
  ],
  "microservices-vs-distributed-architectures": [
    { heading: "Different words, different questions", paragraphs: ["Distributed architecture describes a system whose parts run across connected processes or machines. Microservices describes one approach to organizing an application into independently owned services.", "The ideas overlap, but they are not interchangeable: many distributed systems are not microservices, and using microservices introduces distribution whether or not the team needs it."] },
    { heading: "The trade-offs matter", paragraphs: ["Network calls introduce latency and possible failures. Independent deployments also require careful attention to contracts, authentication, observability, and the way data moves between boundaries.", "A simpler application may be easier to change and operate than a collection of independently deployed services, especially while the product and team are still evolving."] },
    { heading: "Choose boundaries from real needs", paragraphs: ["Independent scaling, deployment cadence, and clear team ownership can justify a service boundary. Separate components alone do not automatically make a system easier to understand.", "Prefer boundaries that align with stable responsibilities, and let operational needs inform how independently those pieces should run."] },
    { heading: "Design the operating model, too", paragraphs: ["Before splitting services, consider how teams will trace a request across them, recover from partial failure, and change an API without interrupting users.", "The right architecture is the least complex structure that can reliably serve the product’s real requirements."] },
  ],
  "reliable-ai-agent-workflows": [
    { heading: "Make the workflow explicit", paragraphs: ["Agentic does not need to mean unpredictable. Define which decisions an agent may make, the tools it may use, and the conditions under which the workflow stops or asks for help.", "Explicit workflow state gives engineers and users a clearer picture of what the system is doing."] },
    { heading: "Validate every boundary", paragraphs: ["Treat model responses and external tool results as inputs that need validation. Prefer structured output, narrow tool permissions, and checks before consequential actions.", "If a required condition is not met, recover safely instead of quietly passing an incomplete result downstream."] },
    { heading: "Use retries with care", paragraphs: ["Bound retries and execution time. A repeated request can have a different outcome on every attempt, and an action with side effects may not be safe to repeat.", "Design tools to handle duplicate requests appropriately and make the recovery behavior understandable to the user."] },
    { heading: "Evaluate the path, not only the answer", paragraphs: ["A correct final response is not the only measure of quality. Check whether the workflow used relevant sources and tools, respected its constraints, and stayed within expected cost and latency.", "Clear traces and a representative evaluation set help teams improve agent reliability with evidence rather than intuition alone."] },
  ],
  "deploying-open-source-llms-at-scale": [
    { heading: "Work backwards from the workload", paragraphs: ["Model selection depends on the task, context length, response-time needs, throughput, and available hardware. Evaluate representative prompts before choosing a deployment approach.", "An impressive model benchmark does not guarantee an efficient system for a particular application."] },
    { heading: "Account for the full serving path", paragraphs: ["Serving includes memory, parallel requests, input preparation, output tokens, scheduling, and monitoring—not just the model weights.", "Measure the application-level experience under realistic usage patterns, including peak concurrency and longer inputs."] },
    { heading: "Make capacity predictable", paragraphs: ["Capacity planning balances available compute against the patterns of incoming demand. A sensible queue, request limit, and timeout can protect availability when traffic rises.", "Operational visibility helps a team distinguish infrastructure pressure from model errors or application bottlenecks."] },
    { heading: "Compare ownership and responsibility", paragraphs: ["Self-hosting changes who operates the model-serving stack and manages its updates, security, and reliability. That responsibility is part of the cost and should be weighed against the intended benefits.", "Use current, workload-specific measurements to guide the decision; infrastructure assumptions age quickly as models and products change."] },
  ],
  "future-of-cyber-physical-systems": [
    { heading: "Where digital systems meet the physical world", paragraphs: ["Cyber-physical systems connect software, communication, and real physical processes. Applications span connected devices, industrial automation, and other systems where computing can influence the environment.", "That connection makes latency, reliability, and clear failure behavior especially important."] },
    { heading: "Design for uncertainty", paragraphs: ["Sensors are imperfect, networks can be unreliable, and the physical environment can change. Systems need clear ways to validate inputs and respond safely to missing or unexpected data.", "Depending on the use case, safety boundaries, local fallback behavior, and human oversight can matter more than sophisticated automation."] },
    { heading: "Apply intelligence responsibly", paragraphs: ["AI can help interpret data or support decisions. Its role should be defined in the context of what a wrong or delayed output could mean for the people affected.", "Useful assurance requires understanding how data is collected, the conditions under which the system performs, and when an action must require human confirmation."] },
    { heading: "Build the whole lifecycle", paragraphs: ["Physical deployments require ongoing attention to connectivity, updates, monitoring, and changes in the environment. A system is only as dependable as the processes that keep it functioning.", "The best results come from bringing software, systems, and domain expertise together from the beginning."] },
  ],
};

function WritingArticle() {
  const article = Route.useLoaderData();
  const sections = articleBody[article.slug] ?? [];
  return (
    <main className="article-page">
      <header className="article-nav"><a href="/#home" className="wordmark">AE<span>.</span></a><Button asChild variant="outline" size="sm"><a href="/#writing"><ArrowLeft aria-hidden="true" /> All writing</a></Button></header>
      <article className="article-main">
        <div className="article-hero"><a href="/#writing" className="article-back">← FIELD NOTES / AI ENGINEERING</a><span className="article-category">{article.category}</span><h1>{article.title}</h1><p>{article.excerpt}</p><div className="article-detail-meta"><span>BY [YOUR NAME]</span><span>DATE: [TO ADD]</span><span><Clock3 aria-hidden="true" /> {article.minutes} MIN READ</span></div></div>
        <div className="article-body"><p className="article-lead">A practical field note on designing intelligent systems that work outside the demo—where trade-offs, real constraints, and the needs of people all matter.</p>{sections.map((section, index) => <section key={section.heading} className="article-chapter"><span className="chapter-number">0{index + 1} /</span><div><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}<div className="article-endmark"><span />END OF NOTE<span /></div><a className="article-home-link" href="/#writing">Explore more field notes <MoveUpRight aria-hidden="true" /></a></div>
      </article>
      <footer className="article-footer"><a href="/#home" className="wordmark">AE<span>.</span></a><span>INTELLIGENCE, ENGINEERED.</span><a href="/#contact">Start a conversation <MoveUpRight aria-hidden="true" /></a></footer>
    </main>
  );
}