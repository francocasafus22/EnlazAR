import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function HomeNavigation() {
  const auth = localStorage.getItem("AUTH_TOKEN");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.removeQueries({ queryKey: ["user"] });
    navigate("/auth/login");
  };

  return (
    <>
      {!auth ? (
        <>
          <Link
            to={"/auth/login"}
            className="border text-lime-500 rounded-2xl mr-2 p-2 uppercase font-black text-xs cursos-pointer hover:bg-slate-500"
          >
            Iniciar Sesión
          </Link>
          <Link
            to={"/auth/register"}
            className="bg-lime-500 p-2 uppercase font-black text-xs cursor-pointer rounded-2xl hover:bg-slate-500"
          >
            Registrarme
          </Link>
        </>
      ) : (
        <>
          <Link
            to={"/admin"}
            className="border text-lime-500 rounded-2xl mr-2 p-2 uppercase font-black text-xs cursos-pointer hover:bg-slate-500"
          >
            Mi Perfil
          </Link>
          <button
            onClick={logout}
            className="bg-lime-500 p-2 uppercase font-black text-xs cursor-pointer rounded-2xl hover:bg-slate-500"
          >
            Cerrar sesión
          </button>
        </>
      )}
    </>
  );
}
