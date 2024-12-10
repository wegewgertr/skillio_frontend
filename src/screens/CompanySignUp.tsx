import { object, ref, string } from "yup";
import { useEffect } from "react";
import { useFormik } from "formik";
import { authService } from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { courseService } from "../services/course.service";

interface ICompanySignUp { }

const schema = object().shape({
  company_name: string().required("Company name is required."),
  company_register: string().required("Registration number is required."),
  address: string().required("Address is required."),
  company_email: string().email("Enter a valid email.").required("Company email is required."),
  company_phone_number: string().required("Company phone number is required."),
  last_name: string().required("Last name is required."),
  first_name: string().required("First name is required."),
  email: string().email("Enter a valid email.").required("Email is required."),
  phone_number: string().required("Phone number is required."),
  password: string().min(8, "Password must be at least 8 characters.").required("Password is required."),
  password_confirmation: string()
    .oneOf([ref("password")], "Passwords must match.")
    .required("Password confirmation is required."),
  user_role: string()
});

export const CompanySignUp = (props: ICompanySignUp) => {
  const [signup, { isLoading: isUserLoading, isError: isUserError, isSuccess: isUserSuccess }] =
    authService.useSignupMutation();
  const [createCompany, { isLoading: isCompanyLoading, isError: isCompanyError, isSuccess: isCompanySuccess }] =
    courseService.useCreateCompanyMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserSuccess && isCompanySuccess) {
      navigate("/login");
    }
  }, [isUserSuccess, isCompanySuccess, navigate]);

  const formik = useFormik({
    initialValues: {
      company_name: "",
      company_register: "",
      address: "",
      company_email: "",
      company_phone_number: "",
      last_name: "",
      first_name: "",
      email: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
      user_role: "admin"
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const company = await createCompany({
          company: {
            company_name: values.company_name,
            company_register: values.company_register,
            address: values.address,
            company_email: values.company_email,
            company_phone_number: values.company_phone_number,
          },
        }).unwrap();
        console.log("Company created:", company);

        const user = await signup({
          user: {
            last_name: values.last_name,
            first_name: values.first_name,
            email: values.email,
            phone_number: values.phone_number,
            password: values.password,
            password_confirmation: values.password_confirmation,
            user_role: values.user_role,
            company_id: company.data.id, // Backend-аас хариу ирэхдээ company ID-г ашиглана
          },
        }).unwrap();
        console.log("User created:", user);
        navigate("/login");
      } catch (error) {
        console.error("Error signing up:", error);
      }
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-20 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Company Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-around ">
            <div className="flex flex-col">
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





            </div>
            <div className="flex flex-col">
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  id="company_name"
                  value={values.company_name}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${errors.company_name && touched.company_name ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Enter your company name"
                />
                {errors.company_name && touched.company_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="company_register" className="block text-sm font-medium text-gray-700">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="company_register"
                  id="company_register"
                  value={values.company_register}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${errors.company_register && touched.company_register ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Enter registration number"
                />
                {errors.company_register && touched.company_register && (
                  <p className="text-red-500 text-sm mt-1">{errors.company_register}</p>
                )}
              </div>

              <div>
                <label htmlFor="company_email" className="block text-sm font-medium text-gray-700">
                  Company Email
                </label>
                <input
                  type="email"
                  name="company_email"
                  id="company_email"
                  value={values.company_email}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${errors.company_email && touched.company_email ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Enter company email"
                />
                {errors.company_email && touched.company_email && (
                  <p className="text-red-500 text-sm mt-1">{errors.company_email}</p>
                )}
              </div>

              <div>
                <label htmlFor="company_phone_number" className="block text-sm font-medium text-gray-700">
                  Company Phone Number
                </label>
                <input
                  type="text"
                  name="company_phone_number"
                  id="company_phone_number"
                  value={values.company_phone_number}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${errors.company_phone_number && touched.company_phone_number ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Enter company phone number"
                />
                {errors.company_phone_number && touched.company_phone_number && (
                  <p className="text-red-500 text-sm mt-1">{errors.company_phone_number}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Company Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={values.address}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${errors.address && touched.address ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Enter company address"
                />
                {errors.address && touched.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>


              <div className="text-center mt-6">
                <span className="text-sm text-gray-600">Already have an account?</span>{" "}
                <Link
                  to="/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Log in
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isUserLoading || isCompanyLoading}
              >
                 {isUserLoading || isCompanyLoading ? "Signing up..." : "Sign Up"}
              </button>


            </div>

          </div>

          {(isUserError || isCompanyError) && (
          <p className="text-red-500 text-center mt-4">An error occurred. Please try again.</p>
        )}
        </form>
      </div>
    </div>
  );
};
