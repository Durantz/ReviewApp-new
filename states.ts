import { atom } from "recoil";
import { DbReview } from "./types";

export const filterState = atom({
  key: "FilterDialog",
  default: {
    types: [] as { label: string; value: string }[],
    users: [] as { name: string; email: string }[],
  },
});

export const usersState = atom({
  key: "Users",
  default: [] as { name: string; email: string }[],
});

export const reviewsState = atom({
  key: "Reviews",
  default: [] as DbReview[],
});
