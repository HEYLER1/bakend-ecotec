declare class Server {
    private app;
    private port;
    constructor();
    listen(): void;
    routes(): void;
    midlewares(): void;
    dbConnect(): Promise<void>;
}
export default Server;
//# sourceMappingURL=server.d.ts.map