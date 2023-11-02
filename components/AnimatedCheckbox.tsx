"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { colors } from "tailwindcss/defaultTheme";

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

  return (
    <>
      <div className="relative flex flex-row items-center justify-center w-20 h-16 select-none touch-pan-x">
        <motion.div
          animate={
            checked
              ? { backgroundColor: "hsl(var(--primary))" }
              : { backgroundColor: colors.zinc }
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
