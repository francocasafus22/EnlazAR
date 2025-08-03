import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"} className="flex items-center space-x-2">
      <img
        src="/logo.png"
        alt="Logotipo DevTree"
        className="max-w-[50px] h-auto"
      />
      <h1 className="font-bold text-4xl">EnlazAR</h1>
    </Link>
  );
}
