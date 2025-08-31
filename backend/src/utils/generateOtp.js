export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const orderNumber = () => {
  return [...Array(24)]
    .map(() => Math.floor(Math.random() * 16).toString(16)) // hex characters
    .join("");
};
