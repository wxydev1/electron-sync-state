import { MainWindow } from "./main";

const childWindow = {
  render() {
    // get from mainWindow
    const { observer, store, ReactDOM } = window.opener as MainWindow;

    const Child = observer(() => {
      return (
        <div>
          <h1>I am Child Window</h1>
          <div>store.count = {store.count}</div>
        </div>
      );
    });

    ReactDOM.render(<Child />, document.getElementById("root"));
  },
};
(window as any).childWindow = childWindow;
