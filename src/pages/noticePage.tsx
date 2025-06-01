import { noticeList } from "@/api/noticeApi";
import CommonModal from "@/components/common/CommonModal";
import CommonTable from "@/components/common/CommonTable";
import Button from "@/components/ui/button/Button";
import type { NoticeListResp } from "@/types/api";
import { useEffect, useState } from "react";

interface Notice {
  id?: number;
  title: string;
  content: string;
}
const initData: Notice = {
  title: "",
  content: "",
};

function noticePage() {
  const [notice, setNotice] = useState<NoticeListResp[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState<Notice>(initData);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await noticeList();
        setNotice(data);
      } catch (error) {
        console.error("Failed to fetch sellers", error);
      }
    };

    fetchNotices();
  }, []);

  const handleRegister = () => {
    console.log("등록 데이터:", data);

    setShowModal(false);

    setData(initData);
  };

  return (
    <>
      <CommonModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setData(initData);
        }}
        title="공지 등록"
        data={data}
        fields={[
          { key: "title", label: "제목", type: "text" },
          { key: "content", label: "내용", type: "textarea" },
        ]}
        onChange={(key, value) =>
          setData((prev) => ({ ...prev, [key]: value }))
        }
        onRegister={handleRegister}
      />
      <div className="flex justify-end">
        <Button onClick={() => setShowModal(true)}>공지사항 등록</Button>
      </div>
      <CommonTable
        columns={["ID", "Title", "Content", "language", "image"]}
        data={notice}
        renderRow={(n, idx) => (
          <tr key={idx} className="border-b dark:border-gray-700">
            <td className="px-6 py-4">{n.id}</td>
            <td className="px-6 py-4">{n.title}</td>
            <td className="px-6 py-4">{n.content}</td>
            <td className="px-6 py-4">{n.language}</td>
            <td className="px-6 py-4">{n.imageUrl}</td>
          </tr>
        )}
      />
    </>
  );
}

export default noticePage;
