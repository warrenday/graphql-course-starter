import { useState } from "react";
import { Alert, AlertTitle, AlertDescription, AlertActions } from "./ui/alert";
import { Field, Label, ErrorMessage } from "./ui/fieldset";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox, CheckboxField } from "./ui/checkbox";
import { cloneElement, ReactElement } from "react";
import { SignupInput, LoginInput } from "../providers/AuthProvider";
import { Controller, useForm } from "react-hook-form";

interface LoginAlertProps {
  children: ReactElement;
  onLogin: (input: LoginInput) => Promise<void>;
  onSignup: (input: SignupInput) => Promise<void>;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

const LoginAlert = ({ children, onLogin, onSignup }: LoginAlertProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await onLogin({
        email: data.email,
        password: data.password,
      });
      setIsOpen(false);
    } catch (error) {
      // Handle error if needed
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await onSignup({
        email: data.email,
        password: data.password,
        name: data.name,
        isAdmin: data.isAdmin,
      });
      setIsOpen(false);
    } catch (error) {
      // Handle error if needed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {cloneElement(children, {
        onClick: () => setIsOpen(true),
      })}
      <Alert open={isOpen} onClose={() => setIsOpen(false)}>
        <AlertTitle>{isSignup ? "Create Account" : "Login"}</AlertTitle>
        <AlertDescription>
          {isSignup
            ? "Please fill in your details to create an account."
            : "Please enter your credentials to continue."}
        </AlertDescription>

        {isSignup ? (
          <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
        ) : (
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        )}

        <div className="mt-8 text-center text-xs text-zinc-500">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-500 hover:text-blue-600"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </div>
      </Alert>
    </>
  );
};

const LoginForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-6 space-y-4">
        <Field>
          <Label>Email</Label>
          <Input
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="you@example.com"
          />
          {errors.email && (
            <ErrorMessage>
              {errors.email.message || "Email is required"}
            </ErrorMessage>
          )}
        </Field>

        <Field>
          <Label>Password</Label>
          <Input
            {...register("password", {
              required: true,
            })}
            type="password"
          />
          {errors.password && (
            <ErrorMessage>
              {errors.password.message || "Password is required"}
            </ErrorMessage>
          )}
        </Field>
      </div>

      <AlertActions>
        <Button type="submit" loading={isLoading}>
          Login
        </Button>
      </AlertActions>
    </form>
  );
};

const SignupForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: SignupFormData) => Promise<void>;
  isLoading: boolean;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-6 space-y-4">
        <Field>
          <Label>Full Name</Label>
          <Input
            {...register("name", { required: true })}
            type="text"
            placeholder="John Doe"
          />
          {errors.name && <ErrorMessage>Name is required</ErrorMessage>}
        </Field>

        <Field>
          <Label>Email</Label>
          <Input
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="you@example.com"
          />
          {errors.email && (
            <ErrorMessage>
              {errors.email.message || "Email is required"}
            </ErrorMessage>
          )}
        </Field>

        <Field>
          <Label>Password</Label>
          <Input
            {...register("password", {
              required: true,
            })}
            type="password"
          />
          {errors.password && (
            <ErrorMessage>
              {errors.password.message || "Password is required"}
            </ErrorMessage>
          )}
        </Field>

        <CheckboxField>
          <Controller
            name="isAdmin"
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <Checkbox checked={value} onChange={onChange} />
            )}
          />
          <Label>Admin Account</Label>
        </CheckboxField>
      </div>

      <AlertActions>
        <Button type="submit" loading={isLoading}>
          Create Account
        </Button>
      </AlertActions>
    </form>
  );
};

export default LoginAlert;
