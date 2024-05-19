import Login from "./components/credentials/Login";
import SignUp from "./components/credentials/SignUp";
import UserName from "./components/operatings/UserName";
import Contacts from "./components/operatings/Contacts";
import Chats from "./components/operatings/Chats";
import "./universal.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Login/>
    },
    {
      path:"/signup",
      element: <SignUp/>
    },
    {
      path:"/chat/:user1",
      element: (<><UserName/><div><Contacts/></div></>)
    },
    {
      path:"/chat/:user1/:user2",
      element:(<><UserName/><div style={{display:"flex",flexDirection:'row'}}><Contacts/><Chats/></div></>)
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
