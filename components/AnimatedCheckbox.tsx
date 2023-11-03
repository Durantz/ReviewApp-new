"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig, {
  type Colors,
  type DefaultColors,
} from "../tailwind.config";

const tw = resolveConfig(tailwindConfig);
const { theme } = tw as unknown as {
  theme: (typeof tw)["theme"] & { colors: DefaultColors & Colors };
};
interface AnimatedCheckbox {
  checked: boolean;
  onCheckedChange: () => void;
}

const AnimatedCheckbox: React.FC<AnimatedCheckbox> = ({
  checked,
  onCheckedChange,
}) => {
  const onChange = () => {
    onCheckedChange();
  };
  const config = resolveConfig(tailwindConfig);
  return (
    <>
      <div className="relative flex flex-row items-center justify-center w-20 h-16 select-none touch-pan-x">
        <motion.div
          animate={
            checked
              ? { backgroundColor: theme?.colors?.primary["DEFAULT"] }
              : { backgroundColor: "hsl(var(--muted))" }
          }
          onClick={onChange}
          className={cn(
            "relative flex flex-row items-center w-full h-3 rounded-full",
            checked ? "justify-end" : "justify-start",
          )}
        >
          {checked ? (
            <motion.img
              layout
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
              className=" absolute -end-4 w-14 h-14 object-contain"
              src={"/happyGab.png"}
              alt="smile"
            />
          ) : (
            <motion.img
              layout
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
              className={
                "absolute -start-4 w-14 h-14 object-contain grayscale "
              }
              src={"/almostSadGab.png"}
              alt="sad"
            />
          )}
        </motion.div>
      </div>
    </>
  );
};

export default AnimatedCheckbox;
