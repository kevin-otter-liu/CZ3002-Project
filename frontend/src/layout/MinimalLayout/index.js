import { Outlet } from "react-router-dom";

// project imports
import Customization from "../Customization";
import Header from "./Header";

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
  <>
    <Header />
    <Outlet />
    <Customization />
  </>
);

export default MinimalLayout;
