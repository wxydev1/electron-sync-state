import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import ReactDOM from "react-dom";
import { useLocalStorage } from "./use-local-storage";

class Store {
  count: number = 0;
  constructor() {
    makeAutoObservable(this);
  }
  setCount(count: number) {
    this.count = count;
  }
}
const countStore = new Store();

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

ReactDOM.render(<App />, document.getElementById("root"));
// assign to window
// mainWindow is the parent window
export interface MainWindow extends Window {
  observer: typeof observer;
  store: Store;
  ReactDOM: typeof ReactDOM;
}
