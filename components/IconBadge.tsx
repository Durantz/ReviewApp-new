import { Croissant, UtensilsCrossed, Martini, Pizza } from "lucide-react";

export default function IconBadge({ type }: { type: string }) {
  const className =
    "bg-black dark:bg-zinc-100 rounded-full w-5 h-5 p-0.5 text-white dark:text-black";

  const icon = () => {
    switch (type) {
      case "colazione":
        return <Croissant className={className} />;
        break;
      case "ristorante":
        return <UtensilsCrossed className={className} />;
        break;
      case "apertivo":
        return <Martini className={className} />;
        break;
      case "fastfood":
        return <Pizza className={className} />;
        break;
      default:
        return null;
        break;
    }
  };
  return icon();
  //   (
  //     <>
  //     <span className="bg-black rounded-full w-4 h-4 flex justify-center align-center">
  //     {
  //         switch (type) {
  //             case "colazione":
  //               <Croissant className={className} />;
  //               break;
  //             case "ristorante":
  //               return <Beef className={className} />;
  //             default:
  //               break;
  //           }
  //     }
  //     </span>
  //     </>
  //   );
}
