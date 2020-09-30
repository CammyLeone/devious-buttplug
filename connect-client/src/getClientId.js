import * as uuid from "uuid";

export default function getClientId() {
  let id = localStorage.getItem("clientId");
  if (id) return id;

  id = uuid.v4();
  localStorage.setItem("clientId", id);
  return id;
}
