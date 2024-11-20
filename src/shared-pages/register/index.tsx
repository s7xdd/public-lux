"use client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import apiPost from "@/server-api/apifunctions/apipost";
import { validationSchema } from "@/utils/validation-schema";
import { registerFormProps } from "@/types/auth/auth-types";

const Register = ({ hostName }: { hostName: string | null }) => {
  const [loading, setLoading] = useState(false);

  const initialValues: registerFormProps = {
    first_name: "",
    email: "",
    billing: {
      country: "",
      phone: "",
    },
  };

    const testdata = {
      email: "john.doe@example.com",
      first_name: "John",
      billing: {
        country: "US",
        phone: "(555) 555-5555",
      },
    };

  const handleRegister = async (userData: registerFormProps) => {
    const postAPIValues = {
      apiEndpoint: apiEndpoints.register,
      hostName: window.location.hostname,
      ...testdata,
    };
    try {
      const response = await apiPost.postAPI(postAPIValues);
      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="lx-faq bg-white py-16 w-full px-0">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl mx-auto border border-gray-300 text-black">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Signup to Enter
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            New to our platform? Complete the details below.
            <br />
            Already a member?{" "}
            <a href="login.html" className="text-[#b88c4f] hover:underline">
              Please log in
            </a>
          </p>
          <p className="text-gray-500 mb-6 text-center">
            While signing up, your password will be automatically set as your
            phone number for your next login.
          </p>

          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={(userData, { setSubmitting }) => {
              handleRegister(userData);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* <div className="mb-4 flex items-center justify-center space-x-6">
                  <label className="flex items-center space-x-2">
                    <Field
                      type="radio"
                      name="userType"
                      value="person"
                      className="text-[#b88c4f] focus:ring-[#b88c4f]"
                    />
                    <span className="text-black">Person</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Field
                      type="radio"
                      name="userType"
                      value="company"
                      className="text-[#b88c4f] focus:ring-[#b88c4f]"
                    />
                    <span className="text-black">Company</span>
                  </label>
                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-800 font-semibold">
                      Name *
                    </label>
                    <Field
                      type="text"
                      name="first_name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 font-semibold">
                      Phone Number *
                    </label>
                    <Field
                      type="tel"
                      name="billing.phone" // Adjusted for nested structure
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                      placeholder="Enter your phone number"
                    />
                    <ErrorMessage
                      name="billing.phone"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
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
                  <div>
                    <label className="block text-gray-800 font-semibold">
                      Select Country
                    </label>
                    <Field
                      as="select"
                      name="billing.country" // Adjusted for nested structure
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
                    >
                      <option value="">Select your country</option>
                      <option value="US">UK</option>
                      <option value="b">b</option>
                      <option value="c">c</option>
                      {/* Add more options as needed */}
                    </Field>
                    <ErrorMessage
                      name="billing.country"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#b88c4f] text-white py-3 rounded-lg font-semibold hover:bg-[#a07d44] transition"
                >
                  {isSubmitting ? "Signing up..." : "Signup"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              You have an account?{" "}
              <a href="login.html" className="text-[#b88c4f] hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
