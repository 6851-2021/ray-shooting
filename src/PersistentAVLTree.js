function getHeight(node) {
  if (node === null) {
    return 0;
  }
  return node.height;
}

function getBalance(node) {
  if (node === null) {
    return 0;
  }

  return getHeight(node.right) - getHeight(node.left);
}

export class Line {
  startX;
  startY;
  endX;
  endY;
  action;

  constructor(startX, startY, endX, endY, action) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.action = action;
  }
}

function Node(element) {
  this.element = element;
  this.height = 1;
  this.left = null;
  this.right = null;
  this.id = Math.random();
}

function isEqual(a, b) {
  if (a == null || b == null) {
    return a === b;
  }
  return (
    a.element.startX === b.element.startX &&
    a.element.startY === b.element.startY &&
    a.element.endX === b.element.endX &&
    a.element.endY === b.element.endY
  );
}

function updateHeight(node) {
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}

function copyNode(node) {
  const newNode = new Node(node.element);
  newNode.left = node.left;
  newNode.right = node.right;
  newNode.height = node.height;
  newNode.og = node;
  //console.log("copying: ", node, newNode);
  return newNode;
}

export function copySubtree(node, path = new Set()) {
  // console.log("about to copy: ", node, path);
  if (node == null) {
    return null;
  }
  if (path.has(node.id)) {
    console.log("cycle detected!");
    console.log(path);
    return null;
  }
  //console.log("copyign subtree", node.element);
  const newNode = copyNode(node);
  newNode.left = copySubtree(node.left, new Set([...path, node.id]));
  newNode.right = copySubtree(node.right, new Set([...path, node.id]));
  return newNode;
}

export class PersistentAVLTree {
  constructor(comparisonFunc) {
    if (typeof comparisonFunc === "function") {
      this._compare = comparisonFunc;
    } else {
      this._compare = this.sortLeftToRight;
    }
    this.current = null;
    this.versions = [];
    this.currVersionNum = 0;
  }

  // make a different compare functino for comparing points
  sortLeftToRight(a, b) {
    let x;
    if (a.endX === undefined && a.endY === undefined) {
      x = a.startX;
    } else {
      if (
        this.currVersionNum < a.startX ||
        this.currVersionNum > a.endX ||
        this.currVersionNum < b.startX ||
        this.currVersionNum > b.endX
      ) {
        console.log("OUT OF RANGE FUCK", this.currVersionNum, a, b);
        throw new Error("Point not in range of line!");
      }
      x = this.currVersionNum;
    }

    const aCurrY =
      a.endX === undefined && a.endY === undefined
        ? a.startY
        : a.startY +
          ((a.endY - a.startY) / (a.endX - a.startX)) * (x - a.startX);
    const bCurrY =
      b.startY + ((b.endY - b.startY) / (b.endX - b.startX)) * (x - b.startX);

    // console.log(x, aCurrY, bCurrY);
    if (aCurrY < bCurrY) {
      return -1;
    } else if (aCurrY > bCurrY) {
      return 1;
    }
    return 0;
  }

  step() {
    this.versions.push(this.current);
    this.currVersionNum += 1;
    // console.log(this.current);
  }

  getVersion(version) {
    return version < this.versions.length ? this.versions[version] : null;
  }

  getSuccessor(element, tree) {
    // console.log("GET SUCCESSOR: ", this.currVersionNum, copySubtree( element), tree);
    const { node, path } = this._search(element, tree);
    // console.log(node, path);
    if (node === null || node === undefined) {
      return null;
    }
    if (node.right) {
      return this.getMin(node.right);
    } else {
      for (let i = path.length - 2; i >= 0; i--) {
        if (path[i].left === path[i + 1]) {
          return path[i];
        }
      }
    }
    return null;
  }

  getPredecessor(element, tree) {
    const { node, path } = this._search(element, tree);
    // console.log(node, path);
    if (node === null || node === undefined) {
      return null;
    }
    if (node.left) {
      return this.getMax(node.left);
    } else {
      for (let i = path.length - 2; i >= 0; i--) {
        if (path[i].right === path[i + 1]) {
          return path[i];
        }
      }
    }
    return null;
  }

  shootVerticalRay(version, element) {
    element = new Line(version, element);
    // console.log("element:", element);
    const versionTree = this.getVersion(version);
    if (versionTree === null) {
      return null;
    }
    // console.log(versionTree);
    const tempTree = this._insert(element, versionTree);
    // console.log(versionTree, element, tempTree);
    const successor = this.getSuccessor(element, tempTree);
    // console.log("SUCCESSOR: ", successor);
    return successor !== null ? successor : true;
  }

  swap(node1, node2) {
    const tmp = node1.element;
    node1.element = node2.element;
    node2.element = tmp;
  }
}

