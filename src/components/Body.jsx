import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";



export default function Body() {
    const appRouter=createBrowserRouter([
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/browse",
            element:
            <ProtectedRoute>
                  <Browse/>
            </ProtectedRoute>
          
        }
    ])
  return (
    <div>
       <RouterProvider router={appRouter}></RouterProvider>
        </div>
  )
}
