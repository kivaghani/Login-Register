import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Validation Schema
const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  phoneNo: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is required"),
  zipCode: Yup.string()
    .matches(/^[0-9]{5,6}$/, "Invalid ZIP code")
    .required("ZIP code is required"),
  country: Yup.string()
    .required("Country is required"),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date cannot be in the future")
    .required("Date of birth is required"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.data.message) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-green-600 flex items-center justify-center p-4 animate-gradient">
      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden transform transition-transform">
        <div className="md:w-1/2 bg-gradient-to-br from-teal-600 to-green-600 p-12 text-white flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute w-64 h-64 rounded-full bg-white/10 -top-32 -left-32 animate-pulse" />
            <div className="absolute w-96 h-96 rounded-full bg-white/5 -bottom-48 -right-48 animate-pulse delay-700" />
          </div>
          
          <div className="relative z-10 transform transition-transform duration-500 group-hover:translate-x-2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
              Kartik Vaghani
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Take your business to an advanced level with POS systems.
            </p>
          </div>
        </div>

        <div className="md:w-1/2 p-8 bg-white relative">
          <div className="max-w-md mx-auto space-y-8">
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                Sign Up
              </h2>
              <p className="text-gray-600">Please register a new account.</p>
            </div>

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                phoneNo: "",
                zipCode: "",
                country: "",
                dateOfBirth: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1 space-y-1">
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className={`w-full px-4 py-3 border ${
                          errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:border-teal-500`}
                      />
                      {errors.firstName && touched.firstName && (
                        <div className="text-red-500 text-sm">{errors.firstName}</div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className={`w-full px-4 py-3 border ${
                          errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:border-teal-500`}
                      />
                      {errors.lastName && touched.lastName && (
                        <div className="text-red-500 text-sm">{errors.lastName}</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className={`w-full px-4 py-3 border ${
                        errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:border-teal-500`}
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm">{errors.email}</div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className={`w-full px-4 py-3 border ${
                          errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:border-teal-500`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-600 transition-colors duration-200"
                      >
                        {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                      </button>
                    </div>
                    {errors.password && touched.password && (
                      <div className="text-red-500 text-sm">{errors.password}</div>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1 space-y-1">
                      <Field
                        type="tel"
                        name="phoneNo"
                        placeholder="Phone Number"
                        className={`w-full px-4 py-3 border ${
                          errors.phoneNo && touched.phoneNo ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:border-teal-500`}
                      />
                      {errors.phoneNo && touched.phoneNo && (
                        <div className="text-red-500 text-sm">{errors.phoneNo}</div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <Field
                        type="text"
                        name="zipCode"
                        placeholder="ZIP Code"
                        className={`w-full px-4 py-3 border ${
                          errors.zipCode && touched.zipCode ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:border-teal-500`}
                      />
                      {errors.zipCode && touched.zipCode && (
                        <div className="text-red-500 text-sm">{errors.zipCode}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1 space-y-1">
                      <Field
                        type="text"
                        name="country"
                        placeholder="Country"
                        className={`w-full px-4 py-3 border ${
                          errors.country && touched.country ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:border-teal-500`}
                      />
                      {errors.country && touched.country && (
                        <div className="text-red-500 text-sm">{errors.country}</div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <Field
                        type="date"
                        name="dateOfBirth"
                        className={`w-full px-4 py-3 border ${
                          errors.dateOfBirth && touched.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 hover:border-teal-500`}
                      />
                      {errors.dateOfBirth && touched.dateOfBirth && (
                        <div className="text-red-500 text-sm">{errors.dateOfBirth}</div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal-600 to-green-600 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>

                  <p className="text-center mt-6">
                    Already have an account?{" "}
                    <span
                      onClick={() => navigate("/login")}
                      className="text-teal-600 hover:text-green-600 cursor-pointer font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-green-600"
                    >
                      Sign In
                    </span>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;