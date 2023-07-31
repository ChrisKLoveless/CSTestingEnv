export default class BST {
  constructor() {
    this.root = null;
    this.leftHeight = 0;
    this.rightHeight = 0;
  }

  // Helper method to compute the height of a subtree recursively
  getHeight(node) {
    if (node === null) {
      return 0;
    }

    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);
    // Store the height of left and right subtrees in their respective properties
    this.leftHeight = Math.max(this.leftHeight, leftHeight);
    this.rightHeight = Math.max(this.rightHeight, rightHeight);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Method to check if the BST is balanced
  isBalanced() {
    // Compute the height of the left and right subtrees, starting from the root
    this.getHeight(this.root);

    // Check if the difference in heights is at most 1
    return Math.abs(this.leftHeight - this.rightHeight) <= 1;
  }

  balanceCheck() {
    return this.leftHeight - this.rightHeight;
  }

  leftRotate() {
    const newRoot = node.right;
    node.right = newRoot.left;
    newRoot.left = node;
    return newRoot;
  }

  rightRotate() {
    const newRoot = node.left;
    node.left = newRoot.right;
    newRoot.right = node;
    return newRoot;
  }

  rebalance() {
    const balanceFactor = this.check();
    // Left-Heavy Tree
    if (balanceFactor > 1) {
      if (this.root.left.check() < 0) {
        this.root.left = this.leftRotate(this.root.left);
      }
      this.root = this.rightRotate(this.root);
    }
    // Right-Heavy Tree
    else if (balanceFactor < -1) {
      if (this.root.right.check() > 0) {
        this.root.right = this.rightRotate(this.root.right);
      }
      this.root = this.leftRotate(this.root);
    }
  }

  search(value) {
    if (this.root.data === value) {
      return true;
    } else {
      let currentNode = this.root;

      while (true) {
        if (currentNode.data === value) {
          return true;
        } else if (currentNode.data > value) {
          currentNode = currentNode.left;
        } else if (currentNode.data < value) {
          currentNode = currentNode.right;
        }
        if (currentNode === null) {
          return false;
        }
      }
    }
  }

  remove(value) {
    if (this.root === null) {
      return false;
    }

    let currentNode = this.root;
    let parentNode = null;
    let found = false;

    while (currentNode) {
      if (value === currentNode.data) {
        found = true;
        break;
      } else if (value < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else {
        parentNode = currentNode;
        currentNode = currentNode.right;
      }
    }

    if (!found) {
      return false;
    }

    if (currentNode.left && currentNode.right) {
      // Find the in-order successor (the smallest node in the right subtree)
      let successor = currentNode.right;
      let successorParent = currentNode;

      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      // Replace the node to be removed with the in-order successor
      currentNode.data = successor.data;

      // Remove the in-order successor (it has at most one right child)
      if (successorParent === currentNode) {
        // The in-order successor is the right child of the node to be removed
        successorParent.right = successor.right;
      } else {
        // The in-order successor is a left child
        successorParent.left = successor.right;
      }
    } else {
      // Node to be removed has one or no child (similar to previous cases)
      const childNode = currentNode.left || currentNode.right;

      if (parentNode === null) {
        // The node to be removed is the root
        this.root = childNode;
      } else {
        // Update parent's left or right reference to the child node
        if (currentNode.data < parentNode.data) {
          parentNode.left = childNode;
        } else {
          parentNode.right = childNode;
        }
      }
    }

    return true;
  }

  insertNode(insertedNode) {
    if (this.root === null) {
      this.root = insertedNode;
    } else {
      let currentNode = this.root;
      let tempHeight = 0;

      while (true) {
        tempHeight++;
        ///code to place nodes to the left of BST
        if (currentNode.data > insertedNode.data) {
          if (currentNode.left === null) {
            currentNode.left = insertedNode;
            this.leftHeight = Math.max(this.leftHeight, tempHeight);
            return this;
          } else {
            currentNode = currentNode.left;
          }
          ///code to place nodes to the right of BST
        } else if (currentNode.data < insertedNode.data) {
          if (currentNode.right === null) {
            currentNode.right = insertedNode;
            this.rightHeight = Math.max(this.rightHeight, tempHeight);
            return this;
          } else {
            currentNode = currentNode.right;
          }
        } else {
          return this;
        }
      }
    }
  }
}
