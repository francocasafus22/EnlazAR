import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

export default function HandleLayout() {
  return (
    <>
      <div className="min-h-screen min-w-screen flex flex-col items-center px-5">
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="max-w-lg w-full py-10">
            <Outlet />
            <div className="flex items-center justify-center pt-5">
              <div className="bg-white/30 p-4 backdrop-blur-md border border-white/30 rounded-full shadow-md scale-65 hover:shadow-2xl hover:scale-75 transition-transform duration-400">
                <Logo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
