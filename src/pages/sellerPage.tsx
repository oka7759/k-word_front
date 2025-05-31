import { sellerList } from "@/api/sellerApi";
import { useEffect, useState } from "react";

interface Seller {
  name: string;
  country: string;
  code: string;
  email: string;
}

function SellerPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const data = await sellerList();
        setSellers(data);
      } catch (error) {
        console.error("Failed to fetch sellers", error);
      }
    };

    fetchSellers();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              code
            </th>
            <th scope="col" className="px-6 py-3">
              email
            </th>
          </tr>
        </thead>
        <tbody>
          {sellers.length > 0 ? (
            sellers.map((seller, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {seller.name}
                </th>
                <td className="px-6 py-4">{seller.country}</td>
                <td className="px-6 py-4">{seller.code}</td>
                <td className="px-6 py-4">{seller.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center">
                No sellers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SellerPage;
