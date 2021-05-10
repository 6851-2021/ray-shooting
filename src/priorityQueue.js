export default class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  leftChild = (index) => index * 2 + 1;
  rightChild = (index) => index * 2 + 2;
  parent = (index) => Math.floor((index - 1) / 2);
  peek = () => this.heap[0];

  swap = (indexOne, indexTwo) => {
    const tmp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = tmp;
  }

  insert = (element) => {
    this.heap.push(element);
    let idx = this.heap.length - 1;

    while (idx !== 0 && this.heap[idx].val < this.heap[this.parent(idx)].val) {
      this.swap(idx, this.parent(idx));
      idx = this.parent(idx);
    }
  }

  extractMin = () => {
    const root = this.heap.shift();

    this.heap.unshift(this.heap[this.heap.length - 1]);
    this.heap.pop();

    this.heapify(0);
    return root;
  }
  
  heapify = (index) => {
    let left = this.leftChild(index);
    let right = this.rightChild(index);
    let largest = index;

    if (left < this.heap.length && this.heap[largest].val > this.heap[left].val) {
      largest = left;
    }

    if (right < this.heap.length && this.heap[largest].val > this.heap[right].val) {
      largest = right;
    }

    if (largest !== index) {
      this.swap(largest, index);
      this.heapify(largest);
    }
  }
};