import { InputField } from "../../../components/ui/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpInputs, authSchema } from "../auth.schemas";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../handlers/signUpUser";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export const SignUp = () => {
  const navigate = useNavigate();

  const { handleSetUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit: SubmitHandler<SignUpInputs> = async (values) => {
    try {
      const user = await signUpUser(values);
      handleSetUser(user);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }
      toast.error("something went wrong");
    }
  };

  return (
    <section className="flex w-full max-w-sm flex-col gap-8 rounded border p-4 shadow">
      <div>
        <p className="text-center text-xl font-semibold text-primary">Job Application Tracker</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField label="Email" {...register("email")} fieldError={errors.email} />

        <InputField label="Username" {...register("username")} fieldError={errors.username} />
        <InputField label="Password" type="password" {...register("password")} fieldError={errors.password} />

        <button type="submit" className="self-center rounded bg-accent px-4 py-1.5 text-white">
          Sign Up
        </button>
      </form>

      <hr />
      <p>
        Already registered? <Link to="/auth/login">Login here</Link>
      </p>
    </section>
  );
};
