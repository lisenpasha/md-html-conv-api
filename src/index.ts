import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import Router from "./routes";
import { applyGeneralSecurityMiddleware } from "./middleware/generalSecurity";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerConfig from "./swaggerDocs/swaggerConfig";


const PORT = process.env.PORT || 12345;

const app: Application = express();
// Swagger setup
const swaggerDocs = swaggerJsdoc(swaggerConfig);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Apply general security middleware
applyGeneralSecurityMiddleware(app);

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", Router);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
