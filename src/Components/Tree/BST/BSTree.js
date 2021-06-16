export class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
		this.parent = null;
		this.htmlLeft = (
			<li className='null'>
				<div>null</div>
			</li>
		);

		this.htmlRight = (
			<li className='null'>
				<div className='null'>null</div>
			</li>
		);

		this.html = (
			<li key={this.value}>
				<div className='normal'>{this.value}</div>
				<ul>
					{this.htmlLeft} {this.htmlRight}
				</ul>
			</li>
		);
	}

	//Inserts a node
	insert(node, isLeft) {
		const newHtml = node.html;

		if (isLeft) {
			this.htmlLeft = newHtml;
		} else {
			this.htmlRight = newHtml;
		}
		this.setHtml();
		this.updateRootHtml();
	}

	//Updates HTML for the node
	setHtml() {
		this.html = (
			<li>
				<div className='normal'>{this.value}</div>
				<ul>
					{this.htmlLeft} {this.htmlRight}
				</ul>
			</li>
		);
	}

	//Updates the whole HTML
	updateRootHtml() {
		if (this.parent !== null) {
			if (this.parent.left === this) this.parent.insert(this, true);
			else this.parent.insert(this, false);
		}
	}

	//Sets one child to null
	setChildToNull(isLeft) {
		if (isLeft) {
			this.htmlLeft = (
				<li className='null'>
					<div>null</div>
				</li>
			);
		} else {
			this.htmlRight = (
				<li className='null'>
					<div>null</div>
				</li>
			);
		}
		this.setHtml();
		this.updateRootHtml();
	}

	//Sets grandchild to child
	setChildToChildsChild(isLeftChild, isLeft) {
		if (isLeftChild) {
			if (isLeft) {
				this.htmlLeft = this.left.left.html;
				this.setHtml();
			} else {
				this.htmlLeft = this.left.right.html;
				this.setHtml();
			}
		} else {
			if (isLeft) {
				this.htmlRight = this.right.left.html;
				this.setHtml();
			} else {
				this.htmlRight = this.right.right.html;

				this.setHtml();
			}
		}
		this.updateRootHtml();
	}

	//Removes a node
	remove(childrenCondition) {
		if (!this.parent) return;
		if (!childrenCondition) {
			if (this.parent.left === this) {
				this.parent.setChildToNull(true);
			} else {
				this.parent.setChildToNull(false);
			}
		} else if (childrenCondition === 'left') {
			if (this.parent.left === this) {
				this.parent.setChildToChildsChild(true, true);
			} else {
				this.parent.setChildToChildsChild(false, true);
			}
		} else {
			if (this.parent.left === this) {
				this.parent.setChildToChildsChild(true, false);
			} else {
				this.parent.setChildToChildsChild(false, false);
			}
		}
	}

	// Update value of a node
	updateValue(value) {
		this.value = value;
		this.setHtml();
		this.updateRootHtml();
	}

	// Highlight searched node
	addHighlight() {
		this.html = (
			<li key={this.value}>
				<div className='normal highlight'>{this.value}</div>
				<ul>
					{this.htmlLeft} {this.htmlRight}
				</ul>
			</li>
		);
		this.updateRootHtml();
	}

	// Removes a highlighted Node
	clearHighlight() {
		this.setHtml();
		this.updateRootHtml();
	}

	//Changes the html when tree is balanced
	balanceHtml() {
		if (!this.left && this.right) {
			this.htmlRight = this.right.html;
			this.setChildToNull(true);
		} else if (!this.right && this.left) {
			this.htmlLeft = this.left.html;
			this.setChildToNull(false);
		} else if (this.right && this.left) {
			this.htmlLeft = this.left.html;
			this.htmlRight = this.right.html;
			this.setHtml();
			this.updateRootHtml();
		} else {
			this.htmlLeft = (
				<li className='null'>
					<div>null</div>
				</li>
			);

			this.htmlRight = (
				<li className='null'>
					<div className='null'>null</div>
				</li>
			);
			this.setHtml();
			this.updateRootHtml();
		}
	}
}

