import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function SignUpForm({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setErrors([]);
  //   setIsLoading(true);
  //   fetch("/api/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       password,
  //       password_confirmation: passwordConfirmation,
  //       image_url: imageUrl,
  //       role,
  //     }),
  //   }).then((r) => {
  //     setIsLoading(false);
  //     if (r.ok) {
  //       r.json().then((user) => onLogin(user));
  //     } else {
  //       r.json().then((err) => setErrors(err.errors));
  //     }
  //   });
  // }
  
  // Appliying Formik

  // const formSchema = yup.object().shape({
  //   email: yup.string().email("Invalid email").required("Must enter email"),
  //   name: yup.string().required("Must enter a name").max(15),
  //   password: yup.string().min(5, 'Too short').max(20, 'To Long!').required('Required'),
  //   password_confirmation: yup.string().min(5, 'Too short').max(20, 'To Long!').required('Required')
  // });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      image_url: "",
      role: "",
    },
    // validationSchema: formSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => onLogin(user));
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    },
  });


  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            autoComplete="off"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        {formik.errors.name?<p style={{ color: "red" }}> {formik.errors.name}</p>:null}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            autoComplete="off"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {formik.errors.email?<p style={{ color: "red" }}> {formik.errors.email}</p>:null}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            onChange={formik.handleChange}
            value={formik.values.password}
            autoComplete="current-password"
          />
        </div>
        {formik.errors.password?<p style={{ color: "red" }}> {formik.errors.password}</p>:null}
        <div className="mb-4">
          <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
            Password Confirmation
          </label>
          <input
            type="password"
            id="password_confirmation"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            // value={passwordConfirmation}
            // onChange={(e) => setPasswordConfirmation(e.target.value)}
            onChange={formik.handleChange}
            value={formik.values.password_confirmation}
            autoComplete="current-password"
          />
        </div>
        {formik.errors.password_confirmation?<p style={{ color: "red" }}> {formik.errors.password_confirmation}</p>:null}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            // value={imageUrl}
            // onChange={(e) => setImageUrl(e.target.value)}
            onChange={formik.handleChange}
            value={formik.values.image_url}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <textarea
            rows="3"
            id="bio"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            // value={role}
            // onChange={(e) => setRole(e.target.value)}
            onChange={formik.handleChange}
            value={formik.values.role}
          />
        </div>
        
        <div className="mb-4">
        
        {console.log()}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </div>

        {/* {formik.errors.length > 0 && (
          <div className="mb-4">
            {errors.map((err, index) => (
              <div key={index} className="text-red-600 text-sm">{err}</div>
            ))}
          </div>
        )} */}
      </form>
    </div>
  );
}

export default SignUpForm;

