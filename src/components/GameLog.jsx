import { useEffect, useRef } from "react";

function GameLog(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [props.content]);

  return (
    <div className="game-log" ref={containerRef}>
      {props.content.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
}

export default GameLog;
