function Navbar({ onStart }) {
  return <nav className="navbar"><a className="brand" href="#top" aria-label="ConsequenceAI home"><span className="brand-mark">✣</span><strong>Consequence<span>AI</span></strong></a><div className="nav-links"><a href="#top">Home</a><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#about">About</a><a href="mailto:hello@consequenceai.app">Contact</a></div><button className="nav-cta" onClick={onStart}>Start exploring <span>→</span></button></nav>;
}
export default Navbar;
