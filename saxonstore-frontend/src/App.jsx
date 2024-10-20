import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <div className="flex h-screen items-center justify-center text-xl">
        <div>SaxonStore by SaxonScripts</div>
      </div>
    </Provider>
  );
}

export default App;
