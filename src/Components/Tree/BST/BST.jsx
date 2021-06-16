import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import BSTree from './BSTree';
import useDelError from '../hooks/useDelError';
import useTraversal from '../hooks/useTraversal';
import '../styles/BST.css';

const BST = (props) => {
	const [tree, setTree] = useState();
	const [treeHtml, setTreeHtml] = useState();
	const [delError, setDelError] = useDelError(treeHtml);
	const [searchError, setSearchError] = useDelError(treeHtml);
	const [traversalList, traversalDispatch] = useTraversal(tree);

	useEffect(() => {
		let tempTree = new BSTree();
		setTree(tempTree);
		return () => {
			setTree(null);
			setTreeHtml(null);
		};
	}, []);


	const insert = (val) => {
		val = parseInt(val);
		if (!val) return;
		let tempTree = tree;
		tempTree.insert(val);
		setTree(tempTree);
		setTreeHtml(tree.root.html);
		traversalDispatch('clear');
	};

	const remove = (val) => {
		val = parseInt(val);
		let tempTree = tree;
		setDelError(false);
		if (!tempTree.search(val)) {
			setDelError(true);
			return;
		}
		tempTree.remove(val);
		setTree(tempTree);
		if (tree.root) setTreeHtml(tree.root.html);
		else setTreeHtml(null);
		traversalDispatch('clear');
	};

	const search = (val) => {
		val = parseInt(val);
		let tempTree = tree;

		setSearchError(false);
		if (!tempTree.search(val)) {
			setSearchError(true);
			return;
		}

		tempTree.search(val);
		setTree(tempTree);
		if (tree.root) setTreeHtml(tree.root.html);
		else setTreeHtml(null);
	};

	const random = (num) => {
		num = parseInt(num);
		if (num < 0) return;
		let tempTree = new BSTree(num);
		setTree(tempTree);

		if (num) setTreeHtml(tempTree.root.html);
		else setTreeHtml(null);
		traversalDispatch('clear');
	};

	return (
		<div>
			<Navbar
				insert={insert}
				remove={remove}
				search={search}
				random={random}
				delError={delError ? 'error' : ''}
				seaError={searchError ? 'error' : ''}
			/>
			<div className='traversal'>
				{traversalList.list.length ? (
					<ul>
						{' '}
						{traversalList.op}:
						{traversalList.list.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				) : (
					<p>No Traversal Performed</p>
				)}
			</div>
			<div className='tree'>
				<ul>{treeHtml}</ul>
			</div>
			<div className='traversal-pannel'>
				<div>
					<button
						className='btn btn-outline-primary'
						onClick={() => traversalDispatch('inorder')}
					>
						Inorder
					</button>
				</div>
				<div>
					<button
						className='btn btn-outline-primary'
						onClick={() => traversalDispatch('preorder')}
					>
						Preorder
					</button>
				</div>
				<div>
					<button
						className='btn btn-outline-primary'
						onClick={() => traversalDispatch('postorder')}
					>
						Postorder
					</button>
				</div>
			</div>
		</div>
	);
};

export default BST;
