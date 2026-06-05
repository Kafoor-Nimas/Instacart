import React, { useState } from "react";
import type { Address } from "../types";
import { dummyAddressData } from "../assets/assets";

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  });

  const resetForm = () => {
    setForm({
      label: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false,
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  const onEditHandler = (address: Address) => {
    setForm({
      label: address.label,
      address: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip,
      isDefault: address.isDefault,
    });
    setEditingId(address._id);
    setShowForm(true);
  };

  useEffect(() => {
    setAddresses(dummyAddressData);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return <div>Addresses</div>;
};

export default Addresses;
