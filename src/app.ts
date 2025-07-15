import express from 'express';
import { handleError } from 'middleware/ErrorHandle';
import { routes } from 'web/routes/index';
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(handleError);

export { app };