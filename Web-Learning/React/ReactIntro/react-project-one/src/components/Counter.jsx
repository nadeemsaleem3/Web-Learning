import { useState } from "react"

const Counter = () => {
    const[counter, setCounter] = useState(0)
  return (
    <div>
        <p>You Clicked {counter} Times</p>
        <button onClick={() => setCounter(counter+1)} style={{ padding: '10px 20px', fontSize: '16px' }}>Click Here To Count</button>
    </div>
  )
}

export default Counter