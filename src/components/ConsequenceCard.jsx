import { useState } from "react";
function ConsequenceCard({ level, type, title, description, impact, likelihood, explanation }) {
  const [isExpanded, setIsExpanded] = useState(false);
  function handleToggle() { setIsExpanded(!isExpanded); }
  return <article className={`consequence-card ${type} ${isExpanded ? "expanded" : ""}`}><button className="card-toggle" onClick={handleToggle} aria-expanded={isExpanded}><span className="consequence-level">{level}</span><span className="expand-icon">{isExpanded ? "−" : "+"}</span></button><h3>{title}</h3><p>{description}</p>{isExpanded && <div className="card-details"><div className="impact-row"><div><span>Impact</span><strong>{impact}</strong></div><div><span>Likelihood</span><strong>{likelihood}</strong></div></div><div className="explanation"><span>Why it matters</span><p>{explanation}</p></div></div>}</article>;
}
export default ConsequenceCard;
