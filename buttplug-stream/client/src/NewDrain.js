import React, { useState } from "react";
import { useImmer } from "use-immer";
import { DateTime } from "luxon";
import { DateTimePicker } from "react-rainbow-components";

export default function NewDrain() {
  const [drain, updateDetails] = useImmer({
    conversationId: "",
    currency: "$",
    perLike: "5",
    perComment: "5",
    perRetweet: "5",
    until: DateTime.local().plus({ hours: 1 }),
  });
  const [url, setUrl] = useState(null);

  const areDetailsComplete = Object.values(drain).every((v) => Boolean(v));
  const urlFromDetails = () =>
    `http://localhost:3000/drain/${drain.conversationId}/${drain.currency}/${
      drain.perLike
    }/${drain.perComment}/${drain.perRetweet}/${drain.until.toMillis()}`;

  const update = ({ target: { value } }, key) =>
    updateDetails((draft) => {
      draft[key] = value;
    });

  const onGenerate = () => setUrl(urlFromDetails());

  return (
    <main>
      <div>
        <label htmlFor="conversationId">Conversation ID: </label>
        <input
          id="conversationId"
          type="text"
          onChange={(e) => update(e, "conversationId")}
          value={drain.conversationId}
        />
      </div>
      <div>
        <label htmlFor="currency">Currency: </label>
        <input
          type="text"
          onChange={(e) => update(e, "currency")}
          value={drain.currency}
        />
      </div>
      <div>
        <label htmlFor="perLike">{drain.currency} per Like: </label>
        <input
          type="text"
          onChange={(e) => update(e, "perLike")}
          value={drain.perLike}
        />
      </div>
      <div>
        <label htmlFor="perComment">{drain.currency} per Comment: </label>
        <input
          type="text"
          onChange={(e) => update(e, "perComment")}
          value={drain.perComment}
        />
      </div>
      <div>
        <label htmlFor="perRetweet">{drain.currency} per Retweet: </label>
        <input
          type="text"
          onChange={(e) => update(e, "perRetweet")}
          value={drain.perRetweet}
        />
      </div>
      <div>
        <label htmlFor="until">Until: </label>
        <DateTimePicker
          id="until"
          value={drain.until}
          onChange={(value) =>
            updateDetails((draft) => {
              draft.until = DateTime.fromJSDate(value);
            })
          }
          formatStyle="large"
          locale="en-US"
          okLabel="OK"
          cancelLabel="Cancel"
        />
      </div>
      <div>
        <button onClick={onGenerate} disabled={!areDetailsComplete}>
          Drain Them
        </button>
      </div>
      <div>{url && <a href={url}>{url}</a>}</div>
    </main>
  );
}
