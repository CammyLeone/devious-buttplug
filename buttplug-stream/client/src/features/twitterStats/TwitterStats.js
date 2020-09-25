import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFromAPI,
  selectLikes,
  selectComments,
  selectRetweets,
} from "./twitterStatsSlice";

export function TwitterStats({ conversationId, cashMoneySpec, duration }) {
  const likes = useSelector(selectLikes);
  const comments = useSelector(selectComments);
  const retweets = useSelector(selectRetweets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFromAPI(conversationId));
  }, [conversationId, dispatch]);

  return (
    <div>
      <h1>Likes: {likes || "-"}</h1>
      <h1>Comments: {comments || "-"}</h1>
      <h1>Retweets: {retweets || "-"}</h1>
    </div>
  );
}
