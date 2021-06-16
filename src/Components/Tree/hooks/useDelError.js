import {useState, useEffect} from 'react'

function useDelError(depend) {
  const [delError, setDelError] = useState(false)
  useEffect(() => {
		setDelError(false)
	}, [depend])
  return [delError, setDelError]
}

export default useDelError
