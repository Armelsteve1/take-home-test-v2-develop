import bodyParser from "body-parser";
import cors from "cors";
import rTracer from "cls-rtracer";
import express, { Router } from "express";
import helmet from "helmet";
import { clientErrorHandler, logErrors, morganMiddleware } from "./middlewares";
import routes from "./Routes";

const app = express();

routes.use("/healthCheck", (_, res) => {
  res.status(200).send({
    status: "ok",
  });
});

app.use(rTracer.expressMiddleware());
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routes);
app.use(morganMiddleware);
app.use(logErrors);
app.use(clientErrorHandler);



export default app;
