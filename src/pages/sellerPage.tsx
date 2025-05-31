import { sellerList } from "@/api/sellerApi";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/form/InputField";
import Label from "@/components/ui/form/Label";
import Select from "@/components/ui/form/Select";
import { Modal } from "@/components/ui/modal/Modal";
import CommonTable from "@/components/common/CommonTable";
import { useEffect, useState } from "react";
import CommonModal from "@/components/common/CommonModal";

interface Seller {
  name: string;
  country: string;
  code: string;
}
const initData: Seller = {
  name: "",
  country: "",
  code: "",
};

const options = [
  { value: "KO", label: "한국" },
  { value: "VI", label: "베트남" },
  { value: "NP", label: "네팔" },
  { value: "MY", label: "미얀마" },
  { value: "ID", label: "인도네시아" },
  { value: "JP", label: "일본" },
];

function SellerPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState<Seller>(initData);

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

  // input onChange 핸들러
  const handleChange =
    (field: keyof Seller) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setData((prev) => ({
        ...prev,
        [field]: value,
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
        title="셀러 등록"
        data={data}
        fields={[
          { key: "name", label: "이름", type: "text" },
          { key: "code", label: "코드", type: "text" },
          { key: "country", label: "국가", type: "select", options },
        ]}
        onChange={(key, value) =>
          setData((prev) => ({ ...prev, [key]: value }))
        }
        onRegister={handleRegister}
      />

      <div className="flex justify-end">
        <Button onClick={() => setShowModal(true)}>셀러 생성</Button>
      </div>

      <CommonTable
        columns={["Name", "Country", "Code"]}
        data={sellers}
        renderRow={(seller, idx) => (
          <tr key={idx} className="border-b dark:border-gray-700">
            <td className="px-6 py-4">{seller.name}</td>
            <td className="px-6 py-4">{seller.country}</td>
            <td className="px-6 py-4">{seller.code}</td>
          </tr>
        )}
      />
    </>
  );
}

export default SellerPage;
