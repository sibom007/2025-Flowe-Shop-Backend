import { Server } from "http";
import app from "./app";
import config from "./config";

async function main() {
    const server: Server = app.listen(config.port, () => {
        console.log(`server is runing in port ${config.port}`);
    })
}
main()
