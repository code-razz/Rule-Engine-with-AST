import { useState } from 'react'
import InputBox from './components/inputBox'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex justify-center items-center h-screen w-screen'>
      <InputBox/>
    </div>


    </>
  )
}

export default App
