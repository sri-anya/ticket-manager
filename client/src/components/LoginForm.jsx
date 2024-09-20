
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function LoginForm({ onLogin }) {
    
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter email"),
        password: yup.string().min(5, 'Too short').max(20, 'To Long!').required('Required')
      });
    
    const formik = useFormik({
        initialValues: {
          email: "",
          password: ""
        },
        validationSchema: formSchema,
    onSubmit: (values) => {
          fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then(
            (r) => {
                setIsLoading(false);
                if (r.ok) {
                    r.json().then((user) => onLogin(user));
                }
              }
          )
        },
      });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <form className="w-full max-w-sm bg-white shadow-lg rounded-lg p-8" onSubmit={formik.handleSubmit}>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Login</h3>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        
                        autoComplete="email"
                    />
                </div>
                {formik.errors.email?<p style={{ color: "red" }}> {formik.errors.email}</p>:null}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        
                    />
                </div>
                {formik.errors.password?<p style={{ color: "red" }}> {formik.errors.password}</p>:null}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {isLoading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
