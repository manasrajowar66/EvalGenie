import React from "react";
import { ISubmission, Role } from "../../types/common-types";

type CodeSubmissionResultProps = {
  role: Role;
  submissionResult?: ISubmission[];
};

const CodeSubmissionResult: React.FC<CodeSubmissionResultProps> = ({
  role,
  submissionResult = [],
}) => {
  const isAdmin = role === "admin";

  const accepted = submissionResult.filter((r) => r.status.id === 3).length;
  const wrong = submissionResult.filter((r) => r.status.id === 4).length;
  const compileErrors = submissionResult.filter(
    (r) => r.status.id === 6
  ).length;

  return (
    <div className="flex flex-col w-full h-full p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Code Submission Results</h1>
      <div className="overflow-x-auto max-h-[30rem] overflow-auto relative">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 sticky top-0">
              {isAdmin && <th className="p-4 text-left">Input</th>}
              <th className="p-4 text-left">Status</th>
              {isAdmin && (
                <>
                  <th className="p-4 text-left">Time (s)</th>
                  <th className="p-4 text-left">Expected Output</th>
                </>
              )}
              <th className="p-4 text-left">Output</th>
            </tr>
          </thead>
          <tbody>
            {submissionResult.map((result) => (
              <tr key={result.token} className="border-b hover:bg-gray-50">
                {isAdmin && (
                  <td className="p-4 font-mono text-xs">{result.stdin}</td>
                )}
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      result.status.id === 3
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {result.status.description}
                  </span>
                </td>
                {isAdmin && (
                  <>
                    <td className="p-4">{result.time}</td>
                    <td className="p-4">{result.expected_output}</td>
                  </>
                )}
                <td className="p-4 whitespace-pre-wrap">{result.stdout}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Summary</h2>
        <div className="text-sm mt-1 text-gray-700">
          <p>Total Submissions: {submissionResult.length}</p>
          <p>Accepted: {accepted}</p>
          <p>Wrong Answers: {wrong}</p>
          <p>Compilation Errors: {compileErrors}</p>
        </div>
      </div>
    </div>
  );
};

export default CodeSubmissionResult;
