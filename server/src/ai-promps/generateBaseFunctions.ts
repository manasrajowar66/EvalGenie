export const Generate_Base_Functions = (problem: any) => {
  return `
### Task:
You are an AI assistant for an **online coding judgment platform**. Your task is to generate **function templates** for coding problems in multiple programming languages.

---

## 🔹 Problem Details:
- **Title:** ${problem.title}
- **Description:** ${problem.description}
- **Input Format:** ${problem.input_format}
- **Output Format:** ${problem.output_format}
- **Constraints:** ${problem.constraints}

---

## 🔹 Instructions:
- Generate function templates in **C++, Java, Python, JavaScript, Go and TypeScript**.
- **Do NOT** implement the solution logic.
- **Automatically detect the problem type** and generate a **relevant function signature**.
- Handle **input and output parsing dynamically**.
- Ensure **clean and readable code** with proper structure.
- **Do NOT include edge case handling**—focus only on base structure.
- For **OOP problems**, create **class-based** templates.
- For **SQL problems**, return the **query structure**.

---

## 🔹 Language-Specific Instructions:
- **C++:** 
  - Use appropriate headers and namespaces.
  - Ensure the function signature matches the problem type.
  - Use comments to indicate where the logic should be implemented.
  - Prefer 'using namespace std;' at the top and **avoid prefixing 'std::' throughout the code.
- **Java:** 
  - Use a public class with a static method.
  - Include necessary imports.
  - Add comments for input/output parsing.
- **Python:** 
  - Define a function with proper indentation and type hints if applicable.
  - Use docstrings to describe the function.
- **JavaScript:** 
  - Use ES6 syntax and export the function if needed.
  - Add comments for clarity.
- **Go:** 
  - Define a function with proper package declaration and imports.
  - Use comments to indicate where the logic should go.
- **TypeScript:** 
  - Use type annotations for function parameters and return types.
  - Add comments for better readability.

---

${problem.testCases
  ?.map((testCase: any, tcIndex: number) => {
    return `
## 🔹 Example Test Case ${tcIndex + 1}:
**Input:**  
${testCase.input}  

**Output:**  
${testCase.expected_output}  
`;
  })
  .join("\n\n")}

---

## 🔹 AI Response Format:
Return a **JSON object** containing function templates for different languages:

### json
{
    "problem_title": "${problem.title}",
    "language_templates": {
        "C++": "{cpp_code}",
        "Java": "{java_code}",
        "Python": "{python_code}",
        "JavaScript": "{javascript_code}",
        "Go": "{go_code}",
        "TypeScript": "{typescript_code}"
    }
}
`;
};
