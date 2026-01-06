export function getScale(containerWidth: number) {
  if (containerWidth < 600) return 0.65;
  if (containerWidth < 900) return 0.8;
  return 1;
}