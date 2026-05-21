import http from 'node:http';
export declare const launchStaticWebServer: (basePath: string) => Promise<{
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    port: number;
    url: string;
}>;
