import logo from "./logo.svg";
import "./App.css";
import AVLTree from "./AVLTree";

function App() {
  const tree = new AVLTree();
  tree.insert(1);
  tree.insert(6);
  tree.insert(3);
  tree.insert(5);
  tree.insert(10);
  tree.insert(11);

  console.log(tree);
  // printTree(tree.root);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
