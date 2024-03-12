import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navbar";
import AppRoutes from "./AppRoutes";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import store from "./store";
import { persistor } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}></PersistGate>
        <div className="App">
            <BrowserRouter>
                <NavBar/>
                <AppRoutes/>
            </BrowserRouter>
        </div>  
    </Provider>
  );
}

export default App;
