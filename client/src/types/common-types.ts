export interface IPagination {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages?: number;
};

export type IRecruitmentDrive = {
  id: string;
  name: string;
  description: string;
  institute_name: string;
  session: string;
  status: "inprogress" | "completed";
  created_by: string;
  createdAt: string;
  updatedAt: string;
};

export enum DifficultyLevelEnum {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

export type ICodingQuestion = {
  id: string;
  title: string;
  description: string;
  input_format: string;
  output_format: string;
  time_limit_seconds: number;
  difficulty_level: DifficultyLevelEnum;
  constraints: string;
  tags: ICodingQuestionTag[];
  testCases?: ICodingTestCase[];
  baseFunctions?: IBaseFunction[];
  created_by: string;
  createdAt: string;
  updatedAt: string;
};

export type IBaseFunction = {
  id: string;
  question_id: string;
  language: string;
  base: string;
}

export type ICodingTestCase = {
  id: string;
  input: string;
  expected_output: string;
  is_sample: boolean;
}

export type ICodingQuestionFormData = {
  title: string;
  description: string;
  input_format: string;
  output_format: string;
  time_limit_milliseconds: number;
  difficulty_level: DifficultyLevelEnum;
  constraints: string;
  tags: ITag[] | string[];
}

export type ITag = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}


export type ICodingQuestionTag = {
  id: string;
  name: string;
  cqt_id: string;
}

export type ISubmission = {
  stdout: string;
  time: string;
  memory: number;
  stderr: string | null;
  token: string;
  compile_output: string | null;
  message: string | null;
  status: {
      id: number;
      description: string;
  };
  stdin: string | null;
  expected_output: string | null;
  is_sample: boolean;
};

export type ITest = {
  id: string;
  name: string;
  description: string;
  date: Date;
  duration: number;
  end_time: Date;
  recruitment_drive_id: string;
  is_active: boolean;
  is_allow_registration: boolean;
}

export type Role = "admin" | "student";
