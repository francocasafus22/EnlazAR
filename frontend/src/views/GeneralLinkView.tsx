import { useEffect, useState } from "react";
import type { DevTreeLink } from "../types";
import DevTreeInputs from "../components/EnlazarInputs";
import { isValidUrl } from "../utils/index";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/EnlazarAPI";
import type { SocialNetworks, User } from "../types";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function GeneralLinkView() {
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;
  const mock: DevTreeLink[] = [];
  const [devTreeLinks, setDevTreeLinks] = useState(mock);
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Actualizado correctamente.");
    },
  });

  useEffect(() => {
    const updatedLinks = devTreeLinks.map((item) => {
      const userLink = JSON.parse(user.general_links);
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });
    setDevTreeLinks(updatedLinks);
  }, []);

  const handleAddLink = () => {
    setDevTreeLinks([...devTreeLinks, { name: "", url: "", enabled: false }]);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name == e.target.name ? { ...link, url: e.target.value } : link
    );
    setDevTreeLinks(updatedLinks);
  };

  const links: SocialNetworks[] = JSON.parse(user.general_links);

  const handleEnableLink = (socialNetwork: string) => {
    const updateLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("URL no válida.");
        }
      }
      return link;
    });
    setDevTreeLinks(updateLinks);
    let updatedItems: SocialNetworks[] = [];

    const selectedSocialNetwork = updateLinks.find(
      (link) => link.name == socialNetwork
    );

    if (selectedSocialNetwork?.enabled) {
      const id = links.filter((link) => link.id > 0).length + 1;
      if (links.some((link) => link.name == socialNetwork)) {
        updatedItems = links.map((link) => {
          if (link.name == socialNetwork) {
            return {
              ...link,
              enabled: true,
              id: id,
            };
          } else {
            return link;
          }
        });
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id: links.length + 1,
        };
        updatedItems = [...links, newItem];
      }
    } else {
      const indexToUpdate = links.findIndex(
        (link) => link.name == socialNetwork
      );
      updatedItems = links.map((link) => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false,
          };
        } else if (
          link.id > indexToUpdate &&
          indexToUpdate !== 0 &&
          link.id === 1
        ) {
          return {
            ...link,
            id: link.id - 1,
          };
        }
        {
          return link;
        }
      });
      console.log(indexToUpdate);
    }

    console.log(updatedItems);

    // Almacenar en la BD
    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems),
      };
    });
  };

  return (
    <>
      <div className="space-y-5">
        {devTreeLinks.map((item) => (
          <DevTreeInputs
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          />
        ))}

        <div
          className="bg-slate-800 shadow-sm p-2 flex items-center rounded-md justify-center hover:brightness-90 transition-all duration-150 cursor-pointer"
          onClick={handleAddLink}
        >
          <PlusIcon className="w-12 h-12" />
          <p className="text-xl">Agregar Link</p>
        </div>

        <button
          className="bg-slate-600 p-2 text-lg w-full rounded-lg font-bold shadow-2xl hover:bg-slate-700 cursor-pointer"
          onClick={() => mutate(queryClient.getQueryData(["user"])!)}
        >
          Guardar Cambios
        </button>
      </div>
    </>
  );
}
