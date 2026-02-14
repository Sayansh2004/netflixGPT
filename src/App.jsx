import Body from "./components/Body";
import appStore from "./utils/appStore.js";
import { Provider } from "react-redux";
export default function App() {

  return (
    <div>
      <Provider store={appStore}> <Body/></Provider>
     
    </div>
  )
}



