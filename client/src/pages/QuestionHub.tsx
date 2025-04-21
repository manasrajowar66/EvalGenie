import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import styles from "./QuestionHub.module.scss";
import CodingQuestion from "../components/CodingQuestion/CodingQuestion";

const QuestionHub: React.FC = () => {
  return (
    <div className={`${styles["main-container"]} w-full`}>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography>EvalGenie</Typography>
          <Typography sx={{ color: "text.primary" }}>
            Question Hub
          </Typography>
        </Breadcrumbs>
      </div>
      <CodingQuestion />
    </div>
  );
};

export default QuestionHub;
