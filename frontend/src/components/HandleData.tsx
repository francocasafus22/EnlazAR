import type { SocialNetworks, UserHandle } from "../types";
import DevTreeLink from "./DevTreeLink";

type HandleDataProps = {
  data: UserHandle;
};

export default function HandleData({ data }: HandleDataProps) {
  const links: SocialNetworks[] = JSON.parse(data.links).filter(
    (link: SocialNetworks) => link.enabled
  );

  return (
    <div className="space-y-6">
      <p className="text-center text-5xl font-black">{data.handle}</p>
      {data.image && (
        <img
          src={data.image}
          alt=""
          className="max-w-[250px] mx-auto rounded-full border-6 border-white/30 shadow-2xl"
        />
      )}
      <p className="text-lg text-center font-bold">{data.description}</p>

      <div className="mt-10 flex flex-col gap-6">
        {links.length ? (
          links.map((link) => (
            <a href={link.url} target="_blank_" rel="noreferrer noopener">
              <DevTreeLink link={link}></DevTreeLink>
            </a>
          ))
        ) : (
          <p className="text-center">No hay enlances en este perfil</p>
        )}
      </div>
    </div>
  );
}
