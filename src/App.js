import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes/routes";
import ResponsiveAppBar from "./components/AppBar";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <div>
      <ResponsiveAppBar />
      <div style={{ marginTop: "5em" }}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
