import { Autocomplete, Button, Chip, Dialog, TextField } from "@mui/material";
import React from "react";
import styles from "./AddCodingQuestionTag.module.scss";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ICodingQuestionTag, ITag } from "../../types/common-types";
import { addCodingQuestionTag } from "../../store/reducers/coding-question";

type Props = {
  open: boolean;
  onClose?: () => void;
  onAddTags?: (tags: ICodingQuestionTag[]) => void;
  questionId: string;
};

const validationSchema = Yup.object({
  tags: Yup.array()
    .of(
      Yup.object({
        id: Yup.string().uuid().required("Tag ID is required"),
        name: Yup.string().required("Tag name is required"),
      })
    )
    .min(1, "At least one tag is required")
    .required("Tags are required"),
});

const AddCodingQuestionTagForm: React.FC<Props> = (props) => {
  const { open, onClose, questionId, onAddTags } = props;
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      tags: [],
    },
  });

  const { tags } = useSelector((state: RootState) => state.tag);
  const dispatch = useDispatch<AppDispatch>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (body: any) => {
    const responseData = await dispatch(
      addCodingQuestionTag({
        questionId,
        data: {
          tags: body.tags.map((tag: ITag) => tag.id),
        },
      })
    );
    if (responseData && responseData.meta.requestStatus === "fulfilled") {
      const { data } = responseData.payload as {
        data: ICodingQuestionTag[];
      };
      if (data) onAddTags?.(data);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        slotProps={{ paper: { style: { width: "90%", maxWidth: "25rem" } } }}
      >
        <div className={styles["add-tag-container"]}>
          <header>Add Tag</header>
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  freeSolo
                  options={tags} // No predefined options, allowing custom inputs
                  getOptionLabel={(option) => (option as ITag).name}
                  getOptionKey={(option) => (option as ITag).id}
                  value={field.value || []}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option?.name} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags*"
                      variant="outlined"
                      fullWidth
                      error={!!errors.tags}
                      helperText={errors.tags?.message}
                    />
                  )}
                />
              )}
            />
            <Button
              type="submit"
              style={{ width: "6rem", alignSelf: "center" }}
              disabled={!isValid}
              variant="contained"
            >
              Add
            </Button>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default AddCodingQuestionTagForm;
