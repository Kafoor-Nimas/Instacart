import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Order } from "../types";
import Loading from "../components/Loading";
import { dummyDashboardOrdersData } from "../assets/assets";
import { ArrowLeftIcon } from "lucide-react";
import OrderOTP from "../components/OrderTracking/OrderOTP";

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [liveLocation, setLiveLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    setOrder(dummyDashboardOrdersData.find((o) => o._id === id) as any);
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <Loading />;
  if (!order) return null;
  return (
    <div className="min-h-screen mb-20 bg-app-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-sm text-app-text-light hover:text-app-green mb-6 transition-colors"
        >
          <ArrowLeftIcon className="size-4" /> Back to Orders
        </button>

        {/* order id, date, status */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-app-green">
              Order #{order!._id.slice(-8).toUpperCase()}
            </h1>
            <p className="text-sm text-app-text-light mt-1">
              Placed on
              {new Date(order!.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <span
            className={`px-4 py-1.5 text-sm font-semibold rounded-full ${order!.status === "Delivered" ? "bg-green-100 text-green-700 " : order!.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-app-orange/10 text-app-orange"}`}
          >
            {order!.status}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left side - Timeline + Map Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* OTP Card */}
            <OrderOTP order={order} />
          </div>

          {/* Right side - Order Details */}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
