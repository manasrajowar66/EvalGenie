import React from "react";
import { difficultyLevelColor } from "../../theme/theme";
import { Chip } from "@mui/material";

type Props = {
  label: string;
  bg_color?: string;
  color?: string;
};

const DifficultyLevel: React.FC<Props> = (props) => {
  const { label, bg_color, color } = props;

  let _bg_color = "";
  let _color = "white";

  if (bg_color) {
    _bg_color = bg_color;
  } else {
    _bg_color = difficultyLevelColor[label];
  }

  if (color) {
    _color = color;
  }

  return (
    <Chip label={label} style={{ backgroundColor: _bg_color, color: _color }} />
  );
};

export default DifficultyLevel;
