import { noticeList } from "@/api/noticeApi";
import { useEffect, useState } from "react";

interface Notice {
  id: number;
  title: string;
  content: string;
}

function noticePage() {
  const [notice, setNotice] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const data = await noticeList();
        setNotice(data);
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
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Content
            </th>
          </tr>
        </thead>
        <tbody>
          {notice.length > 0 ? (
            notice.map((notice, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {notice.id}
                </th>
                <td className="px-6 py-4">{notice.title}</td>
                <td className="px-6 py-4">{notice.content}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center">
                No notices found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default noticePage;
