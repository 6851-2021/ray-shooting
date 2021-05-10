import React, { useCallback, useRef, useState } from "react";
import Mode from "./mode";
import "./App.scss";
import { PersistentAVLTree, Line } from "./PersistentAVLTree";
import EventType from "./eventType";

import plusIcon from "./img/plus.svg";
import rayIcon from "./img/ray.svg";
import PriorityQueue from "./priorityQueue";

const App = () => {
  const [mode, setMode] = useState(Mode.CREATING_LINE_SEGMENT);
  const [firstPoint, setFirstPoint] = useState(null);
  const [lines, setLines] = useState([]);
  const [tree, setTree] = useState(new PersistentAVLTree());

  const canvasRef = useRef(null);

  const buildTree = useCallback(() => {
    if (lines.length === 0) {
      return;
    }

    const tree = new PersistentAVLTree();
    const dx = 1;

    const queue = new PriorityQueue();

    lines.forEach((line, idx) => {
      queue.insert({
        eventType: EventType.START,
        lineIdx: idx,
        val: line.x1
      });

      queue.insert({
        eventType: EventType.END,
        lineIdx: idx,
        val: line.x2
      });
    });

    for (let i = 0; i < window.innerWidth; i += dx) {
      if (queue.peek() === undefined || queue.peek().val !== i) {
        tree.step();
        continue;
      }

      const evt = queue.extractMin();
      console.log(evt);

      if (evt.eventType === EventType.START) {
        const { x1, y1, x2, y2 } = lines[evt.lineIdx];

        tree.insert(
          new Line(x1, window.innerHeight - y1, x2, window.innerHeight - y2)
        );
      } else if (evt.eventType === EventType.END) {
        const { x1, y1, x2, y2 } = lines[evt.lineIdx];

        tree.delete(
          new Line(x1, window.innerHeight - y1, x2, window.innerHeight - y2)
        );
      }

      tree.step();
    }

    return tree;
  }, [lines]);

  const createLineElement = (line, id = null) => {
    const elem = document.createElementNS("http://www.w3.org/2000/svg", "line");
    elem.setAttribute("x1", line.x1);
    elem.setAttribute("y1", line.y1);
    elem.setAttribute("x2", line.x2);
    elem.setAttribute("y2", line.y2);

    if (id !== null) {
      elem.setAttribute("id", id);
    }

    return elem;
  };

  const createCircleElement = (x, y, r = 4) => {
    const elem = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    elem.setAttribute("cx", x);
    elem.setAttribute("cy", y);
    elem.setAttribute("r", r);
    return elem;
  };

  const handleClick = (e) => {
    if (e.target.tagName.toLowerCase() !== "svg") return;

    if (mode === Mode.CREATING_LINE_SEGMENT) {
      if (firstPoint === null) {
        setFirstPoint({
          x: e.clientX,
          y: e.clientY,
        });

        canvasRef.current.appendChild(createCircleElement(e.clientX, e.clientY));
      } else {
        setFirstPoint(null);

        // True if e.clientX/e.clientY describes x1
        // x1 is the point with the smaller x coordinate
        const newPoint = e.clientX < firstPoint.x;

        const line = {
          x1: newPoint ? e.clientX : firstPoint.x,
          y1: newPoint ? e.clientY : firstPoint.y,
          x2: !newPoint ? e.clientX : firstPoint.x,
          y2: !newPoint ? e.clientY : firstPoint.y,
        };

        setLines(lines.concat(line));

        canvasRef.current.appendChild(createLineElement(line));
        canvasRef.current.appendChild(createCircleElement(e.clientX, e.clientY));
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

    if (document.getElementById("ray") !== null) {
      document.getElementById("ray").remove();
    }

    const elem = tree.shootVerticalRay(e.clientX, window.innerHeight - e.clientY);

    if (elem === null || elem.element === undefined) {
      return;
    }

    const {startX, startY, endX, endY} = elem.element;
    const topRayY = startY + (endY - startY) / (endX - startX) * (e.clientX - startX);

    canvasRef.current.appendChild(createLineElement({
      x1: e.clientX,
      y1: e.clientY,
      x2: e.clientX,
      y2: window.innerHeight - topRayY
    }, "ray"));
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

            setTree(buildTree());
            setMode(Mode.SHOOTING_RAY);
          }}
        >
          <img src={rayIcon} alt="Shoot vertical ray" />
          <p>Shoot vertical ray</p>
        </button>
      </div>
      <svg ref={canvasRef} width={window.innerWidth} height={window.innerHeight} onMouseMove={handleMouseMove} />
    </div>
  );
};

export default App;
