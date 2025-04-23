// steps/TestDetailsStep.tsx
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const TestDetails: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col gap-4">
        <Controller
          name="name"
          control={control}
          render={(props) => {
            return (
              <TextField
                value={props.field.value}
                onChange={props.field.onChange}
                label="Name*"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? (errors.name.message as string) : ""}
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
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                error={!!errors.description}
                helperText={
                  errors.description
                    ? (errors.description.message as string)
                    : ""
                }
                slotProps={{ htmlInput: { maxLength: 250 } }}
              />
            );
          }}
        />
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1">
            <Controller
              name="duration"
              control={control}
              render={(props) => {
                return (
                  <TextField
                    value={props.field.value}
                    onChange={(e) => {
                      props.field.onChange(e);
                      console.log(errors);
                    }}
                    label="Test Duration*"
                    variant="outlined"
                    type="number"
                    fullWidth
                    error={!!errors.duration}
                    helperText={
                      errors.duration ? (errors.duration.message as string) : ""
                    }
                    slotProps={{ htmlInput: { maxLength: 30 } }}
                  />
                );
              }}
            />
          </div>
          <div className="col-span-1">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  label="Start Date & Time*"
                  value={dayjs(field.value)}
                  onChange={(newValue) => field.onChange(newValue?.toDate())}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.date,
                      helperText: errors.date?.message as string,
                    },
                  }}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <Controller
              name="end_date"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  label="End Date & Time*"
                  value={dayjs(field.value)}
                  onChange={(newValue) => field.onChange(newValue?.toDate())}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.end_date,
                      helperText: errors.end_date?.message as string,
                    },
                  }}
                />
              )}
            />
          </div>
        </div>
        {/* Other fields like description, duration, date, end_date */}
      </div>
    </LocalizationProvider>
  );
};

export default TestDetails;
