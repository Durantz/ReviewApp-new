"use server";

import { DbReview, schemaType } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { promise } from "zod";

export async function getUsers(): Promise<{ name: string; email: string }[]> {
  try {
    const data = await fetch(`${process.env.API_URL}/api/users`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    });
    const users = await data.json();
    return new Promise((resolve) => resolve(users));
  } catch (error) {
    return new Promise((resolve) => resolve([]));
  }
}

export async function putData(review: schemaType): Promise<boolean> {
  try {
    const stringRev = JSON.stringify(review);
    const res = await fetch(`${process.env.API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: stringRev,
    });
    const data = await res.json();
    revalidateTag("reviews");
    return new Promise((resolve) => resolve(true));
  } catch (error) {
    console.log(error);
    return new Promise((resolve) => resolve(false));
  }
}
export async function updateData(
  review: schemaType,
  id: string,
): Promise<boolean> {
  try {
    const stringRev = JSON.stringify(review);
    const res = await fetch(`${process.env.API_URL}/api/review?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: stringRev,
    });
    const data = await res.json();
    revalidateTag("reviews");
    return new Promise((resolve) => resolve(true));
  } catch (error) {
    return new Promise((resolve) => resolve(false));
  }
}

export async function deleteReview(id: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/reviews?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    revalidateTag("reviews");
    return new Promise((resolve) => resolve(data));
  } catch (error) {
    return new Promise((resolve) => resolve(error));
  }
}

export async function getAllData(
  types: string,
  users: string,
): Promise<DbReview[]> {
  const res = await fetch(
    `${process.env.API_URL}/api/reviews?t=${types}&u=${users}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      cache: "no-store",
      next: {
        tags: ["reviews"],
      },
    },
  );
  if (res.status != 200) {
    return new Promise((resolve) => resolve([]));
  }
  const data = await res.json();
  return new Promise((resolve) => resolve(data));
}

export async function getReview(id: string) {
  const res = await fetch(`${process.env.API_URL}/api/review?id=${id}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });
  if (res.status != 200) {
    return [];
  }
  const data = await res.json();
  return data;
}
