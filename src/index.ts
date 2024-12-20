import { ARIARole } from "./types/aria";

export { default as babelPlugin } from "./babel/plugin";
export { createTransformer as typescriptTransformer } from "./typescript/transformer";
export * from "./types/aria";

// src/types/jsx.d.ts
import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    role?: ARIARole;
  }

  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    alt: string; // Make alt required
  }
}