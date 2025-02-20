import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { Plus, Pencil, Trash2, DollarSign } from "lucide-react";
import { api } from "./api";
import { Seller, SellerFormData } from "./types";
import { SellerForm } from "./components/SellerForm";
import Footer from "./components/Footer";

function App() {
  const [sellers, setSellers] = React.useState<Seller[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [selectedSeller, setSelectedSeller] = React.useState<Seller | null>(
    null
  );

  const fetchSellers = async () => {
    try {
      const response = await api.getSellers();
      setSellers(response.data);
    } catch (error) {
      toast.error("Failed to fetch sellers");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSellers();
  }, []);

  const handleAddSeller = async (data: SellerFormData) => {
    try {
      await api.addSeller(data);
      toast.success("Seller added successfully");
      fetchSellers();
      setShowForm(false);
    } catch (error) {
      toast.error("Failed to add seller");
    }
  };

  const handleUpdateSeller = async (data: SellerFormData) => {
    if (!selectedSeller) return;
    try {
      await api.updateSeller(selectedSeller._id, data);
      toast.success("Seller updated successfully");
      fetchSellers();
      setSelectedSeller(null);
    } catch (error) {
      toast.error("Failed to update seller");
    }
  };

  const handleDeleteSeller = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this seller?")) return;
    try {
      await api.deleteSeller(id);
      toast.success("Seller deleted successfully");
      fetchSellers();
    } catch (error) {
      toast.error("Failed to delete seller");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              Seller Management
            </h1>
            <p className="text-2xl font-bold text-blue-400">By Hashim</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={38} />
            Add New Seller
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">
                    Account Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">
                    Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-large text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sellers.map((seller) => (
                  <tr key={seller._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {seller.account_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {seller.branch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-900">
                        {seller.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-500 truncate max-w-xs">
                        {seller.description || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(seller.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedSeller(seller)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={22} />
                        </button>
                        <button
                          onClick={() => handleDeleteSeller(seller._id)}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={22} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {sellers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No sellers found. Click the "Add Seller" button to create
                      one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {(showForm || selectedSeller) && (
        <SellerForm
          onSubmit={selectedSeller ? handleUpdateSeller : handleAddSeller}
          onClose={() => {
            setShowForm(false);
            setSelectedSeller(null);
          }}
          initialData={selectedSeller || undefined}
          title={selectedSeller ? "Edit Seller" : "Add New Seller"}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
