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
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  createRecruitmentDrive,
  editRecruitmentDrive,
  getRecruitmentDriveById,
} from "../store/reducers/recruitment-drive";
import { DriveStatus, ReverseDriveStatus } from "../types/common-enums";
import { IRecruitmentDrive } from "../types/common-types";

const recruitmentDriveSchema = Yup.object({
  name: Yup.string().trim().required("Drive name is required"),
  description: Yup.string().trim().required("Description is required"),
  institute_name: Yup.string().trim().required("Institute name is required"),
  session: Yup.string()
    .optional()
    .trim()
    .matches(/^\d{4} - \d{4}$/, "Session must be in format YYYY - YYYY"),
  status: Yup.mixed<DriveStatus>()
    .oneOf(Object.values(DriveStatus), "Invalid drive status")
    .required("Status is required"),
});

// Infer the TypeScript type
export type RecruitmentDriveFormValues = Yup.InferType<
  typeof recruitmentDriveSchema
>;

const RecruitmentDriveForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(recruitmentDriveSchema),
    defaultValues: {
      name: "",
      description: "",
      institute_name: "",
      session: "",
      status: DriveStatus.IN_PROGRESS,
    },
  });

  const [recruitmentDriveId, setRecruitmentDriveId] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmitHandler = async (body: RecruitmentDriveFormValues) => {
    if (recruitmentDriveId) {
      const responseData = await dispatch(
        editRecruitmentDrive({
          rd_id: recruitmentDriveId,
          data: body,
        })
      );
      if (responseData && responseData.meta.requestStatus === "fulfilled") {
        navigate("/recruiter/recruitment-drive");
      }
    } else {
      const responseData = await dispatch(createRecruitmentDrive(body));
      if (responseData && responseData.meta.requestStatus === "fulfilled") {
        navigate("/recruiter/recruitment-drive");
      }
    }
  };

  const getRecruitmentDriveHandler = useCallback(
    async (id: string) => {
      const responseData = await dispatch(getRecruitmentDriveById({ id }));

      if (
        responseData &&
        responseData.meta.requestStatus === "fulfilled" &&
        responseData.payload
      ) {
        const { data } = responseData.payload as {
          data: IRecruitmentDrive;
        };

        if (data) {
          reset({
            name: data.name,
            description: data.description,
            institute_name: data.institute_name,
            session: data.session,
            status: data.status as DriveStatus,
          });
        }
      } else {
        navigate("/recruiter/recruitment-drive");
      }
    },
    [dispatch, navigate, reset]
  );

  useEffect(() => {
    const { id } = params;
    if (id) {
      getRecruitmentDriveHandler(id);
      setRecruitmentDriveId(id);
    }
  }, [params, getRecruitmentDriveHandler]);

  return (
    <div className="flex flex-col w-full h-full px-4 bg-gray-100">
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography>EvalGenie</Typography>
          <Link to="/recruiter/recruitment-drive" color="inherit">
            Recruitment Drives
          </Link>
          <Typography sx={{ color: "text.primary" }}>
            {recruitmentDriveId ? "Edit" : "Create"} Recruitment Drive
          </Typography>
        </Breadcrumbs>
      </div>
      <form
        className="flex flex-col gap-4 mt-[2rem]"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Controller
          name="name"
          control={control}
          render={(props) => {
            return (
              <TextField
                value={props.field.value}
                onChange={(e) => {
                  props.field.onChange(e);
                  console.log(errors);
                }}
                label="Name*"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                slotProps={{ htmlInput: { maxLength: 30 } }}
              />
            );
          }}
        />
        <Controller
          name="description"
          control={control}
          render={(props) => {
            return (
              <TextField
                value={props.field.value}
                onChange={props.field.onChange}
                label="Description*"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description.message : ""
                }
                slotProps={{ htmlInput: { maxLength: 250 } }}
              />
            );
          }}
        />
        <Controller
          name="institute_name"
          control={control}
          render={(props) => {
            return (
              <TextField
                value={props.field.value}
                onChange={props.field.onChange}
                label="Institute Name*"
                variant="outlined"
                fullWidth
                error={!!errors.institute_name}
                helperText={
                  errors.institute_name ? errors.institute_name.message : ""
                }
                slotProps={{ htmlInput: { maxLength: 50 } }}
              />
            );
          }}
        />
        <Controller
          name="session"
          control={control}
          render={(props) => {
            return (
              <TextField
                value={props.field.value}
                onChange={props.field.onChange}
                label="Session"
                variant="outlined"
                fullWidth
                error={!!errors.session}
                helperText={errors.session ? errors.session.message : ""}
                slotProps={{ htmlInput: { maxLength: 50 } }}
              />
            );
          }}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth variant="outlined" error={!!errors.status}>
              <InputLabel id="status-label">Status*</InputLabel>
              <Select
                {...field}
                labelId="status-label"
                value={field.value || ""}
                label="Status*"
                onChange={(event) => field.onChange(event.target.value)}
                renderValue={(selected) =>
                  selected ? ReverseDriveStatus[selected] : ""
                }
              >
                {Object.values(DriveStatus).map((level) => (
                  <MenuItem key={level} value={level}>
                    {ReverseDriveStatus[level]}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.status?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Button
          type="submit"
          style={{ width: "6rem", alignSelf: "center" }}
          variant="contained"
        >
          {recruitmentDriveId ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default RecruitmentDriveForm;
