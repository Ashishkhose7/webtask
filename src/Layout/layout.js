import { Outlet } from "react-router-dom";
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
const LayoutComponent = () => {
    return (
      <div className="container">
            <div className="">
              <Header/>
            </div>
            <div className="">
              <Outlet/>
            </div>
            <div className="">
              <Footer/>
            </div>
       </div>
    );
  }
export default LayoutComponent;  