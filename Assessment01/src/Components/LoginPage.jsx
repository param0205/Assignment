import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../style/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  // Auto-login if session exists
  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (session) {
      navigate("/main"); // Redirect to main interface if user is logged in
    }
  }, [navigate]);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Username must be at least 4 characters long")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Initial form values
  const initialValues = {
    username: "",
    password: "",
  };

  // Submit handler for the form
  const onSubmit = (values) => {
    // Store session in localStorage upon successful login
    localStorage.setItem("userSession", JSON.stringify(values));
    navigate("/main"); // Redirect to the main interface
  };

  const handleCreate = (values) => {
    navigate("/Register"); // Redirect to the Create Account interface
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                className="form-input"
                placeholder="Enter Name"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <button type="submit" className="login-btn mb-5">
              Login
            </button>
          </Form>
        </Formik>
        {/* <div>
          <p className="text-1xl">Not a Member?</p>
          <button
            type="Create Account"
            className="Create-btn"
            onClick={handleCreate}
          >
            Create Account
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
