const loadState = () => {
  try {
    const serailizedState = localStorage.getItem("store");
    if (serailizedState === null) {
      return undefined;
    } else {
      return JSON.parse(serailizedState);
    }
  } catch (error) {
    console.log(error.message);
    return undefined;
  }
};

const saveState = state => {
  try {
    const serailizedState = JSON.stringify(state);
    localStorage.setItem("store", serailizedState);
  } catch (error) {
    console.log(error.message);
  }
};

export { loadState, saveState };
