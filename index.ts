import { app } from "./app";
import "./config/models";
import { syncModels } from "./config/models";
import { PORT } from "./env";

syncModels();
app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
