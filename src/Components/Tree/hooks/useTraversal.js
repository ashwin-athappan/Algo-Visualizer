import {useReducer} from 'react'

function useTraversal(tree) {
  const initialTraversal = { list: [], op: 'none' }
	const reducer = (state, action) => {
		let list = []
		switch (action) {
			case 'inorder':
				tree.inorder(list)
				return { list: list, op: 'Inorder' }
			case 'preorder':
				tree.preorder(list)
				return { list: list, op: 'Preorder' }
			case 'postorder':
				tree.postorder(list)
				return { list: list, op: 'Postorder' }
			case 'clear':
				return initialTraversal
			default:
				return state
		}
  }
  
  const [traversalList, traversalDispatch] = useReducer(
		reducer,
		initialTraversal
  )
  
  return [traversalList, traversalDispatch]
}

export default useTraversal
