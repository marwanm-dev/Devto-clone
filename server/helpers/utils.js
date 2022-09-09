const rand = (min, max) => (min + Math.random() * (max - min)).toFixed(0);

const getRandomColor = () => `hsl(${rand(1, 360)},${rand(0, 100)}%,${rand(15, 85)}%,1)`;

module.exports = { getRandomColor };
