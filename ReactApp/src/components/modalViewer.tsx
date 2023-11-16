import { hit } from "../interfaces";
import { GrLinkBottom } from "react-icons/gr";
import { PrettyDisplay } from "./prettyDisplay";
import { AiOutlineLike } from "react-icons/ai";

interface ModalViewerProps {
  hit: hit;
}
export const ModalViewer = ({ hit }: ModalViewerProps) => {
  return (
    <div
      className="box-shadow"
      style={{
        height: "80vh",
        width: "50vw",
        zIndex: 10,
        position: "relative",
        borderRadius: "10px",
        userSelect: "none",
        backgroundColor: "white",
        padding: "0",
      }}
    >
      <img src={hit.largeImageURL} />
      <div
        style={{
          width: "100vw",
          position: "absolute",
          bottom: 0,
          backgroundColor: "white",
          left: 0,
        }}
      >
        <label>id: {hit.id}</label>
        <label>
          {" "}
          comments:
          <PrettyDisplay num={hit.comments} />
        </label>

        <label>
          {" "}
          <GrLinkBottom />
          <PrettyDisplay num={hit.downloads} />
        </label>
        <label>
          <AiOutlineLike />
          <PrettyDisplay num={hit.likes} />
        </label>
        <label> tags: {hit.tags}</label>
      </div>
    </div>
  );
};
