import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "../components/ErrorMessage";
import type { LoginForm } from "../types";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/DevTreeAPI";

export default function LoginView() {
  const queryClient = useQueryClient();

  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      localStorage.setItem("AUTH_TOKEN", data!);
      toast.success("Autenticado");
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/admin");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: LoginForm) => {
    loginMutation.mutate(formData);
  };

  return (
    <div>
      <>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-base-200 px-5 py-20 rounded-lg space-y-10 mt-10"
          noValidate
        >
          <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="email" className="text-2xl text-base-content">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="bg-base-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="password" className="text-2xl text-base-content">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password de Registro"
              className="bg-base-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            className="bg-blue-700 p-3 text-lg w-full uppercase rounded-lg font-bold cursor-pointer"
            value="Iniciar Sesión"
          />
        </form>
        <Link to={"/auth/register"}>
          <p className="text-center mt-3 transition-colors duration-100 hover:text-slate-500">
            ¿No tenés una cuenta? Crea una aquí
          </p>
        </Link>
      </>
    </div>
  );
}
