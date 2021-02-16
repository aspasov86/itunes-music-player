export const getLargerImageSrc = (src, size) => {
  const splitSrc = src.split('/');
  splitSrc[splitSrc.length - 1] = `${size}x${size}bb.jpg`;
  return splitSrc.join('/');
};
