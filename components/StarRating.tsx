import { Slash, Star, X, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StarRating {
  rating: number;
  className?: string;
  disabled?: boolean;
  isError?: boolean;
  removeRight?: boolean;
  onChange: (value: number) => void;
}

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
    <div className="flex flex-row gap-0.5 ">
      {!disabled && rating > 0 ? (
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
      ) : null}
      {Array.from({ length: 5 }, (_, index) => {
        return (
          <Button
            type="button"
            key={index}
            disabled={disabled}
            size="icon"
            variant="link"
            className={cn(className, "hover:animate-jump disabled:opacity-100")}
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
    </div>
  );
};

export default StarRating;
