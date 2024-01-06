import { SUPPORTED_TYPES, SupportedType } from "./types";

export function isSupportedType(type: unknown): type is SupportedType {
  return (
    // @ts-ignore
    typeof type === "string" && type !== null && SUPPORTED_TYPES.includes(type)
  );
}
