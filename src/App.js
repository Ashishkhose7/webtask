import './App.css';
import { RouterProvider } from "react-router-dom";
import router from './Router/router';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
