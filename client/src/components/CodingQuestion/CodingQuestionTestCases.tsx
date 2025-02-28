import {
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from "@mui/material";
import { Edit2, Trash } from "lucide-react";
import React from "react";
import { ICodingTestCase } from "../../types/common-types";

type Props = {
  testCases: ICodingTestCase[];
};

const CodingQuestionTestCases: React.FC<Props> = (props) => {
  const { testCases } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "10%" }}>SL No.</TableCell>
            <TableCell sx={{ width: "30%" }}>Input</TableCell>
            <TableCell sx={{ width: "20%" }}>Expected Output</TableCell>
            <TableCell sx={{ width: "25%" }}>Sample Test Case</TableCell>
            <TableCell sx={{ width: "15%" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testCases.map((testCase, tcIndex) => (
            <TableRow key={testCase.id}>
              <TableCell sx={{ width: "10%" }}>{tcIndex + 1}</TableCell>
              <TableCell sx={{ width: "30%" }}>
                <pre>{testCase.input}</pre>
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
                <pre>{testCase.expected_output}</pre>
              </TableCell>
              <TableCell sx={{ width: "25%" }}>
                {testCase.is_sample ? "Yes" : "No"}
              </TableCell>
              <TableCell sx={{ width: "15%" }}>
                <IconButton
                  sx={{ "&:hover": { color: "blue" } }}
                  onClick={() => {}}
                >
                  <Edit2 size={18} />
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
  );
};

export default CodingQuestionTestCases;
