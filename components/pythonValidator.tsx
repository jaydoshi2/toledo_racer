// utils/pythonValidator.ts
interface ValidationError {
    line: number;
    column: number;
    message: string;
    severity: 'error' | 'warning';
  }
  
  interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
  }
  
  class PythonValidator {
    private pyodide: any = null;
    private isInitialized = false;
  
    async initialize() {
      if (this.isInitialized) return;
      
      try {
        // Dynamically import pyodide
        const { loadPyodide } = await import('https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.mjs');

        this.pyodide = await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        this.isInitialized = true;
      } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        throw new Error('Failed to initialize Python validator');
      }
    }
  
    async validateCode(code: string): Promise<ValidationResult> {
      if (!this.isInitialized) {
        await this.initialize();
      }
  
      const errors: ValidationError[] = [];
      let isValid = true;
  
      try {
        // First, try to compile the code to check for syntax errors
        this.pyodide.runPython(`
  import ast
  import sys
  from io import StringIO
  
  def validate_python_code(code):
      errors = []
      try:
          # Parse the AST to check for syntax errors
          ast.parse(code)
          
          # Try to compile the code
          compile(code, '<string>', 'exec')
          
          # If we get here, the syntax is valid
          return {"is_valid": True, "errors": []}
          
      except SyntaxError as e:
          return {
              "is_valid": False,
              "errors": [{
                  "line": e.lineno or 1,
                  "column": e.offset or 1,
                  "message": f"SyntaxError: {e.msg}",
                  "severity": "error"
              }]
          }
      except Exception as e:
          return {
              "is_valid": False,
              "errors": [{
                  "line": 1,
                  "column": 1,
                  "message": f"Error: {str(e)}",
                  "severity": "error"
              }]
          }
        `);
  
        // Set the code to validate
        this.pyodide.globals.set('code_to_validate', code);
        
        // Run validation
        const result = this.pyodide.runPython(`validate_python_code(code_to_validate)`);
        
        return {
          isValid: result.is_valid,
          errors: result.errors
        };
  
      } catch (error) {
        console.error('Validation error:', error);
        return {
          isValid: false,
          errors: [{
            line: 1,
            column: 1,
            message: 'Failed to validate code: ' + (error as Error).message,
            severity: 'error' as const
          }]
        };
      }
    }
  
    // Additional method to validate reward function specific requirements
    async validateRewardFunction(code: string): Promise<ValidationResult> {
      const syntaxResult = await this.validateCode(code);
      
      if (!syntaxResult.isValid) {
        return syntaxResult;
      }
  
      const additionalErrors: ValidationError[] = [];
  
      try {
        // Check if the function is named 'reward_function'
        this.pyodide.runPython(`
  import ast
  import re
  
  def check_reward_function(code):
      errors = []
      
      # Parse the AST
      tree = ast.parse(code)
      
      # Check if there's a function named 'reward_function'
      has_reward_function = False
      for node in ast.walk(tree):
          if isinstance(node, ast.FunctionDef) and node.name == 'reward_function':
              has_reward_function = True
              
              # Check if it has 'params' parameter
              if len(node.args.args) == 0 or node.args.args[0].arg != 'params':
                  errors.append({
                      "line": node.lineno,
                      "column": node.col_offset + 1,
                      "message": "reward_function must have 'params' as first parameter",
                      "severity": "warning"
                  })
              
              # Check if it returns something
              has_return = False
              for child in ast.walk(node):
                  if isinstance(child, ast.Return):
                      has_return = True
                      break
              
              if not has_return:
                  errors.append({
                      "line": node.lineno,
                      "column": node.col_offset + 1,
                      "message": "reward_function should return a value",
                      "severity": "warning"
                  })
      
      if not has_reward_function:
          errors.append({
              "line": 1,
              "column": 1,
              "message": "Code should contain a function named 'reward_function'",
              "severity": "warning"
          })
      
      return errors
        `);
  
        this.pyodide.globals.set('code_to_check', code);
        const additionalChecks = this.pyodide.runPython(`check_reward_function(code_to_check)`);
        
        additionalErrors.push(...additionalChecks);
  
      } catch (error) {
        console.error('Additional validation error:', error);
      }
  
      return {
        isValid: syntaxResult.isValid && additionalErrors.filter(e => e.severity === 'error').length === 0,
        errors: [...syntaxResult.errors, ...additionalErrors]
      };
    }
  }
  
  // Export a singleton instance
  export const pythonValidator = new PythonValidator();
  export type { ValidationError, ValidationResult };