import { useForm, Controller } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateProfile, uploadImage } from "../api/EnlazarAPI";
import type { ProfileForm, User } from "../types";
import { toast } from "sonner";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description,
      colorFrom: data.colorFrom || "#1e293b", // slate-800
      colorVia: data.colorVia || "#334155", // slate-700 (corregido)
      colorTo: data.colorTo || "#475569", // slate-600
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          image: data.image,
        };
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  const handleUserProfileForm = (formData: ProfileForm) => {
    const updatedUser: User = {
      ...data,
      ...formData,
    };
    queryClient.setQueryData(["user"], updatedUser);
    updateProfileMutation.mutate(updatedUser);
  };

  return (
    <form
      className="bg-slate-800 p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-center">Editar Información</legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-700 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", {
            required: "El handle es obligatorio.",
          })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="border-none bg-slate-700 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register("description")}
        />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-700 rounded-lg p-2 text-slate-400"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <label className="block mb-2 font-semibold text-white">
        Elige tus colores para el degradado:
      </label>
      <div className="grid grid-cols-3 gap-4">
        {/* colorFrom */}
        <Controller
          name="colorFrom"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col items-center">
              <input
                type="color"
                {...field}
                className="w-14 h-14 cursor-pointer rounded"
              />
              <input
                type="text"
                {...field}
                onChange={(e) => {
                  // Validar que tenga formato # + 6 hex
                  const val = e.target.value;
                  if (/^#([0-9A-Fa-f]{0,6})$/.test(val) || val === "") {
                    field.onChange(val);
                  }
                }}
                className="w-24 mt-1 text-center rounded px-1 bg-slate-600"
                placeholder="#1e293b"
              />
            </div>
          )}
        />

        {/* colorVia */}
        <Controller
          name="colorVia"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col items-center">
              <input
                type="color"
                {...field}
                className="w-14 h-14 cursor-pointer rounded"
              />
              <input
                type="text"
                {...field}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#([0-9A-Fa-f]{0,6})$/.test(val) || val === "") {
                    field.onChange(val);
                  }
                }}
                className="w-24 mt-1 text-center rounded px-1 bg-slate-600"
                placeholder="#334155"
              />
            </div>
          )}
        />

        {/* colorTo */}
        <Controller
          name="colorTo"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col items-center">
              <input
                type="color"
                {...field}
                className="w-14 h-14 cursor-pointer rounded"
              />
              <input
                type="text"
                {...field}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#([0-9A-Fa-f]{0,6})$/.test(val) || val === "") {
                    field.onChange(val);
                  }
                }}
                className="w-24 mt-1 text-center rounded px-1 bg-slate-600"
                placeholder="#475569"
              />
            </div>
          )}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
}
