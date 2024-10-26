import React, { useState } from 'react';
import createAST from '../functions/createAST_new.js'
import axios from 'axios';

function CombineRules({ onRerender }) {
  const [rule1, setRule1] = useState('');
  const [rule2, setRule2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedRule = `(${rule1}) AND (${rule2})`;
    console.log(combinedRule);
    // const ruleAST = combineRules([rule1, rule2]);
    const ruleAST=createAST(combinedRule)
    console.log(ruleAST);

    try {
      const res = await axios.post("http://localhost:8800/api/rules", { ruleString: combinedRule, ast: ruleAST });
      console.log(res);
      onRerender();
    } catch (error) {
      console.log(error);
    }
    setRule1('')
    setRule2('')
  };

  return (
    <div className='border-2 border-green-300 rounded-xl m-4 p-6 max-w-lg w-full bg-white shadow-lg'>
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Combine Rules</h1>
      <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
        <input
          type="text"
          className='rounded-xl p-3 bg-blue-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Rule 1'
          value={rule1}
          onChange={(e) => setRule1(e.target.value)}
        />
        <input
          type="text"
          className='rounded-xl p-3 bg-blue-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Rule 2'
          value={rule2}
          onChange={(e) => setRule2(e.target.value)}
        />
        <button
          type="submit"
          className='bg-green-500 p-3 text-white rounded-xl hover:bg-green-600 active:bg-green-700 transition duration-300'
        >
          Combine
        </button>
      </form>
    </div>
  );
}

export default CombineRules;
