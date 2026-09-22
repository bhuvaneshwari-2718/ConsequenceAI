import ConsequenceCard from "./ConsequenceCard";
function ConsequenceResults({ consequences }) {
  if (!consequences || consequences.length === 0) return <section className="consequence-results"><div className="chain-header"><span className="eyebrow">CONSEQUENCE CHAIN</span><h2>No consequences found</h2><p>Try describing the scenario in more detail.</p></div></section>;
  return <section className="consequence-results"><div className="chain-header"><span className="eyebrow">YOUR AI ANALYSIS</span><h2><span>{consequences.length}</span> consequences identified</h2><p>Follow the chain to explore how one decision can ripple through a system.</p></div><div className="consequence-chain">{consequences.map((item, index) => <div className="chain-step" key={item.id}><div className="chain-node">{String(index + 1).padStart(2, "0")}</div><ConsequenceCard level={item.level} type={item.type} title={item.title} description={item.description} impact={item.impact} likelihood={item.likelihood} explanation={item.explanation}/>{index < consequences.length - 1 && <div className="chain-connector">↓</div>}</div>)}</div></section>;
}
export default ConsequenceResults;
