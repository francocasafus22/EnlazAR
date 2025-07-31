import { Link } from "react-router-dom";
export default function HomeNavigation() {
  return (
    <>
      <Link
        to={"/auth/login"}
        className="border text-lime-500 rounded-2xl mr-2 p-2 uppercase font-black text-xs cursos-pointer hover:bg-slate-500"
      >
        Iniciar Sesion
      </Link>
      <Link
        to={"/auth/register"}
        className="bg-lime-500 p-2 uppercase font-black text-xs cursor-pointer rounded-2xl hover:bg-slate-500"
      >
        Registrarme
      </Link>
    </>
  );
}
