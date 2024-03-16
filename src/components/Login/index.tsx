import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { service } from "../../service/api";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface dataTypes {
  email: string;
  password: string;
}
const data: dataTypes = {
  email: "",
  password: "",
};
const dataSchema = yup.object().shape({
  password: yup.string().required("Password is required*"),
  email: yup
    .string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required*"),
});

export default function Login() {
  const { loginUser } = service;
  const formRef: any = useRef();
  const queryClient: any = new QueryClient();
  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess(data, variables, context) {
      if (typeof data == "string") {
        toast.error(data);
      } else {
        toast.success(data?.message);
        if (data?.data?.user?.role == "admin") {
          window.location.replace("http://localhost:3000");
          queryClient.invalidateQueries(["login"]);
        } else {
          window.location.replace("http://localhost:3000/jobs");
          queryClient.invalidateQueries(["login"]);
        }
      }
    },
  });

  const handelLogin = async (values: any) => {
    await mutate(values);
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Enter") {
        if (formRef.current) {
          formRef?.current.handleSubmit();
        }
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={data}
        validationSchema={dataSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          handelLogin(values);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          resetForm,
        }) => (
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto w-[100px] h-[100px] "
                src="https://cdn-icons-png.freepik.com/512/3237/3237472.png"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-700 text-[14px]">{errors.email}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-700 text-[14px]">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <div
                    onClick={(e) => {
                      handleSubmit();
                    }}
                    className="flex cursor-pointer w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </div>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <a
                  href="#"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Start a 14 day free trial
                </a>
              </p>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}
