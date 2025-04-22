import React, { useEffect, useState } from "react";
import { getCodingQuestion } from "../../store/reducers/coding-question";
import { ICodingQuestion } from "../../types/common-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import MonacoCodeEditor from "./MonacoCodeEditor";
import { Breadcrumbs, Typography } from "@mui/material";
import CodingQuestionDetails from "./CodingQuestionDetails";

const CodeRunner: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const navigate = useNavigate();
  const [codingQuestion, setCodingQuestion] = useState<ICodingQuestion | null>(
    null
  );

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
              <MonacoCodeEditor className="h-[30rem] rounded-lg overflow-hidden" baseFunctions={codingQuestion.baseFunctions} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CodeRunner;
