function ErrorMessage({ message, onRetry }) { return <div className="error-message"><span>!</span><p>{message}</p><button className="button button-ghost" onClick={onRetry}>Try again ↗</button></div>; }
export default ErrorMessage;
