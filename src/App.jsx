import "./App.css";
import { RouterProvider } from "react-router-dom";
import { NexusRouter } from './routes/NexusRouter.jsx'

function App() {
  return (
    <>
      <RouterProvider router={NexusRouter} />
    </>
  );
}

export default App;
