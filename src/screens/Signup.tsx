import { number, object, ref, string } from "yup";
import { useEffect } from "react";
import { useFormik } from "formik";
import { authService } from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

interface ISignup { }

const schema = object().shape({
    last_name: string().required("Last name is required"),
    first_name: string().required("First name is required"),
    email: string().email("Invalid email address").required("Email is required"),
    phone_number: number().required("Phone number is required"),
    password: string().min(8, "Password must be at least 8 characters").required("Password is required"),
    password_confirmation: string()
        .oneOf([ref('password')], 'Passwords must match').required("Password confirmation is required"),
    user_role: string()
});

export const Signup = (props: ISignup) => {
    const [signup, { isLoading, isError, isSuccess, data }] = authService.useSignupMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/login');
        }
        if (isError) {
            console.log("error");
        }
    }, [isLoading, isError, isSuccess, data]);

    const formik = useFormik({
        initialValues: {
            last_name: "",
            first_name: "",
            email: "",
            phone_number: "",
            password: "",
            password_confirmation: "",
            user_role: "student",
        },
        validationSchema: schema,
        onSubmit: async (data) => {
            await signup({ user: data });
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={values.last_name}
                            onChange={handleChange}
                            className={`block w-full px-3 py-2 border ${errors.last_name && touched.last_name ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="Enter your last name"
                        />
                        {errors.last_name && touched.last_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            value={values.first_name}
                            onChange={handleChange}
                            className={`block w-full px-3 py-2 border ${errors.first_name && touched.first_name ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="Enter your first name"
                        />
                        {errors.first_name && touched.first_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            className={`block w-full px-3 py-2 border ${errors.email && touched.email ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="Enter your email"
                        />
                        {errors.email && touched.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone_number"
                            id="phone_number"
                            value={values.phone_number}
                            onChange={handleChange}
                            className={`block w-full px-3 py-2 border ${errors.phone_number && touched.phone_number ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="Enter your phone number"
                        />
                        {errors.phone_number && touched.phone_number && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            className={`block w-full px-3 py-2 border ${errors.password && touched.password ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="Enter your password"
                        />
                        {errors.password && touched.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            value={values.password_confirmation}
                            onChange={handleChange}
                            className={`block w-full px-3 py-2 border ${errors.password_confirmation && touched.password_confirmation
                                ? "border-red-500"
                                : "border-gray-300"
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="Confirm your password"
                        />
                        {errors.password_confirmation && touched.password_confirmation && (
                            <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
                        )}
                    </div>
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">Already have an account? </span>
                        <Link
                            to="/login"
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Log in
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </button>
                    {isError && <p className="text-red-500 text-center mt-2">An error occurred. Please try again.</p>}
                </form>
            </div>
        </div>
    );
};
