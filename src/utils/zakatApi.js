import axios from "axios";

export const calculateZakatApi = async (payload) => {
  const { data } = await axios.post(
    "/api/zakat/calculate",
    payload
  );

  return data.data;
};