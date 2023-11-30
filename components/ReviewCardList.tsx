"use client";

import { LayoutGroup } from "framer-motion";
import ReviewCard from "@/components/ReviewCard";
import { DbReview } from "@/types";
import { useSession } from "next-auth/react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { filterState, reviewsState, usersState } from "@/states";
import { getAllData, getUsers } from "@/lib/functions";
import SearchDialog from "./SearchDialog";

const ReviewCardList: React.FC = () => {
  const { data: session, status } = useSession();
  const setUsers = useSetRecoilState(usersState);
  const [reviews, setReviews] = useRecoilState(reviewsState);
  const filter = useRecoilValue(filterState);

  useEffect(() => {
    async function _getUsers() {
      const users = await getUsers();
      setUsers(users);
    }

    _getUsers();
  }, [setUsers, setReviews]);

  useEffect(() => {
    async function _getReviews() {
      console.log("Calling getReviews");
      const reviews: DbReview[] = await getAllData(
        filter.types.map((type) => type.value).join(","),
        filter.users.map((user) => user.email).join(","),
      );
      setReviews(reviews);
    }
    _getReviews();
  }, [filter, setReviews]);

  return (
    <>
      {status === "authenticated" && (
        <>
          <SearchDialog />
          <div className="snap-y snap-mandatory grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 justify-items-center md:items-start items-center w-auto">
            <LayoutGroup>
              {reviews &&
                reviews.map((review) => {
                  return (
                    <ReviewCard
                      key={review._id}
                      data={review}
                      canEditDelete={
                        review.reviewerEmail === session?.user.email
                      }
                    />
                  );
                })}
            </LayoutGroup>
          </div>
        </>
      )}
    </>
  );
};

export default ReviewCardList;
