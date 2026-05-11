const CartSlidebar = () => {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-50 transition-opacity">
        {/* Sidebar */}
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-alide-in-right"></div>
      </div>
    </>
  );
};

export default CartSlidebar;
