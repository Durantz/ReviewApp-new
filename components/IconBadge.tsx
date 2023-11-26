import { Croissant, UtensilsCrossed, Martini, Pizza } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { useState } from "react";

function Icon({ type, open }: { type: string; open: () => void }) {
  const className =
    "bg-black dark:bg-zinc-100 rounded-full w-5 h-5 p-0.5 text-white dark:text-black";

  const icon = () => {
    let icon = null;
    switch (type) {
      case "colazione":
        icon = <Croissant className={className} />;
        break;
      case "ristorante":
        icon = <UtensilsCrossed className={className} />;
        break;
      case "apertivo":
        icon = <Martini className={className} />;
        break;
      case "fastfood":
        icon = <Pizza className={className} />;
        break;
      default:
        icon = null;
        break;
    }
    return <span onClick={() => open()}>{icon}</span>;
  };
  return icon();
}

export default function IconBadge({ type }: { type: string }) {
  const [open, setOpen] = useState(false);
  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger>
          <Icon type={type} open={() => setOpen(true)} />
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          onPointerDownOutside={() => setOpen(false)}
        >
          <p>{type}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
