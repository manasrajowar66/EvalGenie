// @types/express/index.d.ts or src/types/express.d.ts
import { JwtPayload } from "jsonwebtoken";

// Extend the Express Request type to include a `user` property
declare global {
  namespace Express {
    export interface Request {
      user?: string | JwtPayload | null; // `user` is optional, but it will be added when authenticated
    }
  }
}