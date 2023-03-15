import { observer } from "mobx-react-lite";
import ReactDOM from "react-dom";
import { useLocalStorage } from "./use-local-storage";

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

ReactDOM.render(<Child />, document.getElementById("root"));
