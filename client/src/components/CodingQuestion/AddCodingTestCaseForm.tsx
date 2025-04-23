import {
  Button,
  Dialog,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import styles from "./AddCodingTestCaseForm.module.scss";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { ICodingTestCase } from "../../types/common-types";
import { addCodingQuestionTestCase } from "../../store/reducers/coding-question";

type Props = {
  open: boolean;
  testCaseData?: ICodingTestCase | null;
  onClose?: () => void;
  onAdd?: (data: ICodingTestCase) => void;
  onUpdate?: (data: ICodingTestCase) => void;
  questionId: string;
};

const validationSchema = Yup.object({
  input: Yup.string()
    .required("Input is required")
    .min(1, "Input cannot be empty"),

  expected_output: Yup.string()
    .required("Expected output is required")
    .min(1, "Expected output cannot be empty"),

  is_sample: Yup.boolean().optional().default(false), // Default to false if not provided
});

const AddCodingTestCaseForm: React.FC<Props> = (props) => {
  const { open, onClose, onAdd, questionId, testCaseData, onUpdate } = props;
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      input: "",
      expected_output: "",
      is_sample: false,
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const [editMode, setEditMode] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (body: any) => {
    if (testCaseData) {
      onUpdate?.(body);
    } else {
      onAddTestCase(body);
    }
  };

  const onAddTestCase = async (body: ICodingTestCase) => {
    const responseData = await dispatch(
      addCodingQuestionTestCase({
        questionId,
        data: body,
      })
    );
    if (responseData && responseData.meta.requestStatus === "fulfilled") {
      const { data } = responseData.payload as {
        data: ICodingTestCase;
      };
      if (data) onAdd?.(data);
    }
  };

  useEffect(() => {
    if (testCaseData) {
      reset({
        input: testCaseData.input,
        expected_output: testCaseData.expected_output,
        is_sample: testCaseData.is_sample,
      });
      setEditMode(true);
    } else {
      reset({
        input: "",
        expected_output: "",
        is_sample: false,
      });
    }
  }, [testCaseData, reset]);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        slotProps={{ paper: { style: { width: "90%", maxWidth: "30rem" } } }}
      >
        <div className={styles["add-test-case-container"]}>
          <header>
            {editMode ? "Edit Test Case" : "Add Test Case"}
          </header>
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="input"
              control={control}
              render={(props) => {
                return (
                  <TextField
                    value={props.field.value}
                    onChange={props.field.onChange}
                    label="Input*"
                    multiline={true}
                    variant="outlined"
                    maxRows={8}
                    fullWidth
                    error={!!errors.input}
                    helperText={errors.input ? errors.input.message : ""}
                  />
                );
              }}
            />
            <Controller
              name="expected_output"
              control={control}
              render={(props) => {
                return (
                  <TextField
                    value={props.field.value}
                    onChange={props.field.onChange}
                    label="Expected Output*"
                    multiline={true}
                    maxRows={8}
                    variant="outlined"
                    fullWidth
                    error={!!errors.expected_output}
                    helperText={
                      errors.expected_output
                        ? errors.expected_output.message
                        : ""
                    }
                  />
                );
              }}
            />
            <Controller
              name="is_sample"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  }
                  label="Is Sample Test Case"
                />
              )}
            />
            <Button
              type="submit"
              style={{ width: "6rem", alignSelf: "center" }}
              disabled={!isValid}
              variant="contained"
            >
              {editMode ? "Update" : "Add"}
            </Button>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default AddCodingTestCaseForm;
