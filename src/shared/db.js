const getItem = (key) => {
  let storedCouValues = localStorage.getItem("couApp_" + key);
  if (storedCouValues) {
    storedCouValues = JSON.parse(storedCouValues);
  }
  return storedCouValues;
};

const setItem = (key, val) => {
  localStorage.setItem("couApp_" + key, JSON.stringify(val));
};

export { getItem, setItem };
