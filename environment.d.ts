declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_STRING: string;
      LOCAL_PORT: string;
      DEBUG: string;
    }
  }
}

export {};
