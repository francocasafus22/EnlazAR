import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getUser } from "../api/EnlazarAPI";
import Enlazar from "../components/Enlazar";

export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return "Cargando...";
  if (isError) {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (!token) return <Navigate to={"/auth/login"}></Navigate>;
  }

  if (data) return <Enlazar data={data} />;
}
