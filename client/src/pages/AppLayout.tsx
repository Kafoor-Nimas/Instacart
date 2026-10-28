import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartSlidebar from "../components/CartSlidebar";
import ChatWidget from "../components/ChatWidget";
import { useState } from "react";

const AppLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <>
      <Banner />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <CartSlidebar />

      {/* Global Floating Chat Widget */}
      {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default AppLayout;
