/*
	Static configuration settings for use around the apps
*/

const configBase = {
  siteName: "Solfate",
  twitter: "SolfatePod",
};

const configDev = {
  ...configBase,
  BASE_URL: "http://localhost:3000",
  apiUrl: "http://localhost:3000/api",
};

const vercelURL = `https://${
  process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL || "Solfate.com"
}`;

const configProd = {
  ...configBase,
  BASE_URL: vercelURL || "https://Solfate.com",
  apiUrl: `${vercelURL}/api`,
};

// const config = configProd;
const config = process?.env?.NODE_ENV === "production" ? configProd : configDev;

// export { config };
export default config;
