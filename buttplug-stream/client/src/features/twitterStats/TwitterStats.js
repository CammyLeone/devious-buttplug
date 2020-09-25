import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFromAPI,
  selectLikes,
  selectComments,
  selectRetweets,
} from "./twitterStatsSlice";
import MoneyMoney from "../../MoneyMoney";

export function TwitterStats() {
  const { conversationId, until, ...cashMoneySpec } = useParams();

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
      <MoneyMoney
        likes={likes}
        comments={comments}
        retweets={retweets}
        cashMoneySpec={cashMoneySpec}
      />
    </div>
  );
}