// TODO: put data on the node.
PersistentAVLTree.prototype.search = function (element) {
  console.log("SEARCH: ", this.currVersionNum, element);
  var { node } = this._search(element, this.current);
  return node ? node.element : null;
};

PersistentAVLTree.prototype._search = function (element, node, path = []) {
  // console.log("_SEARCH: ", this.currVersionNum, copySubtree( element), node, path);
  if (node === null) {
    return { node, path };
  }

  path.push(node);
  var direction = this._compare(element, node.element);
  if (direction < 0) {
    return this._search(element, node.left, path);
  } else if (direction > 0) {
    return this._search(element, node.right, path);
  }
  return { node, path };
};

PersistentAVLTree.prototype.insert = function (element) {
  console.log("inserting ", this.currVersionNum);
  console.log("before", this.currVersionNum, copySubtree(this.current));
  this.current = this._insert(element, this.current);
  console.log("after", this.currVersionNum, copySubtree(this.current));
  return this.current;
};

PersistentAVLTree.prototype._insert = function (element, node) {
  // if (!(element instanceof Line)) {
  //   console.log("not line:", element);
  //   element = new Line(element);
  // }
  // console.log("Inserting: ", this.currVersionNum, copySubtree( element));
  if (node === null) {
    const newNode = new Node(element);
    return newNode;
  }
  node = copyNode(node);

  // just copy here, propagate to children
  var direction = this._compare(element, node.element);
  // console.log("comapare", element, copySubtree( node).element, direction);
  if (direction < 0) {
    node.left = this._insert(element, node.left);
  } else if (direction > 0) {
    node.right = this._insert(element, node.right);
  }
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;

  var balance = getBalance(node);

  if (balance < -1) {
    var subLeftDirection = this._compare(element, node.left.element);
    if (subLeftDirection < 0) {
      return copySubtree(this._rightRotate(node));
    } else if (subLeftDirection > 0) {
      node.left = this._leftRotate(node.left);
      return copySubtree(this._rightRotate(node));
    }
  } else if (balance > 1) {
    var subRightDirection = this._compare(element, node.right.element);
    if (subRightDirection > 0) {
      return copySubtree(this._leftRotate(node));
    } else if (subRightDirection < 0) {
      node.right = this._rightRotate(node.right);
      return copySubtree(this._leftRotate(node));
    }
  }
  return node;
};

PersistentAVLTree.prototype._rightRotate = function (node) {
  // console.log("RIGHT ROTATE");
  var l = node.left;
  var lr = l.right;
  l.right = node;
  node.left = lr;
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  l.height = Math.max(getHeight(l.left), getHeight(l.right)) + 1;
  return l;
};

PersistentAVLTree.prototype._leftRotate = function (node) {
  // console.log("LEFT ROTATE");
  var r = node.right;
  var rl = r.left;
  r.left = node;
  node.right = rl;
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  r.height = Math.max(getHeight(r.left), getHeight(r.right)) + 1;
  return r;
};

PersistentAVLTree.prototype.delete = function (element) {
  console.log(
    "deleting ",
    this.currVersionNum,
    element,
    copySubtree(this.current)
  );
  if (this.current !== null) {
    this.current = this._delete(element, this.current, null);
    console.log("AFTER DELETE: ", copySubtree(this.current));
  }
};

PersistentAVLTree.prototype._delete = function (element, node, parent) {
  console.log(
    "DELETE: ",
    this.currVersionNum,
    element,
    copySubtree(node),
    copySubtree(parent)
  );
  if (node === null) {
    return null;
  }
  const oldNode = node;
  node = copyNode(node);
  // console.log("copyNode: ", node);
  var direction = this._compare(element, node.element);
  if (direction < 0) {
    // go left
    console.log("delete go left");
    if (node.left && this._compare(element, node.left.element) === 0) {
      this._delete(element, node.left, node);
    } else {
      node.left = this._delete(element, node.left, node);
      updateHeight(node);
      console.log("updated left node");
    }
  } else if (direction > 0) {
    // go right
    console.log("delete go right");
    if (node.right && this._compare(element, node.right.element) === 0) {
      this._delete(element, node.right, node);
    } else {
      node.right = this._delete(element, node.right, node);
      updateHeight(node);
      console.log("updated right node");
    }
  } else if (node.left !== null && node.right !== null) {
    // found our target element
    var detachedMax = this._deleteMax(node.left, node);
    node.element = detachedMax.element; // TODO: if we end up adding data to nodes, copy it here
    node.height = Math.max(node.right.height, detachedMax.height) + 1;
    if (parent !== null) {
      if (parent.right === oldNode) {
        parent.right = node;
      } else {
        parent.left = node;
      }
    }
  } else if (node.left === null) {
    if (node.right === null) {
      //console.log("both children empty", copySubtree(node), copySubtree( parent));
      // both children are empty
      if (parent === null) {
        return null;
      }
      if (parent.right === oldNode) {
        //console.log("setting right to null");
        parent.right = null;
        //console.log(parent);
      } else {
        //console.log("setting left to null");
        parent.left = null;
      }
      updateHeight(parent);
    } else {
      // only has right
      if (parent === null) {
        return node.right;
      }
      if (parent.right === oldNode) {
        parent.right = node.right;
      } else {
        parent.left = node.right;
      }

      node.right = null;
      updateHeight(parent);
    }
  } else {
    // only has left
    if (parent === null) {
      return node.left;
    }
    if (parent.right === oldNode) {
      parent.right = node.left;
    } else {
      parent.left = node.left;
    }

    node.left = null;
    updateHeight(parent);
  }
  // console.log("_balance", copySubtree(node), copySubtree( parent));
  return this._balance(node, parent); // backtrack and balance everyone
};

