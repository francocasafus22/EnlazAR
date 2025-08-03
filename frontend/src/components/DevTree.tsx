import { Link, Outlet } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import DevTreeLink from "../components/DevTreeLink";
import { Toaster } from "sonner";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import type { SocialNetworks, User } from "../types";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";

type DevTreeProps = {
  data: User;
};

export default function DevTree({ data }: DevTreeProps) {
  const [enabledLinks, setEnabledLinks] = useState<SocialNetworks[]>(
    JSON.parse(data.links).filter((link: SocialNetworks) => link.enabled)
  );

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(data.links).filter((link: SocialNetworks) => link.enabled)
    );
  }, [data]);

  const queryClient = useQueryClient();

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (over && over.id) {
      const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
      const newIndex = enabledLinks.findIndex((link) => link.id === over.id);
      const order = arrayMove(enabledLinks, prevIndex, newIndex);
      setEnabledLinks(order);

      const disabledLinks: SocialNetworks[] = JSON.parse(data.links).filter(
        (link: SocialNetworks) => !link.enabled
      );
      const links = order.concat(disabledLinks);

      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          links: JSON.stringify(links),
        };
      });
    }
  };

  return (
    <>
      <Header />
      <div className=" min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-2xl"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil /{data.handle}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div
              className="w-full md:w-96 px-5 py-10 space-y-6 shadow-2xl"
              style={{
                background: `linear-gradient(to bottom, ${data.colorFrom}, ${data.colorVia}, ${data.colorTo})`,
              }}
            >
              <p className="text-4xl text-center text-white">{data.handle}</p>
              <img
                src={data.image || "../../public/userplaceholder.png"}
                alt="Imagen Perfil"
                className="mx-auto w-[250px] h-[250px] object-cover rounded-full border-6 border-white/30"
              />

              {data.description && (
                <p className="text-center text-lg font-black text-white">
                  {data.description}
                </p>
              )}

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <div className="mt-20 flex flex-col gap-5">
                  <SortableContext
                    items={enabledLinks}
                    strategy={verticalListSortingStrategy}
                  >
                    {enabledLinks.map((link) => (
                      <DevTreeLink key={link.name} link={link} />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
