import { Button, TextField } from "@mui/material";
import styles from "./Register.module.scss";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loginUser } from "../store/reducers/user";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (body: LoginFormData) => {
    const responseData = await dispatch(loginUser(body));
    if (responseData?.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className={`${styles["signup_container"]} poppins-regular`}>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <header>Sing In</header>

        <Controller
          name="email"
          control={control}
          render={(props) => {
            return (
              <TextField
                value={props.field.value}
                onChange={props.field.onChange}
                label="Email*"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            );
          }}
        />

        <Controller
          name="password"
          control={control}
          render={(props) => {
            return (
              <TextField
                value={props.field.value}
                onChange={props.field.onChange}
                label="Password*"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            );
          }}
        />
        <Button type="submit" variant="contained">
          Sing In
        </Button>
        <p>
          Don&apos;t have an account?{" "}
          <span onClick={() => navigate("/register")}>Create account</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
