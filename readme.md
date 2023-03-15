使用 localStorage 实现多窗口 state 同步
  
>hook 代码
```jsx
import { autorun, observable } from "mobx";
import { useEffect } from "react";

export const useLocalStorage = <T>(storageKey: string, fallbackState: T) => {
  const state = observable({
    value: JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState,
  });

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

```

>主窗口
```jsx
const App = observer(() => {
  const [store, setStore] = useLocalStorage("store", countStore);
  return (
    <div>
      <h1>I am Main Window</h1>
      <button
        onClick={() => {
          const win = window.open("child.html");
        }}
      >
        Open Child Window
      </button>
      <div>store.count = {store.count}</div>
      <button
        onClick={() => {
          store.count--;
        }}
      >
        minus-
      </button>
      <button
        onClick={() => {
          store.count++;
        }}
      >
        plus+
      </button>
    </div>
  );
});
```

>子窗口
```jsx
const Child = observer(() => {
  const [store, setStore] = useLocalStorage('store', null);

  return (
    <div>
      <h1 onClick={() => {
        store.count ++
      }}>I am Child Window</h1>
      <div>store.count = {store.count}</div>
    </div>
  );
});
```

>效果图

![效果图]( https://github.com/wxydev1/electron-sync-state/raw/main/mobx.gif)


>demo 链接：

https://github.com/wxydev1/electron-sync-state