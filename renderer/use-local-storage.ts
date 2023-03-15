import { autorun, observable } from "mobx";
import { useEffect } from "react";

export const useLocalStorage = <T>(storageKey: string, fallbackState: T) => {
  const state = observable({
    value: JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState,
  });

  //   const setValue = () => {};
  autorun(() => {
    localStorage.setItem(storageKey, JSON.stringify(state.value));
  });
  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    state.value = JSON.parse(newValue);
  };
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state.value));
    window.addEventListener("storage", onStorageUpdate);

    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, [state.value, storageKey]);

  return [state.value];
};
