import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function AuthLayout() {
  return (
    <>
      <div className="min-w-screen">
        <div className="max-w-lg mx-auto pt-10 px-5">
          <img src="/logo.svg" alt="Logotipo DevTree" />
          <div className="py-10">
            <Outlet></Outlet>
          </div>
        </div>
      </div>

      <Toaster position="bottom-right" closeButton richColors />
    </>
  );
}
