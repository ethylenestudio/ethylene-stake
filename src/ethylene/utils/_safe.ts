export const _safe = (fn: any, onError?: (err: any) => void) => {
  try {
    fn();
  } catch (err: any) {
    onError?.(err);
    console.error("SAFE ERROR:", err);
  }
};
