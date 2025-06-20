// pages/create_model/step5/page.tsx
"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/CodeEditor";
import { useState } from "react";
import { pythonValidator, ValidationError } from "@/components/pythonValidator";

export default function Step5() {
  const initialCode = `def reward_function(params):
    # Example of rewarding the agent to follow center line
    
    # Read input parameters:
    track_width = params['track_width']
    distance_from_center = params['distance_from_center']
    
    # Calculate 3 markers that are at varying distances away from the center line
    marker_1 = 0.1 * track_width
    marker_2 = 0.25 * track_width
    marker_3 = 0.5 * track_width
    
    # Give higher reward if the car is closer to center line and vice versa
    if distance_from_center <= marker_1:
        reward = 1.0
    elif distance_from_center <= marker_2:
        reward = 0.5
    elif distance_from_center <= marker_3:
        reward = 0.1
    else:
        reward = 1e-3 # likely crashed/ close to off track
    
    return float(reward)`;

  const [code, setCode] = useState<string>(initialCode);
  const [resetKey, setResetKey] = useState(0);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<string>('');

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    // Clear validation errors when code changes
    if (validationErrors.length > 0) {
      setValidationErrors([]);
      setValidationStatus('');
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setResetKey(prev => prev + 1);
    setValidationErrors([]);
    setValidationStatus('');
  };

  const handleValidate = async () => {
    setIsValidating(true);
    setValidationStatus('Validating...');
    
    try {
      const result = await pythonValidator.validateRewardFunction(code);
      
      setValidationErrors(result.errors);
      
      if (result.isValid) {
        setValidationStatus('✅ Code is valid!');
      } else {
        const errorCount = result.errors.filter(e => e.severity === 'error').length;
        const warningCount = result.errors.filter(e => e.severity === 'warning').length;
        setValidationStatus(
          `❌ Found ${errorCount} error(s) and ${warningCount} warning(s)`
        );
      }
    } catch (error) {
      setValidationStatus('❌ Validation failed: ' + (error as Error).message);
      setValidationErrors([{
        line: 1,
        column: 1,
        message: 'Validation service error: ' + (error as Error).message,
        severity: 'error'
      }]);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Step 5: Customize reward function</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Reward function <span className="text-blue-600 text-sm cursor-pointer">info</span></h2>
        <p className="text-gray-700">
          The reward function describes immediate feedback (as a score for reward or penalty) when the vehicle takes an action to move from a given position
          on the track to a new position. Its purpose is to encourage the vehicle to make moves along the track to reach its destination quickly. The model
          training process will attempt to find a policy which maximizes the average total reward the vehicle experiences. <span className="text-blue-600 cursor-pointer">Learn more</span> about the reward function
          and the reward input parameters you can use in your function.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Code editor</h2>
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            <Button variant="outline">Reward function examples</Button>
            <Button variant="outline" onClick={handleReset}>Reset</Button>
            <Button 
              variant="outline" 
              onClick={handleValidate}
              disabled={isValidating}
            >
              {isValidating ? 'Validating...' : 'Validate'}
            </Button>
          </div>
          {validationStatus && (
            <div className={`text-sm font-medium ${
              validationStatus.includes('✅') ? 'text-green-600' : 'text-red-600'
            }`}>
              {validationStatus}
            </div>
          )}
        </div>
        
        <div className="h-[400px] rounded-md shadow-inner bg-white dark:bg-black p-1">
          <CodeEditor 
            key={resetKey}
            initialDoc={code} 
            onChange={handleCodeChange}
            validationErrors={validationErrors}
          />
        </div>
        
        {validationErrors.length > 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Validation Issues:</h3>
            <ul className="text-sm text-red-700 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>
                  <span className="font-medium">Line {error.line}, Column {error.column}:</span> {error.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" asChild>
          <Link href="/create_model/step3">Previous: Choose vehicle</Link>
        </Button>
        <Button className="bg-[#ffd200] hover:bg-[#ec8c04] text-black">Create model</Button>
      </div>
    </div>
  );
}