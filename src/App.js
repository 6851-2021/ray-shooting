import React, { Fragment, useState } from 'react';
import Mode from './mode';
import './App.scss';

const App = () => {
  const [mode, setMode] = useState(0);
  const [firstPoint, setFirstPoint] = useState(null);
  const [lines, setLines] = useState([]);

  const handleClick = (e) => {
    if (e.target.tagName.toLowerCase() !== "svg") return;

    if (mode === Mode.CREATING_LINE_SEGMENT) {
      if (firstPoint === null) {
        setFirstPoint({
          x: e.clientX,
          y: e.clientY
        });
      } else {
        setMode(Mode.NONE);
        setFirstPoint(null);
        setLines(lines.concat({
          x1: firstPoint.x,
          y1: firstPoint.y,
          x2: e.clientX,
          y2: e.clientY
        }));
      }
    }
  };

  return (
    <div className="App" onClick={handleClick}>
      <div className="vertical-lines" />
      <div className="horizontal-lines" />
      <div className="button-bar">
        <button onClick={() => setMode(Mode.CREATING_LINE_SEGMENT)}>
          <img src="https://placehold.it/32" alt="Create line segment" />
          <p>Create line segment</p>
        </button>
      </div>
      <svg width={window.innerWidth} height={window.innerHeight}>
        {firstPoint !== null ? (
          <circle cx={firstPoint.x} cy={firstPoint.y} r={4} />
        ) : null}
        {lines.map((line, idx) => (
          <Fragment key={idx}>
            <circle cx={line.x1} cy={line.y1} r={4} />
            <circle cx={line.x2} cy={line.y2} r={4} />
            <line key={idx} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
          </Fragment>
        ))}
      </svg>
    </div>
  );
};

export default App;
