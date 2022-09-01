export const calcReadingTime = body => {
  const minWpm = 200;
  const maxWpm = 250;
  const words = body.trim().split(/\s+/).length;
  const minEstimated = words / minWpm;
  const maxEstimated = words / maxWpm;
  return Math.ceil(minEstimated + maxEstimated);
};

export const decreaseOpacity = (color, lessOpacityValue = 0.15) => {
  if (color) {
    const currentOpacity = color.lastIndexOf(color.substring(color.length - 2, color.length - 1));
    const lessOpacityColor =
      color.substring(0, currentOpacity) + lessOpacityValue + color.substring(currentOpacity + 1);
    return lessOpacityColor;
  } else return color;
};
