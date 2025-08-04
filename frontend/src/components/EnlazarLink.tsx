import type { SocialNetworks } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type DevTreeLinkProps = {
  link: SocialNetworks;
};

export default function DevTreeLink({ link }: DevTreeLinkProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: link.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <li
      ref={setNodeRef}
      className="group bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 flex items-center gap-5 rounded-lg
     hover:shadow-2xl transition-shadow duration-200 focus:outline-2 focus:outline-slate-400 text-white "
      style={style}
      {...attributes}
      {...listeners}
    >
      <div
        className="w-12 h-12 bg-cover transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundImage: `url("/social/icon_${link.name}.svg")` }}
      ></div>
      <p className="capitalize">
        Visita mi: <span className="font-bold">{link.name}</span>
      </p>
    </li>
  );
}
