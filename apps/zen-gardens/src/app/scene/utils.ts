const getSlotCoordsFromId = (id: string) => id.split(',').map(val => Number(val));

export const getSlotsRangeFromAxisLabelId = (id: string) => {
  const [axisX, axisY] = getSlotCoordsFromId(id);
  const data = [];
  // x === y
  let xStart = 0;
  let xEnd = axisX;
  let yStart = 0;
  let yEnd = axisY;
  if (axisX > axisY) {
    yStart = axisY;
    yEnd = axisY + 1;
  }
  if (axisX < axisY) {
    xStart = axisX;
    xEnd = axisX + 1;
  }
  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      data.push(`${x},${y}`);
    }
  }
  return data;
};
