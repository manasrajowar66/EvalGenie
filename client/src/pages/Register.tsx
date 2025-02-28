import { Button, TextField } from "@mui/material";
import styles from "./Register.module.scss";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { registerUser } from "../store/reducers/user";

const validationSchema = Yup.object({
  full_name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export interface RegisterFormData {
  full_name: string;
  email: string;
  password: string;
}

const Register = () => {
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

  const onSubmit = async (body: RegisterFormData) => {
    const responseData = await dispatch(registerUser(body));
    if(responseData?.meta.requestStatus === "fulfilled"){
        navigate("/login");
    }
  };

  return (
    <div className={`${styles["signup_container"]} poppins-regular`}>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <header>Create new account</header>
        <Controller
          name="full_name"
          control={control}
          render={(props) => {
            return (
              <TextField
                value={props.field.value}
                onChange={props.field.onChange}
                label="Full Name*"
                type="text"
                variant="outlined"
                fullWidth
                error={!!errors.full_name}
                helperText={errors.full_name ? errors.full_name.message : ""}
              />
            );
          }}
        />

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
          Create account
        </Button>
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sing in</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
