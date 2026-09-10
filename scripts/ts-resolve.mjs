import { statSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SRC = new URL("../src/", import.meta.url);
const EXTS = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];

function isFile(url) {
  try {
    return statSync(fileURLToPath(url)).isFile();
  } catch {
    return false;
  }
}

export function resolve(specifier, context, next) {
  const isAlias = specifier.startsWith("@/");
  const isRelative = specifier.startsWith(".");
  if (isAlias || isRelative) {
    const base = isAlias
      ? new URL(specifier.slice(2), SRC)
      : new URL(specifier, context.parentURL);
    for (const ext of EXTS) {
      const candidate = new URL(base.href + ext);
      if (isFile(candidate)) return next(candidate.href, context);
    }
  }
  return next(specifier, context);
}
