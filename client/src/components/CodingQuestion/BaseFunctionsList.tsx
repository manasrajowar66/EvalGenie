import React from "react";
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
import { IBaseFunction } from "../../types/common-types";
import { Trash } from "lucide-react";

type Props = {
  baseFunctions: IBaseFunction[];
};

const BaseFunctionsList: React.FC<Props> = (props) => {
  const { baseFunctions } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "10%" }}>Language</TableCell>
            <TableCell sx={{ width: "75%" }}>Base Function</TableCell>
            <TableCell sx={{ width: "15%" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {baseFunctions.map((baseFunction) => (
            <TableRow key={baseFunction.id}>
              <TableCell sx={{ width: "10%" }}>
                {baseFunction.language}
              </TableCell>
              <TableCell sx={{ width: "75%" }}>
                <pre>{baseFunction.base}</pre>
              </TableCell>
              <TableCell sx={{ width: "15%" }}>
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

export default BaseFunctionsList;
