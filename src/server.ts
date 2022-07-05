import { config } from "dotenv";
import app from "./app";
config();

const { LOCAL_HOST, LOCAL_HOST_PORT } = process.env;

const PORT: string = LOCAL_HOST_PORT || "8900";
const HOST: string = LOCAL_HOST || "localhost";

app.listen(PORT, () => console.log(`Server started on http://${HOST}:${PORT}`));
