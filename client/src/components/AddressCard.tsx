import { CheckIcon, MapPinIcon, PencilIcon, Trash2Icon } from "lucide-react";
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
      className="max-w-3xl bg-white rounded-2xl p-6 flex items-start justify-between"
    >
      {/* Left */}
      <div className="flex gap-4">
        <div className="size-10 rounded-xl bg-app-cream flex-center shrink-0">
          <MapPinIcon className="size-5 text-app-green" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold text-app-green">{addr.label}</p>
            {addr.isDefault && (
              <span className="flex-center gap-1 px-2.5 py-0.5 text-[10px] font-medium bg-app-green text-white rounded-full">
                <CheckIcon className="size-2.5" />
                Default
              </span>
            )}
          </div>
          <p className="text-sm text-app-text-light">
            {addr.address}, {addr.city}, <br /> {addr.state}, {addr.zip}
          </p>
        </div>
      </div>

      {/* right - action buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onEditHandler(addr)}
          className="p-2 text-app-text-light hover:text-app-green hover:bg-app-cream rounded-lg transition-colors"
        >
          <PencilIcon className="size-4" />
        </button>
        <button
          onClick={() => handleDelete(addr._id)}
          className="p-2 text-app-text-light hover:text-app-error hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2Icon className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
