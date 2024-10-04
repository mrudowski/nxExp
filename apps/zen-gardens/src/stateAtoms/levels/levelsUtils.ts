export const arrayMove = <T>(arr: T[], fromIndex: number, toIndex: number) => {
  const newArr = arr.slice();
  newArr.splice(Math.max(toIndex, 0), 0, newArr.splice(fromIndex, 1)[0]);
  return newArr;
};

export const getLayerDefaultName = (id: string) => {
  return `Layer ${id}`;
};
