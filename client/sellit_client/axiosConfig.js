import axios from "axios";
// import https from "https";
import CryptoJS from "crypto-js";

const apiKey = "695818fb-4c50-4daa-a4ba-a74c4d9d6b77";
const apiSecret = "test";

const instance = axios.create({
  // .. where we make our configurations
  // baseURL: "http://10.10.52.71:5000/api",
  baseURL: "https://sellitapi.herokuapp.com/api/v1",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const requestBody = JSON.stringify(config.data);
  const endpointUrl = config.url;
  const message = `${requestBody}:${endpointUrl}`;
  const signature = CryptoJS.HmacSHA256(message, apiSecret).toString(
    CryptoJS.enc.Hex
  );
  config.headers["X-Signature"] = signature;
  config.headers["X-ApiKey"] = apiKey;
  config.headers[
    "Authorization"
  ] = `Bearer df155663-d328-41a3-aca1-5b9b3c69c1f5`;
  // `Bearer e73deaa0-e745-47b7-a88f-1e3df031fe8f`;
  return config;
});

export default instance;
