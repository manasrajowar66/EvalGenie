import { Button } from "@mui/material";
import { Plus } from "lucide-react";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import NewSectionForm from "./NewSectionForm";
import { SectionFormValues } from "../../form-schema/section-schema";

const AddQuestions: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [openSectionForm, setOpenSectionForm] = React.useState(false);

  const questionArray = useFieldArray({
    control,
    name: "coding_questions",
  });

  const onAddSection = (data: SectionFormValues) => {
    questionArray.append(data);
    setOpenSectionForm(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <Button variant="contained" onClick={() => setOpenSectionForm(true)}>
            <Plus /> Add New Section
          </Button>
        </div>
      </div>
      {openSectionForm && (
        <NewSectionForm
          onClose={() => setOpenSectionForm(false)}
          onAdd={onAddSection}
        />
      )}
    </>
  );
};

export default AddQuestions;
