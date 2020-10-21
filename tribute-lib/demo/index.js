const PAY_URLS = {
  PAYPAL: (name) => `https://paypal.me/${name}`,
  CASHAPP: (name) => `https://cashapp.com/${name}`,
  VENMO: (name) => `https://paypal.me/${name}`,
};

function urlHasPaymentLink() {
  return false;
}

function parsePaymentUrl(url) {
  [platform, displayName] = url.match(
}

const getTributeURL = ({displayName, platform}) => "http://localhost:3000/platform/displayName";

function maybeDisplayURL() {
  const displayName = document.getElementById("#displayName");
  const platform = document.getElementById("#platform");
  if (displayName  && platform) {
    const a = document.createElement("button");
    a.innerHTML = "";
    a.href = getTributeURL({displayName, platform});
    document.getElementById("#url").appendChild(a);
  }
}

function renderForm() {
  document.getElementById("#displayName").onchange = maybeDisplayURL;
  document.getElementById("#platform").onchange = maybeDisplayURL;
}

function hideForm() {
  document.getElementById("#form").setAttribute("display", "none");
}

if (urlHasPaymentLink()) {
  hideForm();
  const {platform, displayName} = getPaymentLink();
  document.getElementById("#tributeButton").append(
    `<a href="${PAY_URLS[platform](displayName)}">Pay me on ${PAY_NAMES[platform]}: ${displayName}</a>`
  );
} else {
  renderForm();
}
