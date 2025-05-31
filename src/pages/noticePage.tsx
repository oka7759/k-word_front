import { noticeList } from "@/api/noticeApi";
import CommonModal from "@/components/common/CommonModal";
import CommonTable from "@/components/common/CommonTable";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/form/InputField";
import Label from "@/components/ui/form/Label";
import TextArea from "@/components/ui/form/TextArea";
import { Modal } from "@/components/ui/modal/Modal";
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
  const [notice, setNotice] = useState<Notice[]>([]);
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
  const handleChange =
    (field: keyof Notice) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  // textarea 핸들러 (TextArea 용)
  const handleTextAreaChange = (value: string) => {
    setData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  // 등록 버튼 클릭
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
        columns={["ID", "Title", "Content"]}
        data={notice}
        renderRow={(n, idx) => (
          <tr key={idx} className="border-b dark:border-gray-700">
            <td className="px-6 py-4">{n.id}</td>
            <td className="px-6 py-4">{n.title}</td>
            <td className="px-6 py-4">{n.content}</td>
          </tr>
        )}
      />
    </>
  );
}

export default noticePage;
