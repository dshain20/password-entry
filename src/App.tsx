import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormInput } from "./components/FormInput";
import { FormButton } from "./components/FormButton";
import { Banner } from "./components/Banner";

import "./App.css";

const validationSchema = Yup.object().shape({
  password: Yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase character")
    .matches(/[a-z]/, "Password must contain at least one lowercase character")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

type FormValues = {
  password: string;
  confirmPassword: string;
};

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const { errors } = methods.formState;

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      methods.reset(JSON.parse(savedData));
    }
  }, [methods]);

  const handleRegistration = (data: FormValues) => {
    localStorage.setItem("userData", JSON.stringify(data));
    setIsSubmitted(true);
  };

  const handlePasswordBlur = () => {
    methods.trigger("confirmPassword");
  };

  const getErrorMessage = (property: keyof FormValues) => {
    return errors?.[property] ? errors[property].message : "";
  };

  return (
    <div className="App">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Password Entry Library
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <FormProvider {...methods}>
            <form
              className="space-y-6"
              onSubmit={methods.handleSubmit(handleRegistration)}
            >
              <FormInput
                name="password"
                label="Password"
                onBlur={handlePasswordBlur}
                error={getErrorMessage("password")}
              />
              <FormInput
                name="confirmPassword"
                label="Confirm Password"
                error={getErrorMessage("confirmPassword")}
              />

              <FormButton label="Submit" />
            </form>

            {isSubmitted && (
              <Banner label="Successfully registered!" className="mt-4" />
            )}
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
