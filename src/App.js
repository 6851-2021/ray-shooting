import React, { Fragment, useState } from "react";
import Mode from "./mode";
import "./App.scss";
import { PersistentAVLTree } from "./PersistentAVLTree";
import plusIcon from "./img/plus.svg";

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
    }
  };

  /*
  operations:
  tree.insert(el)
  tree.delete(el)

  tree.step() moves to the next version number, aka run every line of the sweep
  run as many inserts/deletes as necessary on each step
  */

  const tree = new PersistentAVLTree();
  tree.insert(1);
  tree.step();
  console.log(tree);
  tree.insert(6);
  tree.step();
  console.log(tree);
  tree.insert(3);
  tree.step();
  console.log(tree);
  tree.insert(5);
  tree.step();
  console.log(tree);
  tree.insert(10);
  tree.insert(2);
  tree.step();
  console.log(tree);
  tree.insert(11);
  tree.step();
  console.log(tree);
  tree.delete(1);
  tree.step();
  tree.step();
  tree.step();
  tree.step();
  tree.step();
  tree.step();
  console.log(tree);
  tree.delete(10);
  tree.step();
  console.log(tree);

  /*
  tree.shootVerticalRay(version, Y) returns:
    null - if something goes wrong
    Node object - if hits an edge
    true - if hits top border (no successor found in graph)
*/
  console.log(tree.shootVerticalRay(3, 3));

  const buildTree = () => {
    if (lines.length === 0) {
      return;
    }

    const dx = 1;
    const tree = new PersistentAVLTree();

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
    let reverseLineIdx = lines.length - 1;

    for (let i = 0; i < window.innerWidth; i += dx) {
      if (lineIdx < lines.length && sortedLines[lineIdx].x1 <= i) {
        tree.insert(lineIdx);
        lineIdx++;
      }

      if (reverseLineIdx >= 0 && reverseSortedLines[reverseLineIdx].x2 <= i) {
        tree.delete(reverseLineIdx);
        reverseLineIdx--;
      }

      // TODO: Save the current AVL tree
    }
  };

  buildTree();

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
      </div>
      <svg width={window.innerWidth} height={window.innerHeight}>
        {firstPoint !== null ? (
          <circle cx={firstPoint.x} cy={firstPoint.y} r={4} />
        ) : null}
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
