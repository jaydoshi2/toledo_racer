"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/CodeEditor";
import { useState } from "react";
import { ValidationError } from "@/components/pythonValidator"; // reuse interface
import axios from "axios";

export default function Step5() {
  const initialCode = `def reward_function(params):
    track_width = params['track_width']
    distance_from_center = params['distance_from_center'] 
    marker_1 = 0.1 * track_width
    marker_2 = 0.25 * track_width
    marker_3 = 0.5 * track_width
    
    if distance_from_center <= marker_1:
        reward = 1.0
    elif distance_from_center <= marker_2:
        reward = 0.5
    elif distance_from_center <= marker_3:
        reward = 0.1
    else:
        reward = 1e-3
    
    return float(reward)`;

  const [code, setCode] = useState<string>(initialCode);
  const [resetKey, setResetKey] = useState(0);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<string>("");

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setValidationErrors([]);
    setValidationStatus("");
  };

  const handleReset = () => {
    setCode(initialCode);
    setResetKey((prev) => prev + 1);
    setValidationErrors([]);
    setValidationStatus("");
  };

  const handleValidate = async () => {
    setIsValidating(true);
    setValidationStatus("Validating...");

    try {
      const response = await axios.post("/api/compile", {
        code,
        language: "python",
        input: "", // or pass test input here
      });

      const result = response.data;
      console.log(result)
      if (result.stderr) {
        const lines = result.stderr.split("\n");

        const errorLine = lines.find((line: string | string[]) => line.includes(".py\"")) || "";
        const match = errorLine.match(/File ".*", line (\d+)/);

        const lineNumber = match ? parseInt(match[1], 10) : 1;

        setValidationErrors([
          {
            line: lineNumber,
            column: 1,
            message: result.stderr.trim(),
            severity: "error",
          },
        ]);

        setValidationStatus("❌ Compile Error");
      } else {
        setValidationErrors([]);
        setValidationStatus("✅ Code is valid!");
      }
    } catch (error) {
      setValidationStatus("❌ Failed to validate");
      setValidationErrors([
        {
          line: 1,
          column: 1,
          message: "Backend error or network issue.",
          severity: "error",
        },
      ]);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Step 5: Customize reward function</h1>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            <Button variant="outline">Reward function examples</Button>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="outline" onClick={handleValidate} disabled={isValidating}>
              {isValidating ? "Validating..." : "Validate"}
            </Button>
          </div>
          {validationStatus && (
            <div
              className={`text-sm font-medium ${
                validationStatus.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {validationStatus}
            </div>
          )}
        </div>

        <div
          className={`h-[400px] rounded-md shadow-inner p-1 ${
            validationStatus.includes("✅") ? "border border-green-400" : ""
          }`}
        >
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
                  <span className="font-medium">
                    Line {error.line}, Column {error.column}:
                  </span>{" "}
                  {error.message}
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
