export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://app.crave.com/api/v1"
    : "http://localhost:8000/api/v1";

export const TOKEN_NAME = "__crave";
export const USER_ID = "__c.id";
