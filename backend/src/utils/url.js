// utils/url.js

export const getFrontendUrl = () => {
  return process.env.FRONTEND_URL || "http://localhost:3000";
};

export const getBackendUrl = () => {
  return process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 7000}`;
};