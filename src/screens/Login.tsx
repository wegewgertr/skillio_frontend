import { useFormik } from "formik";
import { object, string } from "yup";
import { authService } from "../services/auth.service";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ILogin { }

const schema = object().shape({
    email: string().email("Invalid email address").required("Email is required"),
    password: string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

export const Login = (props: ILogin) => {
    const [login, { isLoading, isError, isSuccess, data }] = authService.useLoginMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            console.log(data);
            navigate('/')

        }
        if (isError) {
            console.log("error");
        }
    }, [isLoading, isError, isSuccess, data]);

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async (data) => {
            await login({ user: data });
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            className={`block w-full px-3 py-2 border ${errors.email && touched.email ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            type="email"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                        {errors.email && touched.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            className={`block w-full px-3 py-2 border ${errors.password && touched.password ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            type="password"
                            name="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                        {errors.password && touched.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                    {isError && <p className="text-red-500 text-center mt-2">An error occurred. Please try again.</p>}
                </form>
            </div >
        </div >
    );
};
