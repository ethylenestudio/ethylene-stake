export const _safe = (fn: any, onError?: (err: any) => void) => {
  try {
    return fn();
  } catch (err: any) {
    console.error("SAFE ERROR:", err);
    return onError?.(err);
  }
};