PersistentAVLTree.prototype.deleteMax = function () {
  return this._deleteMax(this.current, null).element;
};

PersistentAVLTree.prototype._deleteMax = function (node, parent) {
  console.log("DELETE_MAX:");
  var max;
  if (node.right === null) {
    // max found
    max = this._delete(node.element, node, parent);
    this._balance(node, parent);
    console.log("MAX: ", max);
    return max;
  } // not yet at max, keep going
  max = this._deleteMax(node.right, node);
  this._balance(node, parent); // backtrack and balance everyone in the left sub tree
  return max;
};

PersistentAVLTree.prototype.getMin = function (node) {
  if (node.left === null) {
    return node;
  }
  return this.getMin(node.left);
};

PersistentAVLTree.prototype.getMax = function (node) {
  if (node.right === null) {
    return node;
  }
  return this.getMax(node.right);
};

PersistentAVLTree.prototype._balance = function (node, parent) {
  console.log(
    "Balance: ",
    this.currVersionNum,
    copySubtree(node),
    copySubtree(parent)
  );
  node = copySubtree(node);
  console.log("node copy: ", node);
  updateHeight(node);
  var balance = getBalance(node);
  var newRoot, x, y, z;
  if (balance < -1) {
    node = copySubtree(node);
    console.log("balance < -1");
    z = node;
    y = node.left;
    x = this._getTallestSubtree(y);
    newRoot = this._triNodeRestructure(x, y, z, parent);
    updateHeight(z);
    updateHeight(x);
    updateHeight(y);

    updateHeight(z);
    updateHeight(x);
    updateHeight(y);
    return newRoot;
  } else if (balance > 1) {
    node = copySubtree(node);
    console.log("balance > 1");
    z = node;
    y = node.right;
    x = this._getTallestSubtree(y);
    newRoot = this._triNodeRestructure(x, y, z, parent);
    updateHeight(z);
    updateHeight(x);
    updateHeight(y);

    updateHeight(z);
    updateHeight(x);
    updateHeight(y);
    return newRoot;
  } else {
    console.log("no balance needed");
  }
  updateHeight(node);
  console.log("after balance: ", node);
  return node;
};

PersistentAVLTree.prototype._getTallestSubtree = function (node) {
  var balance = getBalance(node);
  if (balance < 0) {
    return node.left;
  }
  return node.right;
};

PersistentAVLTree.prototype._triNodeRestructure = function (x, y, z, parent) {
  console.log(
    "TRINODE: ",
    this.currVersionNum,
    copySubtree(x),
    copySubtree(y),
    copySubtree(z),
    parent,
    this.current
  );
  var a, b, c;
  if (z.right === y && y.left === x) {
    a = z;
    b = x;
    c = y;
  }
  if (z.right === y && y.right === x) {
    a = z;
    b = y;
    c = x;
  }
  if (z.left === y && y.left === x) {
    a = x;
    b = y;
    c = z;
  }
  if (z.left === y && y.right === x) {
    a = y;
    b = x;
    c = z;
  }
  if (
    z.og === this.current ||
    isEqual(z, this.current) ||
    z === this.current ||
    z.element === this.current.element || // TODO: THIS IS JANK
    parent === null
  ) {
    this.current = b;
  } else if (isEqual(parent.left, z)) {
    parent.left = b;
  } else {
    parent.right = b;
  }
  if (!isEqual(b.left, x) && !isEqual(b.left, y) && !isEqual(b.left, z)) {
    console.log("a.right := b.left");
    a.right = b.left;
  }
  console.log(b.right, x, y, z);
  if (!isEqual(b.right, x) && !isEqual(b.right, y) && !isEqual(b.right, z)) {
    console.log("c.left := b.right");
    c.left = b.right;
  }
  b.left = a;
  b.right = c;
  console.log("After Trinode: ", b);
  return b;
};
