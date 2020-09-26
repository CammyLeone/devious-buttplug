import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useInterval from "react-useinterval";

import {
  updateFromAPI,
  selectLikes,
  selectComments,
  selectRetweets,
} from "./twitterStatsSlice";
import MoneyMoney from "../../MoneyMoney";
import CountdownTimer from "../../CountdownTimer";

const UPDATE_INTERVAL = 15 * 1000;

export function TwitterStats() {
  const { conversationId, until, ...cashMoneySpec } = useParams();

  const likes = useSelector(selectLikes);
  const comments = useSelector(selectComments);
  const retweets = useSelector(selectRetweets);
  const dispatch = useDispatch();

  useInterval(() => {
    dispatch(updateFromAPI(conversationId));
  }, UPDATE_INTERVAL);

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
      {until && <CountdownTimer until={Number(until)} />}
    </div>
  );
}
