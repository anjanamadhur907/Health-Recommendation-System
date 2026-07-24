import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Prediction from "./pages/Prediction";
import "./App.css";

function App(){
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Prediction />}/>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
      />
    </>
  )
}

export default App;