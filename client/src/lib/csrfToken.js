const CSRFToken = (cookies) => {
  const splitCookies = cookies.split(";");
  return splitCookies
    .find((cookie) => cookie.startsWith("CSRF-TOKEN="))
    .split("=")[1]
    .trim();
};

export default CSRFToken;
