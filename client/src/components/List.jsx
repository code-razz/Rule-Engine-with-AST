import axios from 'axios';
import React, { useEffect, useState } from 'react'
import createAST from '../functions/createAST_new';
import ASTViewer from './ASTViewer_new';

function List({onRerender,rule}) {
  const [isRuleEditable, setIsRuleEditable] = useState(false)
  const [ruleString, setRuleString] = useState(rule.ruleString)
  const [isDisplayAST,setIsDisplayAST]=useState(false)
//   useEffect(()=>{
//     setRuleString(rule.ruleString)
//   },[])
//   const {updateRule, deleteRule, toggleComplete} = useRule()

  const updateRule = async() => {
    const ast=createAST(ruleString)
    try{
        const res=await axios.put(`http://localhost:8800/api/rules/${rule._id}`,{ast:ast,ruleString:ruleString,metadata:{createdAt:rule.metadata.createdAt}})
        console.log("update res",res)
        setIsRuleEditable(false)
    }catch(err){
        console.log("update err",err)
    }
  }

  const deleteRule = async() => {
    try{
        const res=await axios.delete(`http://localhost:8800/api/rules/${rule._id}`)
        // updateRule(rule._id, {...rule, rule: ruleString})
        console.log("delete res",res)
        // window.location.reload();
        onRerender()
        // setIsRuleEditable(false)
    }catch(err){
        console.log("delete err",err)
    }
  }
//   console.log(rule.ast)

return (
    <>
    <div className="flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black">
        <input
            type="text"
            className={`border outline-none w-full bg-transparent rounded-lg ${
                isRuleEditable ? "border-black/10 px-2" : "border-transparent"
            }`}
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            readOnly={!isRuleEditable}
        />
        {/* Edit, Save Button */}
        <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
            onClick={() => {
                // if (rule.completed) return;

                if (isRuleEditable) {
                    updateRule();
                } else {
                    setIsRuleEditable((prev) => !prev);
                }
            }}
            // disabled={rule.completed}
        >
            {isRuleEditable ? "📁" : "✏️"}
        </button>
        {/* Delete Rule Button */}
        <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={()=>setIsDisplayAST(!isDisplayAST)}
        >
            AST
        </button>
        <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={deleteRule}
        >
            ❌
        </button>
    </div>
    <div className='flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black'>
        {isDisplayAST?
        <>
        {/* <ASTDisplay ast={rule.ast} /> */}
        {/* <ASTDisplayTree ast={rule.ast}/> */}
        
        <ASTViewer ast={rule.ast}/>
        </>
         :<></>
        }
    </div>
    </>
);
}

export default List;
