import React, { useState } from 'react';
import evaluateRule from '../functions/evaluateRule.js';

const DataEvaluator = ({ ast }) => {
    const [formData, setFormData] = useState({
        age: '',
        department: '',
        salary: '',
        experience: ''
    });
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const evaluationResult = evaluateRule(ast, formData);
            setResult(evaluationResult);
        } catch (err) {
            console.error('Error evaluating data:', err);
            setResult(null);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center p-2">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Evaluate Data</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="number"
                        name="experience"
                        placeholder="Experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Evaluate
                    </button>
                </form>
                {result !== null && (
                    <div className="mt-6 text-center text-lg font-medium">
                        Result: <span className={result ? 'text-green-500' : 'text-red-500'}>{result ? 'True' : 'False'}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataEvaluator;
