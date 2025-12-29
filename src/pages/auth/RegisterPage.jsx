import React, { useState, useCallback } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";

// --- 1. Validation Schema ---
const completeSchema = z.object({
  nic: z.string().min(1, "National ID is required").min(5, "NIC must be at least 5 characters"),
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  age: z.coerce.number().min(18, "Must be at least 18 years old").max(100, "Invalid age"),
  telephone: z.string().min(1, "Telephone is required").min(10, "Invalid telephone number"),
  address: z.string().min(1, "Address is required").min(10, "Please provide a complete address"),
  category: z.string().min(1, "Please select a category"),
  preworks: z.string().min(1, "Please describe your experience").min(20, "Please provide more details about your experience"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  username: z.string().min(1, "Username is required").min(3, "Username must be at least 3 characters"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Button = ({ children, className = '', variant = 'default', ...props }) => {
  let baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2 shadow-md";
  let variantClasses = "";

  switch (variant) {
    case 'outline':
      variantClasses = "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50";
      break;
    case 'default':
    default:
      variantClasses = "bg-blue-600 text-white hover:bg-blue-700";
      break;
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = React.forwardRef(({ type = 'text', className = '', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition duration-150 ${className}`}
    {...props}
  />
));
Input.displayName = "Input";

const Textarea = React.forwardRef(({ className = '', ...props }, ref) => (
  <textarea
    ref={ref}
    className={`flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition duration-150 ${className}`}
    {...props}
  />
));
Textarea.displayName = "Textarea";

const Progress = ({ value = 0, className = '' }) => (
  <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
    <div
      className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
      style={{ width: `${value}%` }}
    />
  </div>
);

const CustomFormField = ({ label, children, field, fieldState }) => {
  const { error } = fieldState;

  return (
    <div className="space-y-2">
      <label htmlFor={field.name} className={`text-sm font-medium leading-none ${error ? 'text-red-600' : 'text-gray-700'}`}>
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm font-medium text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
};

const Toast = ({ message, visible, onClose }) => {
    if (!visible) return null;

    return (
        <div
            className="fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg bg-white border border-green-200"
            role="alert"
        >
            <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <div className="text-sm font-medium text-gray-800">
                    {message}
                </div>
                <button
                    onClick={onClose}
                    className="ml-4 text-gray-400 hover:text-gray-600"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const navigate = (path) => {
    console.log(`Mock Navigation to: ${path}`);
    form.reset();
    setStep(1);
  };

  const form = useForm({
    resolver: zodResolver(completeSchema),
    mode: "onChange",
    defaultValues: {
      nic: "",
      name: "",
      age: undefined,
      telephone: "",
      address: "",
      category: "",
      preworks: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const categories = [
    "Plumbing",
    "Electrical",
    "Carpentry",
    "General Handyman",
    "Painting",
    "HVAC",
    "Roofing",
    "Landscaping",
    "Cleaning",
    "Other",
  ];

  const validateStep = useCallback(async (currentStep) => {
    let fields = [];
    if (currentStep === 1) {
      fields = ["nic", "name", "age", "telephone", "address"];
    } else if (currentStep === 2) {
      fields = ["category", "preworks"];
    } else if (currentStep === 3) {
      fields = ["email", "username", "password", "confirmPassword"];
    }
    
    if (currentStep === 3) {
        const result = await form.trigger(fields);
        const password = form.getValues('password');
        const confirmPassword = form.getValues('confirmPassword');
        const isPasswordMatch = password === confirmPassword;
        if (!isPasswordMatch) {
             form.setError("confirmPassword", { type: "manual", message: "Passwords don't match" });
        }

        return result && isPasswordMatch;
    }

    return await form.trigger(fields);
  }, [form]);

  const nextStep = async () => {
    const isValid = await validateStep(step);
    if (isValid && step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data) => {
    const { confirmPassword, ...registrationData } = data;

    console.log("Attempting to register user with data:", registrationData);
    setToast({
      visible: true,
      message: "Submitting application...",
      type: "loading", 
    });

    try {
      const res = await axios.post("http://localhost:5000/api/workers/register", registrationData, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Server Response:", res.data);

      setToast({
        visible: true,
        message: res.data.message || "Registration Successful!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/");
        setToast({ visible: false, message: "" });
      }, 3000);

    } catch (error) {
      console.error("Registration Error:", error);

      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';

      setToast({
        visible: true,
        message: errorMessage,
        type: "error",
      });

      setTimeout(() => {
        setToast({ visible: false, message: "" });
      }, 5000);
    }
  };

  const progressValue = (step / 3) * 100;

  return (
    <div
      className="min-h-screen font-sans relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at bottom left, #87ceeb, #ffffff)`,
      }}
    >

      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm z-10 shadow-sm border-b border-gray-100">
          <div className="container mx-auto px-4 h-16 flex items-center justify-center">
              <a href="#" className="text-2xl font-bold text-blue-600">
                  Job Done
              </a>
          </div>
      </header>

      <Toast
          message={toast.message}
          visible={toast.visible}
          onClose={() => setToast({ visible: false, message: "" })}
      />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                Professional Registration
              </h1>
              <p className="text-gray-600 text-lg">
                Join our network of trusted skilled workers
              </p>
            </div>

            {/* Progress Bar & Steps */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Step {step} of 3
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  {Math.round(progressValue)}% Complete
                </span>
              </div>
              <Progress value={progressValue} className="h-2" />
              
              {/* Step Labels */}
              <div className="flex justify-between mt-4 text-xs md:text-sm">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`flex flex-col items-center transition-colors duration-300 ${step >= s ? "text-blue-600 font-semibold" : "text-gray-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ring-4 ring-offset-2 ${step >= s ? "bg-blue-600 text-white ring-blue-100" : "bg-gray-200 text-gray-600 ring-gray-100"}`}>
                      {s}
                    </div>
                    <span className="text-center mt-1">
                        {s === 1 ? "Personal Info" : s === 2 ? "Professional" : "Account"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                      Personal Identification & Contact
                    </h2>
                    
                    <Controller
                      control={form.control}
                      name="nic"
                      // FIX: Destructuring field and fieldState from the render prop
                      render={({ field, fieldState }) => ( 
                        <CustomFormField 
                            label="National ID / Document Number *" 
                            field={field} 
                            fieldState={fieldState}
                        >
                          <Input placeholder="Enter your NIC number" {...field} />
                        </CustomFormField>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="name"
                      render={({ field, fieldState }) => (
                        <CustomFormField 
                            label="Full Name *" 
                            field={field} 
                            fieldState={fieldState}
                        >
                          <Input placeholder="Enter your full name" {...field} />
                        </CustomFormField>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="age"
                      render={({ field, fieldState }) => (
                        <CustomFormField 
                            label="Age *" 
                            field={field} 
                            fieldState={fieldState}
                        >
                          <Input 
                            type="number" 
                            placeholder="Enter your age" 
                            {...field} 
                            // Ensure number fields handle conversion correctly for Zod
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : undefined)}
                            value={field.value === undefined ? '' : field.value}
                          />
                        </CustomFormField>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="telephone"
                      render={({ field, fieldState }) => (
                        <CustomFormField 
                            label="Telephone *" 
                            field={field} 
                            fieldState={fieldState}
                        >
                          <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                        </CustomFormField>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="address"
                      render={({ field, fieldState }) => (
                        <CustomFormField 
                            label="Full Address *" 
                            field={field} 
                            fieldState={fieldState}
                        >
                          <Textarea 
                            placeholder="Enter your complete address including street, city, state, and zip code" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </CustomFormField>
                      )}
                    />
                  </div>
                )}

                {/* Step 2: Professional Profile */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                      Professional Profile & Skills
                    </h2>
                    
                    <Controller
                      control={form.control}
                      name="category"
                      render={({ field, fieldState }) => (
                        <CustomFormField 
                            label="Professional Category *" 
                            field={field} 
                            fieldState={fieldState}
                        >
                          <select
                            className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition duration-150 appearance-none"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            value={field.value || ""} // Ensure controlled component
                          >
                            <option value="" disabled>Select your primary skill category</option>
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </CustomFormField>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="preworks"
                      render={({ field, fieldState }) => (
                        <CustomFormField 
                            label="Experience & Portfolio *" 
                            field={field} 
                            fieldState={fieldState}
                        >
                          <Textarea 
                            placeholder="Describe your work experience, skills, certifications, and notable projects. Include years of experience and any specializations." 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </CustomFormField>
                      )}
                    />
                  </div>
                )}

                {/* Step 3: Account Security */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                      Account Security
                    </h2>
                    
                    <Controller
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <CustomFormField 
                            label="Email Address *" 
                            field={field} 
                            fieldState={fieldState}
                        >
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </CustomFormField>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="username"
                      render={({ field, fieldState }) => (
                        <CustomFormField 
                            label="Username *" 
                            field={field} 
                            fieldState={fieldState}
                        >
                          <Input placeholder="Choose a unique username" {...field} />
                        </CustomFormField>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="password"
                      render={({ field, fieldState }) => (
                        <CustomFormField 
                            label="Password *" 
                            field={field} 
                            fieldState={fieldState}
                        >
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Create a strong password (min 8 characters)" 
                              {...field} 
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                          </div>
                        </CustomFormField>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="confirmPassword"
                      render={({ field, fieldState }) => (
                        <CustomFormField 
                            label="Confirm Password *" 
                            field={field} 
                            fieldState={fieldState}
                        >
                          <div className="relative">
                            <Input 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="Re-enter your password" 
                              {...field} 
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                              aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}
                            >
                              {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                          </div>
                        </CustomFormField>
                      )}
                    />
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className={`flex ${step === 1 ? 'justify-end' : 'justify-between'} pt-6 border-t border-gray-200 mt-8`}>
                  {step > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep} 
                      className="flex items-center gap-2"
                    >
                      <FaArrowLeft />
                      Previous
                    </Button>
                  )}
                  
                  {step < 3 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      className={`flex items-center gap-2 ${step === 1 ? 'ml-auto' : ''}`}
                    >
                      Next
                      <FaArrowRight />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition"
                      disabled={!form.formState.isValid}
                    >
                      <FaCheckCircle />
                      Complete Registration & Apply
                    </Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
