import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navbar";
import AppRoutes from "./AppRoutes";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import store from "./store";
import { persistor } from "./store";
import { reportWebVitals } from './reportWebVitals';

//React router used to define routes

function App() {
  return (
    <Provider store={store}>
      {/* Persistor */}
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

reportWebVitals(console.log);

export default App;
