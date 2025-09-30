import axios from "axios";
export const commonApI = async (httpRequst, url, reqBody, reqHeader) => {
  const config = {
    method: httpRequst,
    url,
    data: reqBody,
    headers: reqHeader,
  };
  return await axios(config)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
