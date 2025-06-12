import { Routes, BrowserRouter, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import Home from "./views/HomView";
import AuthLayout from "./layouts/AuthLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route element={<AuthLayout></AuthLayout>}>
          <Route path="/auth/login" element={<LoginView />}></Route>
          <Route path="/auth/register" element={<RegisterView />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
