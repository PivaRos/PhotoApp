import axios from "axios";
import { PageinationResponse, hit } from "./interfaces";
import { ApiUri } from "./config/variables";
export const Network = {
  getPictures: async (category: string, page: number, limit: number) => {
    try {
      const url = new URL(
        `/pictures/${category}?page=${page}&limit=${limit}`,
        ApiUri || "http://localhost:8080"
      );
      const data = (
        await axios.request({
          baseURL: url.toString(),
        })
      ).data as PageinationResponse<hit>;
      return data;
    } catch (e) {
      return;
    }
  },
};
