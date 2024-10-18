import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className="border p-4 m-4 rounded-xl border-5 border-red-700text-3xl font-bold underline bg-red-500">
      Hello world!
    </h1>

    </>
  )
}

export default App
