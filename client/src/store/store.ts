import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import globalLoaderReducer from "./reducers/globalLoader";
import recruitmentDriveReducer from "./reducers/recruitment-drive";
import codingQuestionReducer from "./reducers/coding-question";
import tagReducer from "./reducers/tag";

const store = configureStore({
  reducer: {
    user: userReducer,
    globalLoader: globalLoaderReducer,
    recruitmentDrive: recruitmentDriveReducer,
    codingQuestion: codingQuestionReducer,
    tag: tagReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
