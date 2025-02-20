import React, { useState } from "react";
import { SellerFormData, Seller } from "../types";
import { X } from "lucide-react";

interface Props {
  onSubmit: (data: SellerFormData) => void;
  onClose: () => void;
  initialData?: Seller;
  title: string;
}

export function SellerForm({ onSubmit, onClose, initialData, title }: Props) {
  const [formData, setFormData] = useState<SellerFormData>({
    account_name: initialData?.account_name || "",
    branch: initialData?.branch || "",
    amount: initialData?.amount || 0,
    description: initialData?.description || "",
    date: initialData?.date || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.account_name.trim()) {
      newErrors.account_name = "Oops..Account Name is required";
    }

    if (!formData.branch.trim()) newErrors.branch = "Oops..Branch is required";

    // if (!formData.date || isNaN(new Date(formData.date).getTime()))
    //   newErrors.date = "Please select a valid date";

    if (formData.amount <= 0) newErrors.amount = "Enter Your Valid Amount";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Account Name
            </label>
            <input
              type="text"
              name="account_name"
              value={formData.account_name}
              onChange={handleChange}
              className="mt-3 mb-3 block w-full rounded-md border border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg h-12"
            />
            {errors.account_name && (
              <p className="text-red-500 text-sm">{errors.account_name}</p>
            )}
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="mt-3 mb-3 block w-full rounded-md border border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg h-12"
            />
            {errors.branch && (
              <p className="text-red-500 text-sm">{errors.branch}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-3 mb-3 block w-full rounded-md border border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg h-12 bg-white text-gray-700 hover:border-blue-400 transition-all ease-in-out duration-200"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-3 mb-3 block w-full rounded-md border border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg h-12 bg-white text-gray-700 hover:border-blue-400 transition-all ease-in-out duration-200"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-3 mb-3 block w-full rounded-md border border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 text-lg h-32 bg-white text-gray-700 hover:border-blue-400 transition-all ease-in-out duration-200 resize-none"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              {initialData ? "Update" : "Add"} Seller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
