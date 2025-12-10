import { dirname as pathDirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";

export const dirname = pathDirname(fileURLToPath(import.meta.url));
export const rootDir = path.resolve(dirname, "..");
export const srcDir = path.resolve(rootDir, "src");
