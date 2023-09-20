const getSettings = () => {
  let storedSettings = localStorage.getItem("couApp_settings");
  if (storedSettings) {
    storedSettings = JSON.parse(storedSettings);
  } else {
    storedSettings = {
      useThirdBranch: true,
      useGov: true,
    };
  }
  return storedSettings;
};

const saveSettings = (settings) => {
  localStorage.setItem("couApp_settings", JSON.stringify(settings));
};

export { getSettings, saveSettings };
