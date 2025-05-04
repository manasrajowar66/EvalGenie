import {
  Button,
  Dialog,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import { CircleX } from "lucide-react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SectionFormValues,
  SectionSchema,
} from "../../form-schema/section-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { IQuestionSection } from "../../types/common-types";

type Props = {
  onClose: () => void;
  onAdd: (data: SectionFormValues) => void;
  defaultValues?: IQuestionSection;
};

const NewSectionForm: React.FC<Props> = (props) => {
  const { onClose, onAdd, defaultValues } = props;

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(SectionSchema),
    context: { validateQuestionList: false },
    defaultValues: {
      section_name: "",
      question_list: [],
      is_negative_marks: false,
      negative_marks: null,
      marks_per_question: 1,
    },
  });

  const isNegativeMarksEnabled = watch("is_negative_marks");

  const onSubmit = async (data: SectionFormValues) => {
    onAdd(data);
  };

  useEffect(() => {
    if (defaultValues) {
      reset({
        section_name: defaultValues.section_name,
        question_list: defaultValues.question_list,
        is_negative_marks: defaultValues.is_negative_marks,
        negative_marks: defaultValues.negative_marks,
        marks_per_question: defaultValues.marks_per_question
      });
    }
  }, [reset, defaultValues]);

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add New Section</h2>
          <IconButton onClick={onClose}>
            <CircleX />
          </IconButton>
        </div>
        <form
          className="flex flex-col gap-4 mt-[1rem]"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <Controller
                name="section_name"
                control={control}
                render={(props) => {
                  return (
                    <TextField
                      value={props.field.value}
                      onChange={props.field.onChange}
                      label="Section Name*"
                      variant="outlined"
                      fullWidth
                      error={!!errors.section_name}
                      helperText={
                        errors.section_name
                          ? (errors.section_name.message as string)
                          : ""
                      }
                      slotProps={{ htmlInput: { maxLength: 30 } }}
                    />
                  );
                }}
              />
            </div>
            <div className="col-span-1">
              <Controller
                name="marks_per_question"
                control={control}
                render={(props) => {
                  return (
                    <TextField
                      value={props.field.value}
                      onChange={props.field.onChange}
                      label="Marks Each*"
                      variant="outlined"
                      type="number"
                      fullWidth
                      error={!!errors.marks_per_question}
                      helperText={
                        errors.marks_per_question
                          ? (errors.marks_per_question.message as string)
                          : ""
                      }
                      slotProps={{ htmlInput: { maxLength: 30 } }}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1 flex">
              <Controller
                name="is_negative_marks"
                control={control}
                render={(props) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={props.field.value}
                        onChange={(e) => props.field.onChange(e.target.checked)}
                      />
                    }
                    label="Enable Negative Marks"
                  />
                )}
              />
            </div>
            <div className="col-span-1">
              {isNegativeMarksEnabled && (
                <Controller
                  name="negative_marks"
                  control={control}
                  render={(props) => (
                    <TextField
                      value={props.field.value || ""}
                      onChange={props.field.onChange}
                      label="Negative Marks*"
                      variant="outlined"
                      type="number"
                      fullWidth
                      error={!!errors.negative_marks}
                      helperText={
                        errors.negative_marks
                          ? (errors.negative_marks.message as string)
                          : ""
                      }
                    />
                  )}
                />
              )}
            </div>
          </div>
          <Button
            type="submit"
            style={{ width: "6rem", alignSelf: "center" }}
            variant="contained"
          >
            Create
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default NewSectionForm;
