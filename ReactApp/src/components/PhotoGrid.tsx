import { useDispatch, useSelector } from "react-redux";
import { PageinationResponse, hit } from "../interfaces";
import { useEffect, useRef, useState } from "react";
import { Network } from "../utilities";
import { HitsAction } from "../redux/actions/hitsAction";
import "../styles/PhotoGrid.css";
import { SelectedHitAction } from "../redux/actions/selectedHitAction";
import { ModalViewer } from "./modalViewer";

interface PhotoGridProps {
  limit: number;
}

const PhotoGrid = ({ limit }: PhotoGridProps) => {
  const [category, setCategory] = useState("work");
  const pageination = useSelector(
    (state: any) => state.pageination
  ) as PageinationResponse<hit> | null;

  const selectedHit = useSelector((state: any) => state.selectedHit);

  let drawerRef = useRef<HTMLDivElement>(null);
  let drawerTogglerRef = useRef<HTMLDivElement>(null);

  const Dispatch = useDispatch();

  useEffect(() => {
    Network.getPictures(category, 1, limit)
      .then((pageination) => {
        console.log(pageination);
        if (!pageination) return;
        Dispatch(HitsAction(pageination));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [category]);

  const nextClick = async () => {
    if (!pageination || !pageination.next) return;
    const newPageination = await Network.getPictures(
      category,
      pageination?.next?.page,
      limit
    );
    if (!newPageination) return;
    Dispatch(HitsAction(newPageination));
  };

  const prevClick = async () => {
    if (!pageination || !pageination.previous) return;
    const newPageination = await Network.getPictures(
      category,
      pageination?.previous?.page,
      limit
    );
    if (!newPageination) return;
    Dispatch(HitsAction(newPageination));
  };

  const hitClicked = (hit: hit) => {
    Dispatch(SelectedHitAction(hit));
    //open modal
    drawerRef.current?.classList.add("openDrawer");
    drawerTogglerRef.current?.classList.add("OpenDrawerToggle");
  };

  //function that closes the drawer
  const CloseDrawer = () => {
    drawerRef.current?.classList.remove("openDrawer");
    drawerTogglerRef.current?.classList.remove("OpenDrawerToggle");
  };

  return (
    <div className="main-div">
      <div className="header">
        {pageination?.previous && (
          <button className="button-16" onClick={prevClick}>
            prev
          </button>
        )}

        <select
          defaultValue={"work"}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>animals</option>
          <option>work</option>
          <option>swim</option>
          <option>sport</option>
          <option>art</option>
        </select>

        <button className={"button-16"} onClick={nextClick}>
          next
        </button>
      </div>
      <div className="grid">
        {pageination &&
          pageination.result.map((hit: hit, index) => {
            return (
              <div
                key={`hitNumber:${index}`}
                onClick={() => hitClicked(hit)}
                className="img-div"
              >
                <img src={hit.previewURL} />
              </div>
            );
          })}
      </div>
      {selectedHit && (
        <>
          <div
            style={{
              height: "80vh",
              width: "50vw",
              position: "fixed",
              zIndex: 10,
              top: 10,
            }}
            className="Drawer"
            ref={drawerRef}
          >
            <ModalViewer hit={selectedHit} />
          </div>
          <div
            className="DrawerToggle"
            ref={drawerTogglerRef}
            onClick={CloseDrawer}
            style={{
              position: "fixed",
              height: "100vh",
              width: "100vw",
              backgroundColor: "black",
              opacity: 0,
              zIndex: 9,
              top: 0,
            }}
          ></div>
        </>
      )}
    </div>
  );
};

export default PhotoGrid;
