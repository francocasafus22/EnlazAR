import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";

export default function RegisterView() {
  const initialValues = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const password = watch("password");
  console.log(password);

  const handleRegister = () => {
    console.log("Desde HandleRegister");
  };

  console.log(errors);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="w-full max-w-md bg-base-200 p-8 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-base-content text-center">
          Crear Cuenta
        </h2>

        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="label-text text-base-content">Nombre</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="input input-bordered w-full"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text text-base-content">Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="input input-bordered w-full"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "El mail no es válido.",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="handle">
            <span className="label-text text-base-content">Handle</span>
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="input input-bordered w-full"
            {...register("handle", { required: "El handle es obligatorio" })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="password">
            <span className="label-text text-base-content">Contraseña</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="input input-bordered w-full"
            {...register("password", {
              required: "La password es obligatoria",
              pattern: {
                value: /^.{9,}$/,
                message: "Debe tener más de 8 carácteres.",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="password_confirmation">
            <span className="label-text text-base-content">
              Repetir Contraseña
            </span>
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Password"
            className="input input-bordered w-full"
            {...register("password_confirmation", {
              required: "La confirmación de password es obligatoria",
              pattern: {
                value: /^.{9,}$/,
                message: "Debe tener más de 8 carácteres.",
              },
              validate: (value) =>
                value === password || "Los passwords no son iguales",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>
        <Link to={"/auth/login"}>Ya tiene una cuenta? Inicie sesión</Link>
        <button
          type="submit"
          className="btn btn-primary w-full text-base font-bold uppercase mt-4"
        >
          Crear Cuenta
        </button>
      </form>
    </>
  );
}
