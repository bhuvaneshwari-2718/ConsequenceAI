import { useState } from "react";
import "./App.css";
import { analyzeScenario } from "./services/consequenceApi";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScenarioInput from "./components/ScenarioInput";
import Loading from "./components/Loading";
import ConsequenceResults from "./components/ConsequenceResults";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [showSimulation, setShowSimulation] = useState(false);
  const [scenario, setScenario] = useState("");
  const [category, setCategory] = useState("Technology");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [consequences, setConsequences] = useState([]);
  const [error, setError] = useState("");

  function handleStart() {
    setShowSimulation(true);
    window.setTimeout(() => document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }
  function handleReset() {
    setScenario("");
    setShowResults(false);
    setIsLoading(false);
    setConsequences([]);
    setError("");
  }
  async function handleGenerate() {
    console.log("Scenario:", scenario);
    setIsLoading(true);
    setShowResults(false);
    setError("");
    try {
      const result = await analyzeScenario(scenario, category);
      console.log("AI result:", result);
      if (!Array.isArray(result)) throw new Error("Invalid consequence data received.");
      setConsequences(result);
      setShowResults(true);
    } catch (error) {
      console.error("Analysis failed:", error);
      setError("Something went wrong while analyzing the scenario.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      <div className="starfield" aria-hidden="true" />
      <Navbar onStart={handleStart} />
      <Hero onStart={handleStart} />

      <main>
        <section className="intro-section section-wrap" id="features">
          <div className="intro-copy">
            <span className="eyebrow">THE BIG PICTURE</span>
            <h2>What is <span>ConsequenceAI?</span></h2>
            <p>ConsequenceAI is an AI-powered web application that helps you explore the ripple effects of a decision—from the immediate outcome to long-term changes across people, systems, and the world around us.</p>
            <button className="button button-primary compact" onClick={handleStart}>Try it now <span>↗</span></button>
          </div>
          <div className="feature-grid">
            <article className="feature-card violet-card"><div className="feature-icon">ϟ</div><h3>Direct Effects</h3><p>The immediate and most obvious outcomes of your decision.</p><small>01</small></article>
            <article className="feature-card blue-card"><div className="feature-icon">✣</div><h3>Second Order Effects</h3><p>The indirect and cascading consequences that follow.</p><small>02</small></article>
            <article className="feature-card cyan-card"><div className="feature-icon">◎</div><h3>Systemic Effects</h3><p>The long-term, large-scale impacts on systems, people, and the environment.</p><small>03</small></article>
          </div>
        </section>

        <section className="process-section section-wrap" id="how-it-works">
          <div className="section-heading"><span className="eyebrow">SIMPLE PROCESS</span><h2>How it <span>works</span></h2><p>Get started in seconds. Let AI help you see beyond the obvious.</p></div>
          <div className="process-layout">
            <div className="steps-grid">
              <article className="step"><div className="step-orb">▤</div><h3><b>1.</b> Enter your scenario</h3><p>Describe a decision, event, or idea in simple words.</p></article>
              <span className="step-arrow">›</span>
              <article className="step"><div className="step-orb blue-orb">♧</div><h3><b>2.</b> AI analysis</h3><p>Our model identifies context and potential consequences.</p></article>
              <span className="step-arrow">›</span>
              <article className="step"><div className="step-orb">⌘</div><h3><b>3.</b> Explore the chain</h3><p>View a clear chain of direct, second-order, and systemic effects.</p></article>
              <span className="step-arrow">›</span>
              <article className="step"><div className="step-orb blue-orb">◎</div><h3><b>4.</b> Gain insights</h3><p>Understand the bigger picture and make informed decisions.</p></article>
            </div>
            <div className="mini-dashboard" aria-label="Illustration of an AI consequence dashboard">
              <div className="dash-top"><i/><i/><i/><span>CONSEQUENCE MAP</span></div>
              <div className="dash-body"><div className="node-map"><span className="map-node n1">✦</span><span className="map-node n2">✣</span><span className="map-node n3">◈</span><span className="map-node n4">⌘</span><span className="map-node n5">◎</span><span className="map-node n6">✧</span><div className="map-lines"/></div><div className="dash-list"><div>✦ <span>Direct</span><b>1</b></div><div>✣ <span>Second order</span><b>2</b></div><div>◎ <span>Systemic</span><b>3</b></div><div className="dash-meter"/></div></div>
            </div>
          </div>
        </section>

        {showSimulation && <section className="simulator-section section-wrap" id="simulator">
          <div className="simulator-panel"><div className="sim-art"><div className="cosmic-orb small-orb"><div className="orb-core"/></div><div className="floating-note"><strong>Better decisions.</strong><br/>Brighter futures.<div className="note-line"/></div></div>
            <div className="sim-content"><span className="eyebrow">START YOUR ANALYSIS</span><h2>Describe your <span>scenario</span></h2><p>Enter a situation, decision, or idea. Be as specific as you can.</p>
              <ScenarioInput scenario={scenario} onScenarioChange={setScenario} category={category} onCategoryChange={setCategory} onGenerate={handleGenerate} onReset={handleReset} isLoading={isLoading}/>
            </div>
          </div>
          {isLoading && <Loading />}
          {error && <ErrorMessage message={error} onRetry={handleGenerate} />}
          {showResults && !isLoading && <ConsequenceResults consequences={consequences} />}
        </section>}

        <section className="scenarios-section section-wrap" id="scenarios"><div className="section-heading"><span className="eyebrow">TRY THESE SCENARIOS</span><h2>Explore different <span>scenarios</span></h2><p>See how one decision can create a chain of unexpected consequences.</p></div>
          <div className="scenario-grid">
            {[["✦","Technology","A hospital introduces AI systems to assist doctors in diagnosing patients."],["▦","Business","A company allows employees to work completely remotely for the next five years."],["♧","Jobs & Workforce","A software company automates 50% of its repetitive programming tasks."],["♢","Environment","A city replaces most of its petrol buses with electric buses."],["♟","Society","Most people in a country begin using AI assistants for everyday decisions."],["⌂","Education","Universities replace traditional lectures with AI-powered personalized learning."],["▤","Finance","Banks introduce AI systems to automatically approve or reject most loan applications."],["➤","Future / Other","Self-driving cars become the main form of transportation in a large city."]].map(([icon,title,description])=><button className="scenario-tile" key={title} onClick={()=>{setCategory(title === "Future / Other" ? "Other" : title);setScenario(description);setShowSimulation(true);window.setTimeout(()=>document.getElementById("simulator")?.scrollIntoView({behavior:"smooth",block:"start"}),80);}}><span className="tile-icon">{icon}</span><strong>{title}</strong><p>{description}</p><span className="tile-arrow">↗</span></button>)}
          </div>
        </section>

        <section className="impact-banner section-wrap"><div className="banner-visual"><div className="mountain mountain-one"/><div className="mountain mountain-two"/><div className="banner-spark">✦</div></div><div className="banner-copy"><span className="eyebrow">WHY IT MATTERS</span><h2>Make better decisions<br/>with deeper <span>understanding</span></h2><p>From business to personal choices, ConsequenceAI helps you see the bigger picture.</p></div><div className="banner-stats"><div><strong>8+</strong><span>Life categories</span></div><div><strong>4</strong><span>Impact levels</span></div><div><strong>∞</strong><span>Possible outcomes</span></div></div></section>

        <section className="quote-section section-wrap" id="about"><div><span className="eyebrow">REAL IMPACT</span><h2>Curiosity changes <span>everything.</span></h2><p>Students, professionals, and dreamers—think further, connect the dots, and explore what comes next.</p></div><blockquote><span className="quote-mark">“</span><p>Every choice is the beginning of a story. See where yours could lead.</p><small>— The ConsequenceAI mindset</small></blockquote></section>
        <section className="final-cta section-wrap"><div className="cta-symbol">✧</div><div><h2>Ready to explore the consequences?</h2><p>Start now and see how a single decision can shape the future.</p></div><button className="button button-primary" onClick={handleStart}>Start exploring <span>↗</span></button></section>
      </main>
      <footer className="footer"><div className="footer-brand"><span className="brand-mark">✣</span><strong>Consequence<span>AI</span></strong></div><div className="footer-links"><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#about">About</a><a href="mailto:hello@consequenceai.app">Contact</a></div><small>Built with curiosity <span>♥</span> for a better tomorrow.</small></footer>
    </div>
  );
}
export default App;
