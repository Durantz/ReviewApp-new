"use server";

import { schemaType } from "@/types";

export async function putData(review: schemaType): Promise<boolean> {
  try {
    const stringRev = JSON.stringify(review);
    console.log(stringRev);
    const res = await fetch("http://localhost:3000/api/reviews/", {
      method: "POST",
      body: stringRev,
    });
    const data = await res.json();
    return new Promise((resolve) => resolve(true));
  } catch (error) {
    console.log(error);
    return new Promise((resolve) => resolve(false));
  }
}

export async function getAllData() {
  try {
    const res = await fetch("http://localhost:3000/api/reviews");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
