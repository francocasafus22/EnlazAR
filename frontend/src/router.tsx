import { Routes, BrowserRouter, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import Home from "./views/HomeView";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";
import HandleView from "./views/HandleView";
import NotFoundView from "./views/NotFoundView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route element={<AuthLayout></AuthLayout>}>
          <Route path="/auth/login" element={<LoginView />}></Route>
          <Route path="/auth/register" element={<RegisterView />}></Route>
        </Route>

        <Route path="/admin" element={<AppLayout></AppLayout>}>
          <Route index={true} element={<LinkTreeView />}></Route>
          <Route path="profile" element={<ProfileView />}></Route>
        </Route>

        <Route path="/:handle" element={<AuthLayout />}>
          <Route element={<HandleView />} index={true}></Route>
        </Route>

        <Route path="/404" element={<AuthLayout />}>
          <Route element={<NotFoundView />} index={true}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
