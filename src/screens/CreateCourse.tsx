import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { courseService } from "../services/course.service"; // Replace with your service path
import { date, number, object, string } from "yup";

interface ICreateCourse {}

const schema = object().shape({
  course_name: string().required("Course name is required."),
  description: string(),
  duration: string().required("Course duration is required."),
  type: string().required("Course type is required."),
  registration_start_date: date().required("Registration start date is required."),
  registration_due_date: date().required("Registration due date is required."),
  start_date: date().required("Start date is required."),
  company_id: number().required("Company ID is required."),
});

export const CreateCourse: React.FC<ICreateCourse> = () => {
  const [createCourse, { isLoading, isError, isSuccess }] =
    courseService.useCreateCourseMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      course_name: "",
      description: "",
      duration: "",
      type: "",
      registration_start_date: "",
      registration_due_date: "",
      start_date: "",
      company_id: 0,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const course = await createCourse({
          course_name: values.course_name,
          description: values.description,
          duration: values.duration,
          type: values.type,
          registration_start_date: values.registration_start_date,
          registration_due_date: values.registration_due_date,
          start_date: values.start_date,
          company_id: values.company_id,
        }).unwrap();
        console.log("Course created:", course);
        navigate("/courses");
      } catch (error) {
        console.error("Error creating course:", error);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Create Course
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Name */}
          <div>
            <label
              htmlFor="course_name"
              className="block text-sm font-medium text-gray-700"
            >
              Course Name
            </label>
            <input
              type="text"
              name="course_name"
              id="course_name"
              value={values.course_name}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border ${
                errors.course_name && touched.course_name
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Enter course name"
            />
            {errors.course_name && touched.course_name && (
              <p className="text-red-500 text-sm mt-1">{errors.course_name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={values.description}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter course description"
            />
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration
            </label>
            <input
              type="text"
              name="duration"
              id="duration"
              value={values.duration}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border ${
                errors.duration && touched.duration
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Enter course duration"
            />
            {errors.duration && touched.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
            )}
          </div>

          {/* Course Type */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <input
              type="text"
              name="type"
              id="type"
              value={values.type}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border ${
                errors.type && touched.type
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Enter course type"
            />
            {errors.type && touched.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </div>

          {/* Registration Start Date */}
          <div>
            <label
              htmlFor="registration_start_date"
              className="block text-sm font-medium text-gray-700"
            >
              Registration Start Date
            </label>
            <input
              type="date"
              name="registration_start_date"
              id="registration_start_date"
              value={values.registration_start_date}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border ${
                errors.registration_start_date && touched.registration_start_date
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.registration_start_date && touched.registration_start_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.registration_start_date}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Course"}
          </button>

          {isError && (
            <p className="text-red-500 text-center mt-4">
              An error occurred. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
