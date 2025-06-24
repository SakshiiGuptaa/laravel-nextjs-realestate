// Utility function to concatenate class names
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// Utility function to convert object keys to snake_case recursively
export function toSnakeCasePayload(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map((item) => toSnakeCasePayload(item));
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        key.replace(/([A-Z])/g, "_$1").toLowerCase(),
        toSnakeCasePayload(value),
      ])
    );
  }
  return obj;
}
