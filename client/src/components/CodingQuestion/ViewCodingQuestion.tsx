import {
  Breadcrumbs,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import {
  deleteCodingQuestionTag,
  getCodingQuestion,
} from "../../store/reducers/coding-question";
import { ICodingQuestion } from "../../types/common-types";
import styles from "./ViewCodingQuestion.module.scss";
import DOMPurify from "dompurify";
import DifficultyLevel from "../ui/DifficultyLevel";
import { Edit2, PlusCircle, TrashIcon } from "lucide-react";
import AddCodingQuestionTagForm from "./AddCodingQuestionTagForm";
import { getTags } from "../../store/reducers/tag";

const ViewCodingQuestion: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const navigate = useNavigate();
  const [codingQuestion, setCodingQuestion] = useState<ICodingQuestion | null>(
    null
  );
  const [
    isAddCodingQuestionTagDialogOpen,
    setIsAddCodingQuestionTagDialogOpen,
  ] = useState(false);

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

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const onEditCodingQuestion = (id: string) => {
    navigate(`/recruiter/question-hub/coding-question/edit/${id}`);
  };

  const onDeleteCodingQuestionTag = async (cqt_id: string) => {
    const responseData = await dispatch(
      deleteCodingQuestionTag({ id: cqt_id })
    );
    if (responseData && responseData.meta.requestStatus === "fulfilled") {
      if (codingQuestion) {
        setCodingQuestion({
          ...codingQuestion,
          tags: codingQuestion.tags.filter((tag) => tag.cqt_id !== cqt_id),
        });
      }
    }
  };

  return (
    <>
      {codingQuestion && (
        <div className={styles["main-container"]}>
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Typography>EvalGenie</Typography>
              <Link to="/recruiter/question-hub" color="inherit">
                Question Hub
              </Link>
              <Typography sx={{ color: "text.primary" }}>
                {codingQuestion.title}
              </Typography>
            </Breadcrumbs>
          </div>
          <div className={styles["question-container"]}>
            <div
              className={styles["title"]}
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <header>Title:</header>
              <div>{codingQuestion.title}</div>
              <div>
                <Tooltip title="Edit Question">
                  <IconButton
                    onClick={() => onEditCodingQuestion(codingQuestion.id)}
                  >
                    <Edit2 size={16} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Question">
                  <IconButton>
                    <TrashIcon size={16} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div
              className={styles["difficulty_level"]}
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <header>Difficulty Level:</header>
              <div>
                <DifficultyLevel label={codingQuestion.difficulty_level} />
              </div>
            </div>
            <div className={styles["description"]}>
              <header>Description:</header>
              <div
                className={styles["content"]}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(codingQuestion.description),
                }}
              ></div>
            </div>
            <div className={styles["input_format"]}>
              <header>Input Format:</header>
              <div
                className={styles["content"]}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(codingQuestion.input_format),
                }}
              ></div>
            </div>
            <div className={styles["output_format"]}>
              <header>Output Format:</header>
              <div
                className={styles["content"]}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(codingQuestion.output_format),
                }}
              ></div>
            </div>
            <div className={styles["constraints"]}>
              <header>Constraints:</header>
              <div
                className={styles["content"]}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(codingQuestion.constraints),
                }}
              ></div>
            </div>
            <div className={styles["tags"]}>
              <header>
                Tags:{" "}
                <Tooltip title="Add Tag">
                  <IconButton
                    onClick={() => setIsAddCodingQuestionTagDialogOpen(true)}
                  >
                    <PlusCircle size={18} />
                  </IconButton>
                </Tooltip>
              </header>
              <div>
                {codingQuestion.tags?.map((tag) => {
                  return (
                    <Chip
                      key={tag.cqt_id}
                      label={tag.name}
                      onDelete={() => onDeleteCodingQuestionTag(tag.cqt_id)}
                    />
                  );
                })}
                {codingQuestion.tags?.length === 0 && (
                  <p className={styles["no-data"]}>No Tag added</p>
                )}
              </div>
            </div>
            <div className={styles["test_cases"]}>
              <header>
                Test Cases:{" "}
                <Tooltip title="Add Test Case">
                  <IconButton onClick={() => {}}>
                    <PlusCircle size={18} />
                  </IconButton>
                </Tooltip>
              </header>
              <div>
                {codingQuestion.testCases?.length === 0 && (
                  <p className={styles["no-data"]}>No Test Cases added</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isAddCodingQuestionTagDialogOpen && codingQuestion && (
        <AddCodingQuestionTagForm
          open={isAddCodingQuestionTagDialogOpen}
          onClose={() => setIsAddCodingQuestionTagDialogOpen(false)}
          questionId={codingQuestion.id}
          onAddTags={(data) => {
            setCodingQuestion({ ...codingQuestion, tags: data });
            setIsAddCodingQuestionTagDialogOpen(false);
          }}
        />
      )}
    </>
  );
};

export default ViewCodingQuestion;
