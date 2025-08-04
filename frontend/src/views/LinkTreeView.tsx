import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInputs from "../components/EnlazarInputs";
import { isValidUrl } from "../utils/index";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/EnlazarAPI";
import type { SocialNetworks, User } from "../types";

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

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
      const userLink = JSON.parse(user.links).find(
        (link: SocialNetworks) => link.name == item.name
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });
    setDevTreeLinks(updatedLinks);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name == e.target.name ? { ...link, url: e.target.value } : link
    );
    setDevTreeLinks(updatedLinks);
  };

  const links: SocialNetworks[] = JSON.parse(user.links);

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
