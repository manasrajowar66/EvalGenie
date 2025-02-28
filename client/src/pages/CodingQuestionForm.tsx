import React, { useCallback, useEffect, useState } from "react";
import styles from "./CodingQuestionForm.module.scss";
import {
  Breadcrumbs,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  DifficultyLevelEnum,
  ICodingQuestionFormData,
} from "../types/common-types";
import RichTextEditor from "../components/ui/RichTextEditor";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { getTags } from "../store/reducers/tag";
import {
  addCodingQuestion,
  editCodingQuestion,
  getCodingQuestionById,
} from "../store/reducers/coding-question";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  input_format: Yup.string().required("Input Format is required"),
  output_format: Yup.string().required("Output Format is required"),
  time_limit_milliseconds: Yup.number()
    .positive("Time limit must be a positive number")
    .integer("Please enter a valid integer value")
    .required("Time Limit is required"),
  difficulty_level: Yup.mixed()
    .oneOf(Object.values(DifficultyLevelEnum), "Invalid difficulty level")
    .required("Difficulty level is required"),
  constraints: Yup.string().required("Constraints is required"),
  // tags: Yup.array()
  //   .of(
  //     Yup.object({
  //       id: Yup.string().uuid().required("Tag ID is required"),
  //       name: Yup.string().required("Tag name is required"),
  //     })
  //   )
  //   .min(1, "At least one tag is required")
  //   .required("Tags are required"),
});

const CodingQuestionForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      description: "",
      input_format: "",
      output_format: "",
      time_limit_milliseconds: 1000,
      difficulty_level: DifficultyLevelEnum.EASY,
      constraints: "",
      // tags: [],
    },
  });

  const [questionId, setQuestionId] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const params = useParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitHandler = async (body: any) => {
    if(questionId){
      const responseData = await dispatch(editCodingQuestion({ id: questionId, data: body }) );
      if (responseData && responseData.meta.requestStatus === "fulfilled") {
        navigate(-1);
      }
    }else{
      const responseData = await dispatch(addCodingQuestion(body));
      if (responseData && responseData.meta.requestStatus === "fulfilled") {
        navigate(-1);
      }
    }
  };

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const getCodingQuestionHandler = useCallback(
    async (id: string) => {
      const responseData = await dispatch(getCodingQuestionById({ id }));

      if (
        responseData &&
        responseData.meta.requestStatus === "fulfilled" &&
        responseData.payload
      ) {
        const { data } = responseData.payload as {
          data: ICodingQuestionFormData;
        };

        if (data) {
          reset({
            title: data.title,
            description: data.description,
            input_format: data.input_format,
            output_format: data.output_format,
            time_limit_milliseconds: data.time_limit_milliseconds,
            difficulty_level: data.difficulty_level,
            constraints: data.constraints,
          });
        }
      } else {
        navigate("/recruiter/question-hub");
      }
    },
    [dispatch, navigate, reset]
  );

  useEffect(() => {
    const { id } = params;
    if (id) {
      getCodingQuestionHandler(id);
      setQuestionId(id);
    }
  }, [params, getCodingQuestionHandler]);

  return (
    <div className={styles["main-container"]}>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography>EvalGenie</Typography>
          <Link to="/recruiter/question-hub" color="inherit">
            Question Hub
          </Link>
          <Typography sx={{ color: "text.primary" }}>
            {questionId ? "Edit" : "Create"} Coding Question
          </Typography>
        </Breadcrumbs>
      </div>
      <div className={styles["form-container"]}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
          <Controller
            name="title"
            control={control}
            render={(props) => {
              return (
                <TextField
                  value={props.field.value}
                  onChange={props.field.onChange}
                  label="Title*"
                  variant="outlined"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : ""}
                />
              );
            }}
          />

          <Controller
            name="description"
            control={control}
            render={(props) => {
              return (
                <RichTextEditor
                  value={props.field.value}
                  onChange={props.field.onChange}
                  label="Description*"
                  error={errors.description?.message}
                />
              );
            }}
          />

          <Controller
            name="input_format"
            control={control}
            render={(props) => {
              return (
                <RichTextEditor
                  value={props.field.value}
                  onChange={props.field.onChange}
                  label="Input Format*"
                  error={errors.input_format?.message}
                />
              );
            }}
          />

          <Controller
            name="output_format"
            control={control}
            render={(props) => {
              return (
                <RichTextEditor
                  value={props.field.value}
                  onChange={props.field.onChange}
                  label="Output Format*"
                  error={errors.output_format?.message}
                />
              );
            }}
          />

          <Controller
            name="constraints"
            control={control}
            render={(props) => {
              return (
                <RichTextEditor
                  value={props.field.value as string}
                  onChange={props.field.onChange}
                  label="Constraints*"
                  error={errors.constraints?.message}
                />
              );
            }}
          />

          <div className={styles["form-row"]} style={{ marginTop: "0.5rem" }}>
            <div className={styles["form-col"]}>
              <Controller
                name="time_limit_milliseconds"
                control={control}
                render={(props) => {
                  return (
                    <TextField
                      value={props.field.value}
                      onChange={props.field.onChange}
                      label="Time limit(in millisecond)*"
                      variant="outlined"
                      fullWidth
                      error={!!errors.time_limit_milliseconds}
                      helperText={
                        errors.time_limit_milliseconds
                          ? errors.time_limit_milliseconds.message
                          : ""
                      }
                    />
                  );
                }}
              />
            </div>
            <div className={styles["form-col"]}>
              <Controller
                name="difficulty_level"
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={!!errors.difficulty_level}
                  >
                    <InputLabel id="difficulty-level-label">
                      Difficulty Level*
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="difficulty-level-label"
                      value={field.value || ""}
                      label="Difficulty Level*"
                      onChange={(event) => field.onChange(event.target.value)}
                    >
                      {Object.values(DifficultyLevelEnum).map((level) => (
                        <MenuItem key={level} value={level}>
                          {level}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {errors.difficulty_level?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            style={{ width: "6rem", alignSelf: "center" }}
            variant="contained"
            disabled={!isValid}
          >
            {questionId ? "Update" : "Create"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CodingQuestionForm;
