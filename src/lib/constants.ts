/*
  General constants for use throughout the site
*/

export const SITE = {
  name: "Solfate",
  url:
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000"
      : "https://solfate.com",
};

export const NICK = {
  name: "Nick Frostbutter",
  twitter: "@nickfrosty",
  username: "nickfrosty",
  twitterUrl: "https://twitter.com/nickfrosty",
  website: "https://nick.af",
};

export const TWITTER = {
  handle: "@SolfatePod",
  username: "SolfatePod",
  url: "https://twitter.com/SolfatePod",
};

export const GITHUB = "https://github.com/solfate";
