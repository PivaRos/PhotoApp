import { hit } from "../../interfaces";

export const selectedHitReducer = (state: hit | null = null, action: any) => {
  switch (action.type) {
    case "setSelectedHit":
      return action.payload;
    default:
      return state;
  }
};