class BSTree {
	constructor(num = 0) {
		this.root = null;
		if (num) {
			this.generateRandomBST(num);
		}
		this.highlighted = null;
		this.leafDepth = -1;
	}

	// inserting a node in the bst
	insert(value) {
		this.clearHighlight();
		let newNode = new Node(value);
		if (this.root === null) {
			this.root = newNode;
		} else this.insertNode(this.root, newNode);
	}

	insertNode(node, newNode) {
		if (newNode.value < node.value) {
			if (node.left === null) {
				node.left = newNode;
				newNode.parent = node;
				node.insert(newNode, true);
			} else this.insertNode(node.left, newNode);
		} else if (newNode.value > node.value) {
			if (node.right === null) {
				node.right = newNode;
				newNode.parent = node;
				node.insert(newNode, false);
			} else this.insertNode(node.right, newNode);
		} else {
			return;
		}
	}

	//Finding max value
	findMax(node = this.root) {
		if (node == null) return node;
		else if (node.right == null) {
			return node;
		} else {
			return this.findMax(node.right);
		}
	}

	//Finding min value
	findMin(node = this.root) {
		if (node == null) return node;
		else if (node.left == null) {
			return node;
		} else {
			return this.findMin(node.left);
		}
	}

	//Deleting node
	remove(value) {
		this.clearHighlight();
		this.root = this.removeNode(this.root, value);
	}

	removeNode(node, value) {
		if (node === null) return null;
		else if (value < node.value) {
			node.left = this.removeNode(node.left, value);
			return node;
		} else if (value > node.value) {
			node.right = this.removeNode(node.right, value);
			return node;
		} else {
			if (node.left === null && node.right === null) {
				node.remove(null);
				node = null;
				return node;
			}
			if (node.left === null) {
				node.remove('right');
				node.right.parent = node.parent;
				node = node.right;
				return node;
			} else if (node.right === null) {
				node.remove('left');
				node.left.parent = node.parent;
				node = node.left;
				return node;
			}
			var minNodeOfRight = this.findMin(node.right);
			node.updateValue(minNodeOfRight.value);

			node.right = this.removeNode(node.right, minNodeOfRight.value);
			return node;
		}
	}

	//Find height
	height(node = this.root) {
		if (node === null) return -1;
		let ans;
		ans = this.height(node.left);
		ans = Math.max(this.height(node.right), ans);
		return ans + 1;
	}

	//Count number of nodes
	countNodes(node = this.root) {
		if (node === null) return 0;
		return this.countNodes(node.left) + 1 + this.countNodes(node.right);
	}

	//BST traversal
	preorder(list, node = this.root) {
		if (node !== null) {
			list.push(node.value);
			this.preorder(list, node.left);
			this.preorder(list, node.right);
		}
	}

	inorder(list, node = this.root) {
		if (node !== null) {
			this.inorder(list, node.left);
			list.push(node.value);
			this.inorder(list, node.right);
		}
	}

	postorder(list, node = this.root) {
		if (node !== null) {
			this.postorder(list, node.left);
			this.postorder(list, node.right);
			list.push(node.value);
		}
	}

	//Search
	search(value, node = this.root) {
		this.clearHighlight();

		if (node === null) return false;
		else if (node.value === value) {
			node.addHighlight();
			this.highlighted = node;
			return true;
		} else if (node.value > value) return this.search(value, node.left);
		else return this.search(value, node.right);
	}

	//Random Tree generator
	generateRandomBST(num) {
		let upper = 0;
		let lower = num * 2 + 10;
		let elements = new Set();
		for (let i = 0; i < num; i++) {
			let value = Math.floor(Math.random() * (upper - lower + 1)) + lower;
			while (elements.has(value)) {
				value = Math.floor(Math.random() * (upper - lower + 1)) + lower;
			}
			elements.add(value);
			this.insert(value);
		}
	}

	clearHighlight() {
		if (this.highlighted) {
			this.highlighted.clearHighlight();
			this.highlighted = null;
		}
	}
}

export default BSTree;
