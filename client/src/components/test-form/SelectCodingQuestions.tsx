import {
  Dialog,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CircleX, PlusCircle } from "lucide-react";
import { useServerPagination } from "../../hooks/useServerPagination";
import axiosInstance from "../../utils/axiosInstance";
import { ICodingQuestion } from "../../types/common-types";
import { SectionFormValues } from "../../form-schema/section-schema";

type Props = {
  sectionIndex: number;
  open: boolean;
  onClose: () => void;
};

const SelectCodingQuestions: React.FC<Props> = (props) => {
  const { sectionIndex, open, onClose } = props;
  const { control, watch } = useFormContext();
  const questionArray = useFieldArray({
    control,
    name: `coding_questions[${sectionIndex}].question_list`,
  });
  const codingSectionList = watch(`coding_questions`) || [];

  const { data, total, page, pageSize, setPageSize, setPage } =
    useServerPagination<ICodingQuestion>(
      useCallback(async (page: number, pageSize: number) => {
        const response = await axiosInstance.get(
          `coding-questions?page=${page}&limit=${pageSize}`
        );
        return {
          data: response.data.data,
          total: 1,
        };
      }, [])
    );

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage + 1); // MUI is 0-based; we use 1-based
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1);
  };

  const isAlreadySelected = (questionId: string): boolean => {
    const allSelectedQuestions = codingSectionList.flatMap(
      (section: SectionFormValues) => section.question_list || []
    );

    return allSelectedQuestions.some(
      (q: ICodingQuestion) => q.id === questionId
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add Questions</h2>
          <IconButton onClick={onClose}>
            <CircleX />
          </IconButton>
        </div>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead className="border-t border-b border-gray-300 bg-sky-100">
              <TableRow>
                <TableCell sx={{ width: "20%" }}>SL No.</TableCell>
                <TableCell sx={{ width: "70%" }}>Title</TableCell>
                <TableCell sx={{ width: "10%" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((question, quIndex: number) => {
                return (
                  <TableRow key={question.id}>
                    <TableCell sx={{ width: "20%" }}>{quIndex + 1}</TableCell>
                    <TableCell sx={{ width: "70%" }}>
                      {question.title}
                    </TableCell>
                    <TableCell sx={{ width: "10%" }}>
                      <IconButton
                        onClick={() => {
                          const alreadyAdded = questionArray.fields.some(
                            (q) => q.id === question.id
                          );
                          if (!alreadyAdded) {
                            questionArray.append(question);
                          }
                        }}
                        disabled={isAlreadySelected(question.id)}
                      >
                        <PlusCircle size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <p className="text-center text-gray-500">
                      No question found
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={total}
                  page={page - 1} // 0-based for MUI
                  onPageChange={handlePageChange}
                  rowsPerPage={pageSize}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </Dialog>
  );
};

export default SelectCodingQuestions;
