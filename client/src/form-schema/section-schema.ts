import * as Yup from "yup";

export const SectionSchema = Yup.object().shape({
  section_name: Yup.string().trim().required("Section name is required"),
  question_list: Yup.array()
    .of(Yup.object())
    .when("$validateQuestionList", {
      is: true,
      then: (schema) => schema.min(1, "Must have at least one question"),
      otherwise: (schema) => schema.notRequired(),
    }),
  is_negative_marks: Yup.boolean().required(
    "Negative marking status is required"
  ),
  negative_marks: Yup.number()
    .nullable()
    .min(0, "Negative marks cannot be negative")
    .when("is_negative_marks", {
      is: true,
      then: (schema) => schema.required("Negative marks are required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  marks_per_question: Yup.number()
    .min(0, "Marks per question must be at least 0")
    .required("Marks per question are required"),
});

export type SectionFormValues = Yup.InferType<typeof SectionSchema>;
