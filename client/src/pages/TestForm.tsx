import React, { useCallback, useEffect, useState } from "react";
import { IRecruitmentDrive } from "../types/common-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { getRecruitmentDriveById } from "../store/reducers/recruitment-drive";
import {
  Breadcrumbs,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import TestDetails from "../components/test-form/TestDetails";
import AddQuestions from "../components/test-form/AddQuestions";
import { SectionSchema } from "../form-schema/section-schema";

const testSchema = Yup.object({
  name: Yup.string().trim().required("Test name is required"),
  description: Yup.string().trim().optional(),
  date: Yup.date()
    .required("Start date is required")
    .typeError("Please enter a valid start date"),
  end_date: Yup.date()
    .required("End date is required")
    .typeError("Please enter a valid end date")
    .min(Yup.ref("date"), "End date must be after the start date"),
  duration: Yup.number()
    .required("Duration is required")
    .typeError("Duration must be a number")
    .positive("Duration must be positive")
    .integer("Duration must be an integer")
    .test(
      "is-within-range",
      "Duration must be within the start and end date range",
      function (value) {
        const { date, end_date } = this.parent;
        if (!value || !date || !end_date) return true; // Let required/typeError handle other issues

        const start = new Date(date).getTime();
        const end = new Date(end_date).getTime();
        const diffInMinutes = (end - start) / (1000 * 60); // milliseconds to minutes

        return value <= diffInMinutes;
      }
    ),
  is_active: Yup.boolean().required("Active status is required"),
  is_allow_registration: Yup.boolean().required(
    "Allow registration is required"
  ),
  coding_questions: Yup.array()
    .of(SectionSchema)
    .min(1, "Please add at least one section with questions")
    .required("Questions are required"),
});

const steps = ["Test Details", "Add Questions", "Review"];

// Infer the TypeScript type
export type TestFormValues = Yup.InferType<typeof testSchema>;

const TestForm: React.FC = () => {
  const [driveDetails, setDriveDetails] =
    React.useState<IRecruitmentDrive | null>(null);

  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm({
    resolver: yupResolver(testSchema),
    defaultValues: {
      name: "",
      description: "",
      date: new Date(), // current date-time as default start
      end_date: new Date(new Date().getTime() + 60 * 60 * 1000), // +1 hour from now
      duration: 60, // default 60 minutes
      is_active: true,
      is_allow_registration: false,
    },
  });

  const fetchDriveDetails = useCallback(async () => {
    const { id } = params;
    const response = await dispatch(
      getRecruitmentDriveById({ id: id as string })
    );
    if (response && response.meta.requestStatus === "fulfilled") {
      const { data } = response.payload as {
        data: IRecruitmentDrive;
      };
      if (data) {
        setDriveDetails(data);
      }
    } else {
      navigate(`/recruiter/recruitment-drive`, { replace: true });
    }
  }, [dispatch, params, navigate]);

  useEffect(() => {
    fetchDriveDetails();
  }, [fetchDriveDetails]);

  const next = async () => {
    let valid = false;

    if (activeStep === 0) {
      valid = await methods.trigger([
        "name",
        "description",
        "date",
        "end_date",
        "duration",
        "is_active",
        "is_allow_registration",
      ]);
    } else if (activeStep === 1) {
      valid = await methods.trigger("coding_questions");
    }

    if (valid) setActiveStep((prev) => prev + 1);
  };

  const back = () => setActiveStep((prev) => prev - 1);

  const onSubmitHandler = async (data: TestFormValues) => {
    console.log("Final Submission", data);
    // API call here
  };

  return (
    <>
      {driveDetails && (
        <div className="flex flex-col">
          <div role="presentation" className="mb-6">
            <Breadcrumbs aria-label="breadcrumb">
              <Typography>EvalGenie</Typography>
              <Link to="/recruiter/recruitment-drive" color="inherit">
                Recruitment Drives
              </Link>
              <Link
                to={`/recruiter/recruitment-drive/${driveDetails.id}/tests`}
                color="inherit"
              >
                {driveDetails.name}
              </Link>
              <Typography sx={{ color: "text.primary" }}>
                Create Test
              </Typography>
            </Breadcrumbs>
          </div>
          <div className="border border-gray-300 rounded-xl bg-white p-6 shadow-md">
            <FormProvider {...methods}>
              <Stepper activeStep={activeStep} className="mb-6 px-[3rem]">
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <form
                className="flex flex-col gap-4"
                autoComplete="off"
                onSubmit={methods.handleSubmit(onSubmitHandler)}
              >
                {activeStep === 0 && <TestDetails />}
                {activeStep === 1 && <AddQuestions />}

                <div className="flex justify-between mt-4">
                  {activeStep > 0 && (
                    <Button variant="outlined" onClick={back}>
                      Back
                    </Button>
                  )}
                  {activeStep < steps.length - 1 ? (
                    <Button variant="contained" onClick={next}>
                      Next
                    </Button>
                  ) : (
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default TestForm;
