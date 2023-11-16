import { hit } from "../../interfaces";

export const SelectedHitAction = (payload: hit) => {
  return {
    type: "setSelectedHit",
    payload,
  };
};
