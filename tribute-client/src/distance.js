const pythagorean = (x, y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
const centerOfNode = (node) => {
  const rect = node.getBoundingClientRect();
  return {
    x: rect.left + (rect.right - rect.left) / 2,
    y: rect.top + (rect.bottom - rect.top) / 2,
  };
};

export const distanceToNode = (node, clientX, clientY) => {
  const center = centerOfNode(node);
  return pythagorean(clientX - center.x, clientY - center.y);
};

export const maxDistanceFromCenterOfNode = (node) => {
  const center = centerOfNode(node);
  return Math.max(
    pythagorean(center.x, center.y),
    pythagorean(window.innerWidth - center.x, center.y),
    pythagorean(center.x, window.innerHeight - center.y),
    pythagorean(window.innerWidth - center.x, window.innerHeight - center.y)
  );
};
