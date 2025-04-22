import React from "react";
import { ICodingQuestion } from "../../types/common-types";
import DOMPurify from "dompurify";
import DifficultyLevel from "../ui/DifficultyLevel";
import { Code, Edit2, TrashIcon } from "lucide-react";
import { IconButton, Tooltip } from "@mui/material";

type Props = {
  codingQuestion: ICodingQuestion;
  onEditCodingQuestion?: (id: string) => void;
  goToCodeRunnerPage?: (id: string) => void;
  hideActions?: boolean;
};

const CodingQuestionDetails: React.FC<Props> = (props) => {
  const {
    codingQuestion,
    onEditCodingQuestion,
    goToCodeRunnerPage,
    hideActions = true,
  } = props;
  return (
    <div className="flex flex-col gap-[0.5rem]">
      <div
        className="flex items-center"
        style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
      >
        <header className="font-semibold">Title:</header>
        <div>{codingQuestion.title}</div>
        {!hideActions && (
          <div>
            <Tooltip title="Edit Question">
              <IconButton
                onClick={() => onEditCodingQuestion?.(codingQuestion.id)}
              >
                <Edit2 size={16} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Question">
              <IconButton>
                <TrashIcon size={16} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Run Code">
              <IconButton
                onClick={() => goToCodeRunnerPage?.(codingQuestion.id)}
              >
                <Code size={16} />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
      <div
        className="flex items-center"
        style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
      >
        <header className="font-semibold">Difficulty Level:</header>
        <div>
          <DifficultyLevel label={codingQuestion.difficulty_level} />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="font-semibold">Description:</header>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(codingQuestion.description),
          }}
        ></div>
      </div>
      <div className="flex flex-col">
        <header className="font-semibold">Input Format:</header>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(codingQuestion.input_format),
          }}
        ></div>
      </div>
      <div className="flex flex-col">
        <header className="font-semibold">Output Format:</header>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(codingQuestion.output_format),
          }}
        ></div>
      </div>
      <div className="flex flex-col">
        <header className="font-semibold">Constraints:</header>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(codingQuestion.constraints),
          }}
        ></div>
      </div>
    </div>
  );
};

export default CodingQuestionDetails;
