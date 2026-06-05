import { MapPinIcon } from "lucide-react";
import type { Address } from "../types";

interface AddressCardProps {
  addr: Address;
  onEditHandler: (addr: Address) => void;
  setAddresses: (addresses: Address[]) => void;
}

const AddressCard = ({
  addr,
  onEditHandler,
  setAddresses,
}: AddressCardProps) => {
  const handleDelete = async (id: string) => {
    console.log(id);
  };
  return (
    <div
      key={addr._id}
      className="max-w-3xl bg-white rounded-2xl p-6 items-start justify-between"
    >
      {/* Left */}
      <div className="flex gap-4">
        <div className="size-10 rounded-xl bg-app-cream flex-center shrink-0">
          <MapPinIcon className="size-5 text-app-green" />
        </div>
        <div></div>
        <p>
          {addr.address}, {addr.city}, <br /> {addr.state}, {addr.zip}
        </p>
      </div>

      {/* right - action buttons */}
    </div>
  );
};

export default AddressCard;
