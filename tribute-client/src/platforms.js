const PAYPAL = "paypal";
const CASHAPP = "cashapp";
const VENMO = "venmo";

export const ALL_PLATFORMS = [PAYPAL, CASHAPP, VENMO];
export const PLATFORM = { PAYPAL, CASHAPP, VENMO };

const URLS = {
  [PAYPAL]: (name) => `https://paypal.me/${name}`,
  [CASHAPP]: (name) => `https://cash.app/${name}`,
};

const IDENTIFIERS = {
  [PAYPAL]: "user name",
  [CASHAPP]: "$cashtag",
};

const LABELS = {
  [PAYPAL]: "PayPal",
  [CASHAPP]: "Cash App",
  [VENMO]: "Venmo",
};

export const urlFor = (platform, name) => URLS[platform](name);
export const identifierFor = (platform) => IDENTIFIERS[platform];
export const labelFor = (platform) => LABELS[platform];
