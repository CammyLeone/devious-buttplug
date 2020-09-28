import React from "react";
import { useVibration } from "react-buttplug";
import * as d3 from "d3-scale";

const vibrationFor = (amountOwed) => {
  const progressOnThisHundred = amountOwed % 100;
  const scale = d3.scaleLinear().clamp(true).domain([0, 100]).range([0, 1]);
  return scale(progressOnThisHundred);
};

export default function MoneyMoney(props) {
  const { likes, comments, retweets, cashMoneySpec } = props;

  const amountOwed =
    likes * cashMoneySpec.perLike +
    comments * cashMoneySpec.perComment +
    retweets * cashMoneySpec.perRetweet;

  useVibration(props.device, vibrationFor(amountOwed));

  return (
    <h1>
      {cashMoneySpec.currency}
      {amountOwed}
    </h1>
  );
}
