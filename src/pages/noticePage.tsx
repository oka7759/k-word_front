import { noticeList } from "@/api/noticeApi";
import CommonModal from "@/components/common/CommonModal";
import CommonTable from "@/components/common/CommonTable";
import Button from "@/components/ui/button/Button";
import { countryOptions } from "@/data/countryOptions";
import type { NoticeListResp } from "@/types/api";
import { useEffect, useState } from "react";

const initData: NoticeListResp = {
  title: "",
  content: "",
  language: "",
  startAt: "",
  expiredAt: "",
  imageUrl: null,
};

function noticePage() {
  const [notice, setNotice] = useState<NoticeListResp[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState<NoticeListResp>(initData);

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

  const handleUpdate = () => {
    console.log("수정 데이터:", data);
    setShowModal(false);
    setData(initData);
  };

  const handleDelete = () => {
    console.log("삭제 데이터:", data);
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
          {
            key: "language",
            label: "국가",
            type: "select",
            options: countryOptions,
          },
          { key: "startAt", label: "시작일", type: "date" },
          { key: "expiredAt", label: "종료일", type: "date" },
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
        columns={["ID", "Title", "Content", "language", "게시 기간"]}
        data={notice}
        selectable
        onRowSelect={(item) => {
          setData(item);
          setShowModal(true);
        }}
        renderRow={(n, idx) => (
          <>
            <td key={`notice-id-${idx}`} className="px-6 py-4">
              {n.id}
            </td>
            <td key={`notice-title-${idx}`} className="px-6 py-4">
              {n.title}
            </td>
            <td key={`notice-content-${idx}`} className="px-6 py-4">
              {n.content}
            </td>
            <td key={`notice-language-${idx}`} className="px-6 py-4">
              {n.language}
            </td>
            <td key={`notice-start-${idx}`} className="px-6 py-4">
              {n.startAt} ~ {n.expiredAt}
            </td>
          </>
        )}
      />
    </>
  );
}

export default noticePage;
