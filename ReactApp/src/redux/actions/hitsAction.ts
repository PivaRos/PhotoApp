import { PageinationResponse, hit } from "../../interfaces";

export const HitsAction = (payload: PageinationResponse<hit>) => {
  return {
    type: "setHits",
    payload,
  };
};
