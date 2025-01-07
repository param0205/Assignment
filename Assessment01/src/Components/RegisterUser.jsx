import React from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// import { registerUser } from '../api/userApi';
import '../style/Registerform.css';

const RegisterUser = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: '', password: '', phone: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      // phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Required')
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        // await registerUser(values);
        setStatus('Registration successful!');
      } catch (err) {
        setStatus(err.response.data.error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  const handleLogin =()=>{
    navigate("/login")
  }

  return (
    <>
    <div className='flex justify-end h-10'>
      <button className='mr-5' onClick={handleLogin}>Login</button>
    </div>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 register-form">
      <div className="bg-black bg-opacity-50 p-8 rounded-lg w-full max-w-sm">
        <h3 className="text-2xl font-bold text-center mb-6 mt-10">Create your account and become the member of our community</h3>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username">Username</label>
            <input
              type="username"
              name="username"
              placeholder="Enter Name"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <p className="text-red-500 text-sm">{formik.errors.email}</p> : null}
          </div> 
         <div>
          <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <p className="text-red-500 text-sm">{formik.errors.email}</p> : null}
          </div>
          <div>
          <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? <p className="text-red-500 text-sm">{formik.errors.password}</p> : null}
          </div>
          {/* <div>
          <label htmlFor="number">Number</label>
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-5 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? <p className="text-red-500 text-sm">{formik.errors.phone}</p> : null}
          </div> */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-black text-white py-3 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
          {formik.status && <p className="text-green-500 text-sm mt-2">{formik.status}</p>}
        </form>
      </div>
    </div>
    </>

  );
};

export default RegisterUser;