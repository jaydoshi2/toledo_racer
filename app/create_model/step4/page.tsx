    // pages/create_model/step5/page.tsx
    "use client"
    import Link from "next/link";
    import { Button } from "@/components/ui/button"; // Assuming you have shadcn/ui or similar Button component
    import CodeEditor from "@/components/CodeEditor"; // Adjust path as per your project structure
    import { useState } from "react";

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


    const handleCodeChange = (newCode: string) => {
        setCode(newCode);
        console.log("Current code:", newCode); // For debugging
    };

    const handleReset = () => {
        setCode(initialCode);
        setResetKey(prev => prev + 1);
    };
    const handleValidate = () => {
        // Implement validation logic here
        alert("Validation logic would go here!");
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
            <div className="flex justify-end gap-2 mb-2">
            <Button variant="outline">Reward function examples</Button>
            <Button variant="outline" onClick={handleReset}>Reset</Button>
            <Button variant="outline" onClick={handleValidate}>Validate</Button>
            </div>
                <div className="h-[400px] rounded-md shadow-inner bg-white dark:bg-black p-1">
                    <CodeEditor 
    key={resetKey}
    initialDoc={code} 
    onChange={handleCodeChange} 
/>

                </div>
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