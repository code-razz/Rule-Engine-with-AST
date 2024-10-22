import { useEffect, useState } from 'react'
import InputBox from './components/InputBox'
import List from './components/List'
import axios from 'axios';


function App() {
  const [count, setCount] = useState(0);
  const handleRerender = () => {
      setCount(prevCount => prevCount + 1); // Update state to trigger re-render
  };

  const [rules,setRules]=useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/rules');
    //   console.log('Data:', response.data);
      // sconst rules=response.data
      setRules(response.data)
      console.log(rules)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    
  useEffect(()=>{
      fetchData();
  },[count])

  return (
    <>
    <div className='flex flex-col justify-center items-center h-screen w-screen'>
      <InputBox onRerender={handleRerender}/>
      {/* <List /> */}
      <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
          {rules.map((rule) => (
            <div key={rule._id}
            className='w-full'
            >
              <List onRerender={handleRerender} rule={rule} />
            </div>
          ))}
      </div>
    </div>


    </>
  )
}

export default App
