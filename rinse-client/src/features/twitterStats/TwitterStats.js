import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useInterval from "react-useinterval";
import { ConnectAToy, useVibration } from "react-buttplug";

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

  // TODO bug: initial state of 0/0/0 displays as -
  const likes = useSelector(selectLikes);
  const comments = useSelector(selectComments);
  const retweets = useSelector(selectRetweets);
  const dispatch = useDispatch();

  const [device, setDevice] = useState(null);
  useVibration(device, 0.5);

  useEffect(() => {
    dispatch(updateFromAPI(conversationId));
  }, [conversationId, dispatch]);

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
      <ConnectAToy onNewDevice={(device) => setDevice(device)} />
    </div>
  );
}
