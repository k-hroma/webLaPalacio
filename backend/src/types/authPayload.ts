import express from "express";

interface AuthPayload { 
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export { AuthPayload }