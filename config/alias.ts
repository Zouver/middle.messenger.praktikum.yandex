import path from "path";

import {srcDir} from "./paths.ts";

export const alias = {
  "@": srcDir,
  "@lib": path.join(srcDir, "lib"),
  "@components": path.join(srcDir, "components"),
};
