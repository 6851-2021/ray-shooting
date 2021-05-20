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
  return newNode;
}

export function copySubtree(node, path = new Set()) {
  if (node == null) {
    return null;
  }
  if (path.has(node.id)) {
    return null;
  }
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
  }

  getVersion(version) {
    return version < this.versions.length ? this.versions[version] : null;
  }

  getSuccessor(element, tree = this.current) {
    const { node, path } = this._search(element, tree);
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

  getPredecessor(element, tree = this.current) {
    const { node, path } = this._search(element, tree);
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
    const versionTree = this.getVersion(version);
    if (versionTree === null) {
      return null;
    }
    const tempTree = this._insert(element, versionTree);
    const successor = this.getSuccessor(element, tempTree);
    return successor !== null ? successor : true;
  }

  swap(node1, node2) {
    const tmp = node1.element;
    node1.element = node2.element;
    node2.element = tmp;
  }
}

// TODO: put data on the node.
PersistentAVLTree.prototype.search = function (element, tree = this.current) {
  return this._search(element, tree);
};

PersistentAVLTree.prototype._search = function (element, node, path = []) {
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
  this.current = this._insert(element, this.current);
  return this.current;
};

PersistentAVLTree.prototype._insert = function (element, node) {
  if (node === null) {
    const newNode = new Node(element);
    return newNode;
  }
  node = copyNode(node);

  // just copy here, propagate to children
  var direction = this._compare(element, node.element);
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
  var l = node.left;
  var lr = l.right;
  l.right = node;
  node.left = lr;
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  l.height = Math.max(getHeight(l.left), getHeight(l.right)) + 1;
  return l;
};

PersistentAVLTree.prototype._leftRotate = function (node) {
  var r = node.right;
  var rl = r.left;
  r.left = node;
  node.right = rl;
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  r.height = Math.max(getHeight(r.left), getHeight(r.right)) + 1;
  return r;
};

PersistentAVLTree.prototype.delete = function (element) {
  if (this.current === null) return;
  this.current = this._delete(element, this.current, null);
};

PersistentAVLTree.prototype._delete = function (element, node, parent) {
  if (node === null) {
    return null;
  }
  const oldNode = node;
  node = copyNode(node);
  var direction = this._compare(element, node.element);
  if (direction < 0) {
    // go left
    if (node.left && this._compare(element, node.left.element) === 0) {
      this._delete(element, node.left, node);
    } else {
      node.left = this._delete(element, node.left, node);
      updateHeight(node);
    }
  } else if (direction > 0) {
    // go right
    if (node.right && this._compare(element, node.right.element) === 0) {
      this._delete(element, node.right, node);
    } else {
      node.right = this._delete(element, node.right, node);
      updateHeight(node);
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
      // both children are empty
      if (parent === null) {
        return null;
      }
      if (parent.right === oldNode) {
        parent.right = null;
      } else {
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
  return this._balance(node, parent); // backtrack and balance everyone
};

PersistentAVLTree.prototype.deleteMax = function () {
  return this._deleteMax(this.current, null).element;
};

PersistentAVLTree.prototype._deleteMax = function (node, parent) {
  var max;
  if (node.right === null) {
    // max found
    max = this._delete(node.element, node, parent);
    this._balance(node, parent);
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
  node = copySubtree(node);
  updateHeight(node);
  var balance = getBalance(node);
  var newRoot, x, y, z;
  if (balance < -1) {
    node = copySubtree(node);
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
  }
  updateHeight(node);
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
    a.right = b.left;
  }
  if (!isEqual(b.right, x) && !isEqual(b.right, y) && !isEqual(b.right, z)) {
    c.left = b.right;
  }
  b.left = a;
  b.right = c;
  return b;
};
