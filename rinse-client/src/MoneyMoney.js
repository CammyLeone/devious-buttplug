import React from "react";

export default function MoneyMoney(props) {
  const { likes, comments, retweets, cashMoneySpec } = props;

  const amountOwed =
    likes * cashMoneySpec.perLike +
    comments * cashMoneySpec.perComment +
    retweets * cashMoneySpec.perRetweet;

  return (
    <h1>
      {cashMoneySpec.currency}
      {amountOwed}
    </h1>
  );
}
