import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import ReactDOM from "react-dom";

const App = observer(() => {
  return (
    <div>
      <h1>I am Main Window</h1>
      <button
        onClick={() => {
          const win = window.open("child.html");
          win.addEventListener("load", () => {
            (win as any).childWindow.render();
          });
        }}
      >
        Open Child Window
      </button>
      <div>store.count = {store.count}</div>
      <button
        onClick={() => {
          store.setCount(store.count - 1);
        }}
      >
        minus-
      </button>
      <button
        onClick={() => {
          store.setCount(store.count + 1);
        }}
      >
        plus+
      </button>
    </div>
  );
});
class Store {
  count: number = 0;
  constructor() {
    makeAutoObservable(this);
  }
  setCount(count: number) {
    this.count = count;
  }
}
const store = new Store();
ReactDOM.render(<App />, document.getElementById("root"));
// assign to window
// mainWindow is the parent window
export interface MainWindow extends Window {
  observer: typeof observer;
  store: Store;
  ReactDOM: typeof ReactDOM;
}

const mainWindow = window as any as MainWindow;
mainWindow.ReactDOM = ReactDOM;
mainWindow.store = store;
mainWindow.observer = observer;
