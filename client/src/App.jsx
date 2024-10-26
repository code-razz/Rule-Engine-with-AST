import { useState } from 'react';
import CombineRules from './components/CombineRules';
import RuleBox from './components/RuleBox';

function App() {
  const [count, setCount] = useState(0);
  const handleRerender = () => {
    setCount(prevCount => prevCount + 1); // Update state to trigger re-render
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Rule Engine with AST</h1>
      <RuleBox reRenderCount={count}/>
      <CombineRules onRerender={handleRerender} />
    </div>
  );
}

export default App;
