import React from 'react';
import Tooltip from './Tooltip';
import { Link } from 'react-router-dom';

import './About.css';

const About = () => {
	const scrollPrevious = (val) => {
		switch (val) {
			case 0:
				window.scrollTo(0, 1350);
				break;
			case 1:
				window.scrollTo(0, 2500);
				break;
			case 2:
				window.scrollTo(0, 3650);
				break;
			case 3:
				window.scrollTo(0, 4800);
				break;
			case 4:
				window.scrollTo(0, 5950);
				break;
			case 5:
				window.scrollTo(0, 7100);
				break;
			case 6:
				window.scrollTo(0, 8250);
				break;
			default:
				break;
		}
	};

	const scrollNext = (val) => {
		switch (val) {
			case 1:
				window.scrollTo(0, 2500);
				break;
			case 2:
				window.scrollTo(0, 3650);
				break;
			case 3:
				window.scrollTo(0, 4800);
				break;
			case 4:
				window.scrollTo(0, 5950);
				break;
			case 5:
				window.scrollTo(0, 7100);
				break;
			case 6:
				window.scrollTo(0, 8250);
				break;
			case 7:
				window.scrollTo(0, 9400);
				break;
			default:
				break;
		}
	};

	return (
		<>
			<div className='section'>
				<div className='top-border'></div>
				<Link style={{ textDecoration: 'none' }} to={'/'}>
					<span className='back'> {'◀'} </span>
				</Link>
				<div className='fixed'>
					<h1 className='large'>About This Website</h1>
					<p className='about-content'>
						The human brain can easily process visuals instead of long codes to
						understand the algorithms. This website allows you to do just that.
						<div style={{ textAlign: 'center' }}>Learn More!</div>
					</p>
					<p className='scroll-message'>⇣ Start Scrolling</p>
				</div>
			</div>
			<div className='section'>
				<div className='fixed'>
					<h1 className='large'>Sorting Visualizer</h1>
					<p className='about-content'>
						<span className='highlight'>Sorting</span> is a very classic problem
						of reordering items (that can be compared, e.g. integers,
						floating-point numbers, strings, etc) of an
						<span className='highlight'> Array</span> (or a list) in a certain{' '}
						<span className='highlight'>Order</span> (increasing,
						non-decreasing, decreasing, non-increasing, lexicographical, etc).
						There are many different{' '}
						<Tooltip word={'Sorting Algorithm'} info={0} /> each has its own
						advantages and limitations.
					</p>
				</div>
				<button className='next' onClick={(e) => scrollNext(1)}>
					{'Next >>'}
				</button>
			</div>
			<div className='section'>
				<div className='fixed'>
					<h1 className='large'>Scheduling Visualizer</h1>
					<p className='about-content'>
						Process Scheduling is an OS task that schedules processes of
						different states like ready, waiting, and running. Process
						scheduling allows OS to allocate a time interval of CPU execution
						for each process. Another important reason for using a process
						scheduling system is that it keeps the CPU busy all the time. This
						allows you to get the minimum response time for programs.
					</p>
				</div>
				<button className='previous' onClick={(e) => scrollPrevious(0)}>
					{'<< Previous'}
				</button>
				<button className='next' onClick={(e) => scrollNext(2)}>
					{'Next >>'}
				</button>
			</div>
			<div className='section'>
				<div className='fixed'>
					<h1 className='large'>Graph Traversal Visualizer</h1>
					<p className='about-content'>
						In computer science, <Tooltip word={'graph traversal'} info={2} />{' '}
						(also known as graph search) refers to the process of visiting
						(checking and/or updating) each vertex in a graph. Such traversals
						are classified by the order in which the vertices are visited. Tree
						traversal is a special case of graph traversal.
					</p>
				</div>
				<button className='previous' onClick={(e) => scrollPrevious(1)}>
					{'<< Previous'}
				</button>
				<button className='next' onClick={(e) => scrollNext(3)}>
					{'Next >>'}
				</button>
			</div>
			<div className='section'>
				<div className='fixed'>
					<h1 className='large'>N Queens Visualizer</h1>
					<p className='about-content'>
						The idea is to place queens one by one in different columns,
						starting from the leftmost column. When we place a queen in a
						column, we check for clashes with already placed queens. In the
						current column, if we find a row for which there is no clash, we
						mark this row and column as part of the solution. If we do not find
						such a row due to clashes then we backtrack and return false.
					</p>
				</div>
				<button className='previous' onClick={(e) => scrollPrevious(2)}>
					{'<< Previous'}
				</button>
				<button className='next' onClick={(e) => scrollNext(4)}>
					{'Next >>'}
				</button>
			</div>
			<div className='section'>
				<div className='fixed'>
					<h1 className='large'>Searching Visualizer</h1>
					<p className='about-content'>
						Searching Algorithms are designed to check for an element or
						retrieve an element from any data structure where it is stored.
						These type of algorithms are used to find elements from a specific
						data structures.The appropriate search algorithm often depends on
						the data structure being searched
					</p>
				</div>
				<button className='previous' onClick={(e) => scrollPrevious(3)}>
					{'<< Previous'}
				</button>
				<button className='next' onClick={(e) => scrollNext(5)}>
					{'Next >>'}
				</button>
			</div>
			<div className='section'>
				<div className='fixed'>
					<h1 className='large'>Tree Visualizer</h1>
					<p className='about-content'>
						n computer science, a binary search tree (BST), also called an
						ordered or sorted binary tree, is a rooted binary tree whose
						internal nodes each store a key greater than all the keys in the
						node's left subtree and less than those in its right subtree. A
						binary tree is a type of data structure for storing data such as
						numbers in an organized way.
					</p>
				</div>
				<button className='previous' onClick={(e) => scrollPrevious(4)}>
					{'<< Previous'}
				</button>
				<button className='next' onClick={(e) => scrollNext(6)}>
					{'Next >>'}
				</button>
			</div>
			<div className='section'>
				<div className='fixed'>
					<h1 className='large'>Stack Visualizer</h1>
					<p className='about-content'>
						In computer science, a stack is an abstract data type that serves as
						a collection of elements, with two main principal operations (Push,
						Pop).The order in which elements come off a stack gives rise to its
						alternative name, LIFO (last in, first out). Additionally, a peek
						operation may give access to the top without modifying the stack.
					</p>
				</div>
				<button className='previous' onClick={(e) => scrollPrevious(5)}>
					{'<< Previous'}
				</button>
				<button className='next' onClick={(e) => scrollNext(7)}>
					{'Next >>'}
				</button>
			</div>
			<div className='section'>
				<div className='fixed'>
					<h1 className='large'>Queue Visualizer</h1>
					<p className='about-content'>
						In computer science, a queue is a collection of entities that are
						maintained in a sequence and can be modified by the addition of
						entities at one end of the sequence and the removal of entities from
						the other end of the sequence.
					</p>
				</div>
				<button className='previous' onClick={(e) => scrollPrevious(6)}>
					{'<< Previous'}
				</button>
			</div>
		</>
	);
};

export default About;
