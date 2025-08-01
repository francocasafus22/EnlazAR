import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Logo from "../components/Logo";

export default function AuthLayout() {
  return (
    <>
      <div className="min-w-screen">
        <div className="max-w-lg mx-auto pt-10 px-5 flex flex-col items-center">
          <Logo></Logo>
          <div className="py-10 w-full">
            <Outlet></Outlet>
          </div>
        </div>
      </div>

      <Toaster position="bottom-right" closeButton richColors />
    </>
  );
}
