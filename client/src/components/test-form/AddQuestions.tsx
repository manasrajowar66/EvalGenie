import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import NewSectionForm from "./NewSectionForm";
import { SectionFormValues } from "../../form-schema/section-schema";
import { IQuestionSection } from "../../types/common-types";
import SelectCodingQuestions from "./SelectCodingQuestions";

const AddQuestions: React.FC = () => {
  const { control } = useFormContext();
  const [openSectionForm, setOpenSectionForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<
    number | null
  >(null);

  const questionArray = useFieldArray({
    control,
    name: "coding_questions",
  });

  const onAddSection = (data: SectionFormValues) => {
    if (editIndex !== null) {
      questionArray.update(editIndex, data); // ← Update section
    } else {
      questionArray.append(data); // ← Add new section
    }
    setOpenSectionForm(false);
    setEditIndex(null);
  };

  const values = useWatch({ control, name: "coding_questions" });

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <Button variant="contained" onClick={() => setOpenSectionForm(true)}>
            <Plus /> Add New Section
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {values?.map((section: IQuestionSection, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col border border-gray-300 rounded-lg"
              >
                <div className="flex justify-between h-[4rem] items-center px-4">
                  <h1 className="text-[#333] text-[1.25rem] font-bold">
                    {section.section_name}
                  </h1>
                  <div className="flex items-center">
                    <p className="text-[0.75rem] text-gray-500 mr-2">
                      Total questions:{" "}
                      <span className="text-black">
                        {section.question_list.length}
                      </span>
                    </p>
                    <p className="text-[0.75rem] text-gray-500 mr-4">
                      Marks each:{" "}
                      <span className="text-black">
                        {section.marks_per_question}
                      </span>
                    </p>
                    <button
                      className="cursor-pointer mr-4 border rounded-[0.3125rem] text-[0.875rem] border-[#333] text-[#333] px-[0.625rem] py-[0.3875rem]"
                      onClick={() => {
                        setEditIndex(index);
                        setOpenSectionForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="cursor-pointer mr-4 border rounded-[0.3125rem] text-[0.875rem] border-[#333] text-[#333] px-[0.625rem] py-[0.3875rem]"
                      onClick={() => setSelectedSectionIndex(index)}
                    >
                      Add Questions
                    </button>
                    <button
                      className="cursor-pointer border rounded-[0.3125rem] text-[0.875rem] border-[#333] text-[#333] px-[0.625rem] py-[0.3875rem]"
                      onClick={() => questionArray.remove(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <Table>
                  <TableHead className="border-t border-b border-gray-300 bg-sky-100">
                    <TableRow>
                      <TableCell sx={{ width: "20%" }}>SL No.</TableCell>
                      <TableCell sx={{ width: "70%" }}>Title</TableCell>
                      <TableCell sx={{ width: "10%" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {section.question_list.map((question, quIndex) => {
                      return (
                        <TableRow key={question.id}>
                          <TableCell sx={{ width: "20%" }}>
                            {quIndex + 1}
                          </TableCell>
                          <TableCell sx={{ width: "70%" }}>
                            {question.title}
                          </TableCell>
                          <TableCell sx={{ width: "10%" }}>
                            <IconButton>
                              <Trash size={18} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {section.question_list.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3}>
                          <p className="text-center text-gray-500">
                            No question added
                          </p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            );
          })}
        </div>
      </div>
      {openSectionForm && (
        <NewSectionForm
          onClose={() => {
            setOpenSectionForm(false);
            setEditIndex(null);
          }}
          onAdd={onAddSection}
          defaultValues={editIndex !== null ? values[editIndex] : undefined}
        />
      )}
      {selectedSectionIndex !== null && (
        <SelectCodingQuestions
          open={selectedSectionIndex !== null}
          sectionIndex={selectedSectionIndex}
          onClose={() => setSelectedSectionIndex(null)}
        />
      )}
    </>
  );
};

export default AddQuestions;
