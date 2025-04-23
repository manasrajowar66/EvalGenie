import React, { useEffect, useState } from "react";
import { getCodingQuestion } from "../../store/reducers/coding-question";
import { ICodingQuestion, ISubmission } from "../../types/common-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import MonacoCodeEditor from "./MonacoCodeEditor";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import CodingQuestionDetails from "./CodingQuestionDetails";
import axiosInstance from "../../utils/axiosInstance";
import CodeSubmissionResult from "./CodeSubmissionResult";
import { hideGlobalLoader, showGlobalLoader } from "../../store/reducers/globalLoader";

const CodeRunner: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const navigate = useNavigate();
  const [codingQuestion, setCodingQuestion] = useState<ICodingQuestion | null>(
    null
  );
  const [codeSubmissionResult, setCodeSubmissionResult] =
    useState<ISubmission[] | null>(null);

  const [sourceCode, setSourceCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    const { id } = params;
    (async () => {
      if (id) {
        const responseData = await dispatch(getCodingQuestion({ id }));
        if (responseData && responseData.meta.requestStatus === "fulfilled") {
          const { data } = responseData.payload as {
            data: ICodingQuestion;
          };
          if (data) setCodingQuestion(data);
        } else {
          navigate("/recruiter/question-hub");
        }
      } else {
        navigate("/recruiter/question-hub");
      }
    })();
  }, [dispatch, params, navigate]);

  const handleCodeRun = async () => {
    if (!codingQuestion) return;
    if (!sourceCode) {
      alert("Please write some code before running it.");
      return;
    }
    if (!language) {
      alert("Please select a programming language.");
      return;
    }
    dispatch(showGlobalLoader());
    const response = await axiosInstance.post(
      `/compiler/compile/${codingQuestion?.id}`,
      {
        source_code: sourceCode,
        language: language,
      }
    );
    if (response.status === 200) {
      const { data } = response;
      setCodeSubmissionResult(data.submissions);
    }
    dispatch(hideGlobalLoader());
  };
  return (
    <>
      {codingQuestion && (
        <div className="flex flex-col">
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Typography>EvalGenie</Typography>
              <Link to="/recruiter/question-hub" color="inherit">
                Question Hub
              </Link>
              <Link
                to={`/recruiter/question-hub/coding-question/${codingQuestion.id}`}
                color="inherit"
              >
                {codingQuestion.title}
              </Link>
              <Typography sx={{ color: "text.primary" }}>Run Code</Typography>
            </Breadcrumbs>
          </div>
          <div className="grid grid-cols-2 flex-grow gap-[1rem] mt-[1.5rem]">
            <div className="col-span-1">
              <CodingQuestionDetails codingQuestion={codingQuestion} />
            </div>
            <div className="col-span-1">
              <MonacoCodeEditor
                className="h-[30rem] rounded-lg overflow-hidden"
                baseFunctions={codingQuestion.baseFunctions}
                onLanguageChange={(setLang) => {
                  setLanguage(setLang);
                }}
                onCodeChange={(code) => {
                  setSourceCode(code || "");
                }}
              />
              <div className="flex mt-[1rem] justify-end">
                <Button
                  variant="contained"
                  className="h-[2.5rem] rounded-lg text-[1rem] font-semibold"
                  onClick={() => {
                    // Handle code submission logic here
                    handleCodeRun();
                  }}
                >
                  Run Code
                </Button>
              </div>
            </div>
          </div>
          {codeSubmissionResult && (
            <div className="flex">
              <CodeSubmissionResult
                role="admin"
                submissionResult={codeSubmissionResult}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CodeRunner;
