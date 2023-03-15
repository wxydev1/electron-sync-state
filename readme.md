electron 多窗口的开发很费劲，如果你想让一份数据在不同的窗口中显示，并且实现数据修改后，ui 同步更改的功能，用 ipc 显然是费时费力的。网上关于两个窗口 ui 同步的文章也很少。

因为我工作中用的 react 和 mobx 较多，就想着一个 mobx 的 class 实例，能不能让两个窗口公用。

在 github mobx 仓库有一个 issue ，https://github.com/mobxjs/mobx/issues/1644

但是作者并没有给出实现，只是提到了因为不同窗口的 mobx 实例不同，所以做不到同步。

于是我想到能不能让其他的窗口（例如子窗口）使用来自于另一个窗口的 mobx

在窗口 A 中

```jsx
import observer from 'mobx-react-lite';
import ReactDOM from 'react-dom';
window.observer = observer;
window.ReactDOM = ReactDOM;
window.store = store;
```

在窗口 B 中

```jsx
const {observer, ReactDOM, store} = windowA;
const Component = observer(()=>{
  return <div>{store.something}</div>;
});
ReactDOM.render(<Component/>, container);
```
这样便可以用同一份数据，实现两个窗口的 ui 同步。

效果图：![效果图](https://github.com/wxydev1/electron-sync-state/raw/main/mobx.gif)



demo 链接： https://github.com/wxydev1/electron-sync-state