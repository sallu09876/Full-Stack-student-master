import { jwtDecode } from "jwt-decode";

const studentLoginKey = "SLKEY";

export const setCookie = (token) => {
  const decoded = jwtDecode(token);
  const to_utc = new Date(decoded.exp * 1000).toUTCString();

  document.cookie = `${studentLoginKey}=${token}; expires=${to_utc}; path=/`;
};

export const getCookie = () => {
  const cookies = document.cookie.split(";");

  for (const c of cookies) {
    const [key, value] = c.trim().split("=");
    if (key === studentLoginKey) {
      return value;
    }
  }
  return null;
};

export const deleteCookie = () => {
  document.cookie = `${studentLoginKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

