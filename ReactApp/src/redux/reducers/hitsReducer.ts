import { PageinationResponse, hit } from "../../interfaces";

export const hitsReducer = (
  state: PageinationResponse<hit> | null = null,
  action: any
) => {
  switch (action.type) {
    case "setHits":
      return action.payload;
    default:
      return state;
  }
};
