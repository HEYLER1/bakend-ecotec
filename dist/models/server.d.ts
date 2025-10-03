import '../models/associations';
declare class Server {
    private app;
    private port;
    constructor();
    listen(): void;
    routes(): void;
    midlewares(): void;
    frontend(): void;
    dbConnect(): Promise<void>;
}
export default Server;
//# sourceMappingURL=server.d.ts.map