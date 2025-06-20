export interface ValidationError {
  line: number;
  column: number;
  message: string;
  severity: "error" | "warning";
}

export const pythonValidator = {
  validateRewardFunction: async (code: string): Promise<{
    isValid: boolean;
    errors: ValidationError[];
  }> => {
    const errors: ValidationError[] = [];

    if (!code.includes("reward =")) {
      errors.push({
        line: 12,
        column: 5,
        message: "Missing 'reward =' assignment",
        severity: "error",
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};
