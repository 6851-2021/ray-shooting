import React, { Fragment, useEffect, useState } from "react";
import Mode from "./mode";
import "./App.scss";
import { PersistentAVLTree, Line } from "./PersistentAVLTree";

import plusIcon from "./img/plus.svg";
import rayIcon from "./img/ray.svg";

const App = () => {
  const [mode, setMode] = useState(0);
  const [firstPoint, setFirstPoint] = useState(null);
  const [lines, setLines] = useState([]);
  const [rayLine, setRayLine] = useState(null);
  const [tree, setTree] = useState(new PersistentAVLTree());

  useEffect(() => {
    if (lines.length === 0) {
      return;
    }

    const tree = new PersistentAVLTree();
    const dx = 1;

    // TODO: Need to make sure that x coordinates are distinct
    const sortedLines = [...lines];
    sortedLines.sort((first, second) => {
      if (first.x1 < second.x1) {
        return -1;
      } else if (first.x1 > second.x1) {
        return 1;
      }

      return 0;
    });

    const reverseSortedLines = [...lines];
    reverseSortedLines.sort((first, second) => {
      if (first.x2 < second.x2) {
        return -1;
      } else if (first.x2 > second.x2) {
        return 1;
      }

      return 0;
    });

    // Build AVL tree
    let lineIdx = 0;
    let reverseLineIdx = 0;

    for (let i = 0; i < window.innerWidth; i += dx) {
      if (lineIdx < lines.length && sortedLines[lineIdx].x1 <= i) {
        const { x1, y1, x2, y2 } = sortedLines[lineIdx];
        tree.insert(
          new Line(x1, window.innerHeight - y1, x2, window.innerHeight - y2)
        );
        lineIdx++;
      }

      if (
        reverseLineIdx < lines.length &&
        reverseSortedLines[reverseLineIdx].x2 <= i
      ) {
        const { x1, y1, x2, y2 } = reverseSortedLines[reverseLineIdx];
        tree.delete(
          new Line(x1, window.innerHeight - y1, x2, window.innerHeight - y2)
        );
        reverseLineIdx++;
      }

      tree.step();
    }

    setTree(tree);
  }, [lines, setTree]);

  const handleClick = (e) => {
    if (e.target.tagName.toLowerCase() !== "svg") return;

    if (mode === Mode.CREATING_LINE_SEGMENT) {
      if (firstPoint === null) {
        setFirstPoint({
          x: e.clientX,
          y: e.clientY,
        });
      } else {
        setMode(Mode.NONE);
        setFirstPoint(null);

        // True if e.clientX/e.clientY describes x1
        // x1 is the point with the smaller x coordinate
        const newPoint = e.clientX < firstPoint.x;

        setLines(
          lines.concat({
            x1: newPoint ? e.clientX : firstPoint.x,
            y1: newPoint ? e.clientY : firstPoint.y,
            x2: !newPoint ? e.clientX : firstPoint.x,
            y2: !newPoint ? e.clientY : firstPoint.y,
          })
        );
      }
    } else if (mode === Mode.SHOOTING_RAY) {
      console.log(
        "btuhh"
        // tree.shootVerticalRay(e.clientX, window.innerHeight - e.clientY)
      );
    }
  };

  const handleMouseMove = (e) => {
    if (mode !== Mode.SHOOTING_RAY) {
      return;
    }

    // console.log(tree.getVersion(e.clientX));
    // return;

    const elem = tree.shootVerticalRay(
      e.clientX,
      window.innerHeight - e.clientY
    );

    if (elem === null || elem.element === undefined) {
      setRayLine(null);
      return;
    }

    const line = lines.find(
      (x) => window.innerHeight - x.y1 === elem.element.startY
    );

    if (line === undefined) {
      setRayLine(null);
      return;
    }

    const topRayY =
      line.y1 +
      ((line.y2 - line.y1) / (line.x2 - line.x1)) * (e.clientX - line.x1);

    setRayLine({
      x1: e.clientX,
      y1: e.clientY,
      x2: e.clientX,
      y2: topRayY,
    });
  };

  return (
    <div className="App" onClick={handleClick}>
      <div className="vertical-lines" />
      <div className="horizontal-lines" />
      <div className="button-bar">
        <button
          className={mode === Mode.CREATING_LINE_SEGMENT ? "selected" : ""}
          onClick={() => setMode(Mode.CREATING_LINE_SEGMENT)}
        >
          <img src={plusIcon} alt="Create line segment" />
          <p>Create line segment</p>
        </button>
        <button
          className={mode === Mode.SHOOTING_RAY ? "selected" : ""}
          onClick={() => {
            if (lines.length === 0) {
              return;
            }

            setMode(mode === Mode.SHOOTING_RAY ? Mode.NONE : Mode.SHOOTING_RAY);
          }}
        >
          <img src={rayIcon} alt="Shoot vertical ray" />
          <p>Shoot vertical ray</p>
        </button>
      </div>
      <svg
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseMove={handleMouseMove}
      >
        {firstPoint !== null ? (
          <circle cx={firstPoint.x} cy={firstPoint.y} r={4} />
        ) : null}
        {rayLine !== null ? <line {...rayLine} className="ray" /> : null}
        {lines.map((line, idx) => (
          <Fragment key={idx}>
            <circle cx={line.x1} cy={line.y1} r={4} />
            <circle cx={line.x2} cy={line.y2} r={4} />
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
            />
          </Fragment>
        ))}
      </svg>
    </div>
  );
};

export default App;
