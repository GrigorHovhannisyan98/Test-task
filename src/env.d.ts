export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            DB: string;
            DB_USERNAME: string;
            DB_PASS: string;
            DB_HOST: string;
        }
    }
}
