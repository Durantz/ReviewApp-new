import { Slash, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

interface StarRating {
  rating: number;
  className?: string;
  disabled?: boolean;
  isError?: boolean;
  removeRight?: boolean;
  onChange: (value: number) => void;
}

const animation = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const StarRating: React.FC<StarRating> = ({
  rating,
  onChange,
  disabled = false,
  isError = false,
  removeRight = false,
  className = "w-6 h-6",
}) => {
  const [_rating, setRating] = useState(rating);
  const onClick = (value: number) => {
    // setRating(value);
    onChange(value);
  };
  const reset = () => {
    // setRating(0);
    onChange(0);
  };
  return (
    <motion.div layout layoutRoot className="flex flex-row gap-0.5 ">
      <LayoutGroup>
        <AnimatePresence mode="wait">
          {!disabled && rating > 0 ? (
            <motion.div
              key="remove"
              variants={animation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Button
                type="button"
                size="icon"
                variant="link"
                className={cn(
                  className,
                  !removeRight ? "order-first" : "order-last",
                  "relative text-current hover:animate-jump disabled:opacity-100 animate-jump-in",
                )}
                onClick={reset}
              >
                <Star className="absolute stroke-1" />
                <Slash className="absolute stroke-1" />
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <motion.div layout transition={{ duration: 0.2 }}>
          {Array.from({ length: 5 }, (_, index) => {
            return (
              <Button
                type="button"
                key={index}
                disabled={disabled}
                size="icon"
                variant="link"
                className={cn(
                  className,
                  "hover:animate-jump disabled:opacity-100",
                )}
                onClick={() => onClick(index + 1)}
              >
                {rating >= index + 1 ? (
                  <Star className="w-full h-full text-primary fill-primary" />
                ) : (
                  <Star
                    key={index}
                    className={cn(
                      "w-full h-full dark:fill-card stroke-1 fill-zinc-200",
                      isError
                        ? "text-destructive"
                        : "dark:text-zinc-400 text-zinc-200",
                    )}
                  />
                )}
              </Button>
            );
          })}
        </motion.div>
      </LayoutGroup>
    </motion.div>
  );
};

export default StarRating;
