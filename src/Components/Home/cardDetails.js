import sort from './images/sorting.png';
import scheduling from './images/Schduling.png'
import graph from './images/graph.png';
import queen from './images/queen.png';
import searching from './images/searching.jpg';
import bst from './images/bst.png';
import stack from './images/stack.png'
import queue from './images/queue.png';

export function getDetails() {
    return [
        {
            id: 1,
            title: 'Sorting',
            description: 'Compare different sorting algorithms',
            route: '/sort',
            img: sort
        },
        {
            id: 2,
            title: 'Scheduling',
            description: 'Compare different scheduling algorithms',
            route: '/scheduling',
            img: scheduling
        },
        {
            id: 3,
            title:"Graph Traversals",
           description:"Visualize graph algorithms like dijkstra, BFS, DFS",
           route:"/graphtraversal",
           img:graph
        },
        {
            id: 4,
            title:"N Queens",
            description:"Visualize N Queens Backtracking Algorithm",
            route:"/nqueen",
            img:queen
        },
        {
            id: 5,
            title:"Searching",
            description:"Visualize Searching Algorithms",
            route:"/searching",
            img:searching
        },
        {
            id: 6,
            title:"Tree",
            description:"Visualize Tree Algorithms",
            route:"/tree",
            img:bst
        },
        {
            id: 7,
            title:"Stack",
            description:"Visualize Stack Data Structure",
            route:"/stack",
            img:stack
        },
        {
            id: 8,
            title:"Queue",
            description:"Visualize Queue Data Structure",
            route:"/queue",
            img:queue
        }
    ];
}