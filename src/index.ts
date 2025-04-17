import express from "express";
import { serverConfig } from "./config";
import apiRoutes from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, () => {
  console.log(`Successfully started the server on PORT: ${serverConfig.PORT}`);
});
