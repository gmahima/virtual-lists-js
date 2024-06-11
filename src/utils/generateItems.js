export const generateItems = (number) => {
  const items = [];
  for (let index = 0; index < number; index++) {
    items[index] = {name: `Item ${index + 1}`, index};
  }
  return items;
};
