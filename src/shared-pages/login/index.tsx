"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import apiPost from "@/server-api/apifunctions/apipost";
import { loginValidationSchema } from "@/utils/validation-schema";
import { loginFormProps } from "@/types/auth/auth-types";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "@/redux/slices/user-slice";
import { getUser } from "@/storage";

// Define the validation schema

const Login = ({ hostName }: { hostName: string | null }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const initialValues: loginFormProps = {
    email: "",
    password: "",
  };

  const handleLogin = async (userData: loginFormProps) => {
    setLoading(true);
    console.log(userData);

    try {
      const payload = {
        username: userData.email,
        password: userData.password,
      };

      const postAPIValues = {
        apiEndpoint: apiEndpoints.login,
        ...payload,
      };
      const response = await apiPost.postAPI(postAPIValues);

      if (response.token) {
        const user = {
          displayName: response.name,
          token: response.token,
          email: response.email,
          user_nicename: response.user_nicename,
          phone: response.phone,
          isVerified: response.is_verified,
        };
        dispatch(setUser(user)); // Dispatch the setUser action to store user data
     
      console.log("Login successful:", response);

    }
    } catch (error) {
      console.error("Login failed:", error ? error : error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="lx-faq bg-white py-16 w-full px-0">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl mx-auto border border-gray-300 text-black">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Login to Your Account
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Please enter your email and password to login.
          </p>

          <Formik
            initialValues={initialValues}
            // validationSchema={loginValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleLogin(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-gray-800 font-semibold">
                    Email *
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-800 font-semibold">
                    Password *
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#b88c4f] text-white py-3 rounded-lg font-semibold hover:bg-[#a07d44] transition"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <a
                href="register.html"
                className="text-[#b88c4f] hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
