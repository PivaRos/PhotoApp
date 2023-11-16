import PhotoGrid from "./components/PhotoGrid";
import { useSelector } from "react-redux";

function App() {
  const loading = useSelector((state: any) => state.loading);

  return (
    <>
      <div>
        {!loading ? (
          <PhotoGrid limit={9} />
        ) : (
          <div>
            <h2>loading...</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
