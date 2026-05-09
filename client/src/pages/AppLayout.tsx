import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";

const AppLayout = () => {
  return (
    <>
      <Banner />
      <p>navbar</p>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <p>footer</p>
      <p>cartsidebar</p>
    </>
  );
};

export default AppLayout;
