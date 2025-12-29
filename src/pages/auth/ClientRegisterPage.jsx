import React, { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";

// --- Validation Schema ---
const clientSchema = z.object({
  nic: z.string().min(1, "National ID is required").min(5, "NIC must be at least 5 characters"),
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  telephone: z.string().min(10, "Invalid telephone number"),
  address: z.string().min(10, "Please provide a complete address"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// --- Reusable Components ---
const Input = React.forwardRef(({ type = "text", className = "", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition duration-150 ${className}`}
    {...props}
  />
));
Input.displayName = "Input";

const CustomFormField = ({ label, children, fieldState }) => {
  const { error } = fieldState;
  return (
    <div className="space-y-2">
      <label className={`text-sm font-medium ${error ? "text-red-600" : "text-gray-700"}`}>{label}</label>
      {children}
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-4 py-2 font-medium shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

// --- Client Registration Page ---
const ClientRegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const form = useForm({
    resolver: zodResolver(clientSchema),
    mode: "onChange",
    defaultValues: {
      nic: "",
      name: "",
      telephone: "",
      address: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...clientData } = data;

    setToast({ visible: true, message: "Submitting registration..." });

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", clientData, {
        headers: { "Content-Type": "application/json" },
      });

      setToast({ visible: true, message: res.data.message || "Registration successful!" });

      setTimeout(() => setToast({ visible: false, message: "" }), 3000);
      form.reset();
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed. Try again.";
      setToast({ visible: true, message });
      setTimeout(() => setToast({ visible: false, message: "" }), 5000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Client Registration</h1>

        {toast.visible && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 flex items-center">
            <FaCheckCircle className="mr-2" /> {toast.message}
          </div>
        )}

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="nic"
              control={form.control}
              render={({ field, fieldState }) => (
                <CustomFormField label="National ID / Document Number *" fieldState={fieldState}>
                  <Input {...field} placeholder="Enter your NIC number" />
                </CustomFormField>
              )}
            />

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <CustomFormField label="Full Name *" fieldState={fieldState}>
                  <Input {...field} placeholder="Enter your full name" />
                </CustomFormField>
              )}
            />

            <Controller
              name="telephone"
              control={form.control}
              render={({ field, fieldState }) => (
                <CustomFormField label="Telephone *" fieldState={fieldState}>
                  <Input type="tel" {...field} placeholder="+94 712 345 678" />
                </CustomFormField>
              )}
            />

            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <CustomFormField label="Full Address *" fieldState={fieldState}>
                  <Input {...field} placeholder="Enter your address" />
                </CustomFormField>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <CustomFormField label="Email Address *" fieldState={fieldState}>
                  <Input type="email" {...field} placeholder="your.email@example.com" />
                </CustomFormField>
              )}
            />

            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <CustomFormField label="Username *" fieldState={fieldState}>
                  <Input {...field} placeholder="Choose a username" />
                </CustomFormField>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <CustomFormField label="Password *" fieldState={fieldState}>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} {...field} placeholder="Create password" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </CustomFormField>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <CustomFormField label="Confirm Password *" fieldState={fieldState}>
                  <div className="relative">
                    <Input type={showConfirmPassword ? "text" : "password"} {...field} placeholder="Confirm password" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </CustomFormField>
              )}
            />

            <div className="md:col-span-2">
              <Button type="submit" disabled={!form.formState.isValid} className="w-full flex justify-center items-center gap-2">
                <FaCheckCircle />
                Register
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ClientRegisterPage;
