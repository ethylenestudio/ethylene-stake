export const _safe = (fn: any) => {
  try {
    fn();
  } catch (err) {
    console.error("SAFE ERROR:", err);
  }
};
