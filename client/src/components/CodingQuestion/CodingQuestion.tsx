import {
  Button,
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Chip,
} from "@mui/material";
import React, { useEffect } from "react";
import styles from "./CodingQuestion.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Edit, Eye, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCodingQuestions } from "../../store/reducers/coding-question";
import DifficultyLevel from "../ui/DifficultyLevel";
import DOMPurify from "dompurify";

const CodingQuestion: React.FC = () => {
  const { codingQuestions } = useSelector(
    (state: RootState) => state.codingQuestion
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCodingQuestions());
  }, [dispatch]);

  const onEditCodingQuestion = (id: string) => {
    navigate(`coding-question/edit/${id}`);
  };

  const onViewCodingQuestion = (id: string) => {
    navigate(`coding-question/${id}`);
  };
  return (
    <>
      <div className={styles["header"]}>
        <Button
          variant="contained"
          onClick={() =>
            navigate("/recruiter/question-hub/coding-question/create")
          }
        >
          Create new question
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "20%" }}>Question Name</TableCell>
              <TableCell sx={{ width: "30%" }}>Description</TableCell>
              <TableCell sx={{ width: "15%" }}>Difficulty Level</TableCell>
              <TableCell sx={{ width: "20%" }}>Tags</TableCell>
              <TableCell sx={{ width: "15%" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {codingQuestions.map((codingQuestion) => (
              <TableRow key={codingQuestion.id}>
                <TableCell sx={{ width: "20%" }}>
                  {codingQuestion.title}
                </TableCell>
                <TableCell
                  sx={{ width: "30%" }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(codingQuestion.description),
                  }}
                ></TableCell>
                <TableCell sx={{ width: "15%" }}>
                  <DifficultyLevel label={codingQuestion.difficulty_level} />
                </TableCell>
                <TableCell sx={{ width: "20%" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {codingQuestion.tags.map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        style={{
                          backgroundColor: "#E0E0E0",
                          color: "#424242",
                        }}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell sx={{ width: "15%" }}>
                  <IconButton
                    sx={{ "&:hover": { color: "orange" } }}
                    onClick={() => onViewCodingQuestion(codingQuestion.id)}
                  >
                    <Eye size={18} />
                  </IconButton>
                  <IconButton
                    sx={{ "&:hover": { color: "blue" } }}
                    onClick={() => onEditCodingQuestion(codingQuestion.id)}
                  >
                    <Edit size={18} />
                  </IconButton>
                  <IconButton sx={{ "&:hover": { color: "red" } }}>
                    <Trash size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CodingQuestion;
