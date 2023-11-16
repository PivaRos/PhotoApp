import axios from "axios";
import { Uri, UriKey } from "./config/vars";
import { UriResponseData } from "./interfaces";

export const Network = {
  getPhotos: async (category: string) => {
    try {
      const response = await axios.request({
        baseURL: Uri,
        params: { key: UriKey, q: category },
      });
      const data = response.data as UriResponseData;

      return data.hits;
    } catch (e) {
      console.log(e);
      return;
    }
  },
};
