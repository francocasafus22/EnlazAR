import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../api/DevTreeAPI";
import Loading from "../components/Loading";
import HandleData from "../components/HandleData";
import { useEffect } from "react";

export default function HandleView() {
  const params = useParams();
  const handle = params.handle!;

  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ["handle", handle],
    retry: 1,
  });

  useEffect(() => {
    document.body.style.minHeight = "100vh";
    document.body.style.margin = "0";
    document.body.style.background = `linear-gradient(165deg, ${data?.colorFrom}, ${data?.colorVia}, ${data?.colorTo})`;
    return () => {
      document.body.style.background = "";
    };
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <Navigate to={"/404"} />;

  if (data) return <HandleData data={data} />;
}
