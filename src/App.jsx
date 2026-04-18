import { RouterProvider } from "react-router-dom"
import { router } from "./app/router";
import AppInitializer from "./components/AppInitializer"; 

function App() {
  return (
    <>
      <AppInitializer/>
      <RouterProvider router = {router}/>
    </>
  )

}

export default App
