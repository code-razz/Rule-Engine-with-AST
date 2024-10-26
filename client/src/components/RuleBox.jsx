import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InputBox from './InputBox'
import List from './List'
// import List from 'List'

function RuleBox({reRenderCount}) {
    const [reRenderCount2, setReRenderCount2] = useState(0);
    const handleRerender = () => {
      setReRenderCount2(prevCount => prevCount + 1); // Update state to trigger re-render
    };
    const [rules, setRules] = useState([]);
    const fetchData = async () => {
        try {
        const response = await axios.get('http://localhost:8800/api/rules');
        setRules(response.data);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [reRenderCount,reRenderCount2]);

  return (
    <div className="flex flex-col items-center justify-centerborder border-green-300 rounded-xl m-4 p-8 max-w-6xl w-full bg-white shadow-lg">
        <InputBox onRerender={handleRerender} />
        <div className="flex flex-wrap gap-y-3 mt-4">
            {rules.map((rule) => (
            <div key={rule._id} className="w-full">
                <List onRerender={handleRerender} rule={rule} />
            </div>
            ))}
        </div>
    </div>
  )
}

export default RuleBox