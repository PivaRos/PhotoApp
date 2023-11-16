import express from "express";
import { PORT } from "./config/vars";
import { PictureRouter } from "./routes/pictures";
import cores from "cors";

const app = express();
app.use(cores());

app.use("/pictures", PictureRouter);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
