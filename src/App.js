import React, { useRef, useState } from "react";
import Mode from "./mode";
import "./App.scss";
import { PersistentAVLTree, Line, copySubtree } from "./PersistentAVLTree";
import EventType from "./eventType";

import clipboardIcon from "./img/clipboard.svg";
import plusIcon from "./img/plus.svg";
import rayIcon from "./img/ray.svg";
import wrenchIcon from "./img/wrench.svg";
import PriorityQueue from "./priorityQueue";

const App = () => {
  const [mode, setMode] = useState(Mode.CREATING_LINE_SEGMENT);
  const [firstPoint, setFirstPoint] = useState(null);
  const [lines, setLines] = useState([]);
  const [tree, setTree] = useState(new PersistentAVLTree());

  const canvasRef = useRef(null);
  const intersections = new Set();

  const buildTree = (lines) => {
    if (lines.length === 0) {
      return;
    }

    const tree = new PersistentAVLTree();
    const dx = 1;

    const queue = new PriorityQueue();

    lines.forEach((line) => {
      queue.insert({
        eventType: EventType.START,
        line,
        val: line.x1,
        shouldInsert: true,
      });

      queue.insert({
        eventType: EventType.END,
        line,
        val: line.x2,
      });
    });

    for (let i = 0; i < window.innerWidth; i += dx) {
      if (queue.peek() === undefined || queue.peek().val > i) {
        tree.step();
        continue;
      }

      const evt = queue.extractMin();
      console.log(evt);

      if (evt.eventType === EventType.START) {
        let line, tempTree, x1, y1, x2, y2;

        if (evt.shouldInsert) {
          x1 = evt.line.x1;
          y1 = window.innerHeight - evt.line.y1;
          x2 = evt.line.x2;
          y2 = window.innerHeight - evt.line.y2;

          line = new Line(x1, y1, x2, y2);
          tempTree = tree.insert(line);
        } else {
          x1 = evt.line.startX;
          y1 = evt.line.startY;
          x2 = evt.line.endX;
          y2 = evt.line.endY;

          line = evt.line;
          tempTree = tree.current;
        }

        // Take care of crossing segments that follow this event
        const successor = tree.getSuccessor(line, tempTree);
        const predecessor = tree.getPredecessor(line, tempTree);

        const processIntersection = (cmp) => {
          const x3 = cmp.element.startX;
          const y3 = cmp.element.startY;
          const x4 = cmp.element.endX;
          const y4 = cmp.element.endY;

          // Checks if q is on line segment pr
          const onSegment = (p, q, r) =>
            q.x <= Math.max(p.x, r.x) &&
            q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) &&
            q.y >= Math.min(p.y, r.y);

          const intersectionX =
            ((x1 * y2 - y1 * x2) * (x3 - x4) -
              (x1 - x2) * (x3 * y4 - y3 * x4)) /
            ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
          const intersectionY =
            ((x1 * y2 - y1 * x2) * (y3 - y4) -
              (y1 - y2) * (x3 * y4 - y3 * x4)) /
            ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));

          if (
            !intersections.has(intersectionX.toString() + "," + intersectionY.toString()) &&
            intersectionX > i &&
            onSegment(
              { x: x1, y: y1 },
              { x: intersectionX, y: intersectionY },
              { x: x2, y: y2 }
            ) &&
            onSegment(
              { x: x3, y: y3 },
              { x: intersectionX, y: intersectionY },
              { x: x4, y: y4 }
            )
          ) {
            intersections.add(intersectionX.toString() + "," + intersectionY.toString())
            queue.insert({
              eventType: EventType.CROSS,
              line1: line,
              line2: cmp.element,
              intX: intersectionX,
              intY: intersectionY,
              val: intersectionX - 1,
            });
          }
        };

        if (successor !== null) processIntersection(successor);
        if (predecessor !== null) processIntersection(predecessor);
      } else if (evt.eventType === EventType.END) {
        console.log(tree.currVersionNum);
        const { x1, y1, x2, y2 } = evt.line;
        const line = new Line(
          x1,
          window.innerHeight - y1,
          x2,
          window.innerHeight - y2
        );
        tree.delete(line);
      } else if (evt.eventType === EventType.CROSS) {
        const tmp = copySubtree(tree.current);
        const node1 = tree._search(evt.line1, tmp).node;
        const node2 = tree._search(evt.line2, tmp).node;

        if (node1 === null || node2 === null) {
          // TODO: Show error message
          tree.step();
          continue;
        }

        tree.swap(node1, node2);
        tree.current = tmp;

        queue.insert({
          eventType: EventType.START,
          line: node1.element,
          val: Math.ceil(evt.intX),
          shouldInsert: false,
        });

        queue.insert({
          eventType: EventType.START,
          line: node2.element,
          val: Math.ceil(evt.intX),
          shouldInsert: false,
        });
      }

      tree.step();
    }

    return tree;
  };

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
    const elem = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
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

        canvasRef.current.appendChild(
          createCircleElement(e.clientX, e.clientY)
        );
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
        canvasRef.current.appendChild(
          createCircleElement(e.clientX, e.clientY)
        );
      }
    } else if (mode === Mode.SHOOTING_RAY) {
    }
  };

  const handleMouseMove = (e) => {
    if (mode !== Mode.SHOOTING_RAY || tree === undefined) {
      return;
    }

    if (document.getElementById("ray") !== null) {
      document.getElementById("ray").remove();
    }

    const elem = tree.shootVerticalRay(
      e.clientX,
      window.innerHeight - e.clientY
    );
    // console.log(elem);

    if (elem === null || elem.element === undefined) {
      return;
    }

    const { startX, startY, endX, endY } = elem.element;
    const topRayY =
      startY + ((endY - startY) / (endX - startX)) * (e.clientX - startX);

    canvasRef.current.appendChild(
      createLineElement(
        {
          x1: e.clientX,
          y1: e.clientY,
          x2: e.clientX,
          y2: window.innerHeight - topRayY,
        },
        "ray"
      )
    );
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

            setTree(buildTree(lines));
            setMode(Mode.SHOOTING_RAY);
          }}
        >
          <img src={rayIcon} alt="Shoot vertical ray" />
          <p>Shoot vertical ray</p>
        </button>
        <button
          onClick={() => {
            while (canvasRef.current.firstChild) {
              canvasRef.current.removeChild(canvasRef.current.firstChild);
            }

            // const lines = [
            //   { x1: 100, y1: 100, x2: 300, y2: 100 },
            //   { x1: 99, y1: 100, x2: 100, y2: 150 },
            //   { x1: 101, y1: 150, x2: 299, y2: 150 },
            //   { x1: 301, y1: 100, x2: 302, y2: 150 },

            // ];
            const lines = [{"x1":598,"y1":308,"x2":825,"y2":179},{"x1":539,"y1":202,"x2":794,"y2":322},{"x1":443,"y1":351,"x2":804,"y2":339},{"x1":664,"y1":337,"x2":873,"y2":242},{"x1":541,"y1":213,"x2":584,"y2":434},{"x1":388,"y1":418,"x2":634,"y2":188}];

            lines.forEach((line) => {
              canvasRef.current.appendChild(createLineElement(line));
              canvasRef.current.appendChild(
                createCircleElement(line.x1, line.y1)
              );
              canvasRef.current.appendChild(
                createCircleElement(line.x2, line.y2)
              );
            });

            setLines(lines);
            setTree(buildTree(lines));
            setMode(Mode.SHOOTING_RAY);
          }}
        >
          <img src={wrenchIcon} alt="Create user interface" />
          <p>Create user interface</p>
        </button>
        <button
          onClick={() => {
            var textarea = document.createElement("textarea");
            document.body.appendChild(textarea);
            textarea.value = JSON.stringify(lines);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
          }}
        >
          <img src={clipboardIcon} alt="Copy lines to clipboard" />
          <p>Copy lines to clipboard</p>
        </button>
      </div>
      <svg
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default App;
