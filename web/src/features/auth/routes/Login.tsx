import { InputField } from "../../../components/ui/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInputs, authSchema } from "../auth.schemas";
import { loginUser } from "../handlers/loginUser";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { __API_URL__ } from "../../../constants";

export const Login = () => {
  const navigate = useNavigate();

  const { handleSetUser } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(authSchema.omit({ email: true })),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (values) => {
    try {
      const user = await loginUser(values);
      handleSetUser(user);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError("username", {
          message: error.message,
        });
        setError("password", {
          message: error.message,
        });

        return;
      }
      toast.error("something went wrong");
    }
  };

  return (
    <section className="border rounded max-w-sm shadow w-full flex flex-col gap-8 p-4">
      <div>
        <p className="text-xl text-center text-primary font-semibold">Job Application Tracker</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField label="Username" {...register("username")} fieldError={errors.username} />
        <InputField
          label="Password"
          type="password"
          {...register("password")}
          fieldError={errors.password}
        />

        <button type="submit" className="bg-accent rounded text-white py-1.5 self-center px-4">
          Sign In
        </button>

        <hr />

        <p>
          No account yet? <Link to="/auth/sign-up">Sign up here</Link>
        </p>
      </form>
    </section>
  );
};
