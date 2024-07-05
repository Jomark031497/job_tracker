import { Input } from "../../../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInputs, authSchema } from "../auth.schemas";
import { loginUser } from "../handlers/loginUser";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

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
    <section className="border p-4 rounded max-w-sm shadow w-full mx-2 flex flex-col gap-8">
      <div>
        <p className="text-xl text-center text-primary font-semibold">Job Application Tracker</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Username" {...register("username")} fieldError={errors.username} />
        <Input
          label="Password"
          type="password"
          {...register("password")}
          fieldError={errors.password}
        />

        <button type="submit" className="bg-accent rounded text-white py-1.5 self-center px-4">
          Sign In
        </button>
      </form>
    </section>
  );
};
