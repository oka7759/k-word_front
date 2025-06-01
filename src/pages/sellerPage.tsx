import { addSeller, sellerList } from "@/api/sellerApi";
import Button from "@/components/ui/button/Button";
import CommonTable from "@/components/common/CommonTable";
import { useEffect, useState } from "react";
import CommonModal from "@/components/common/CommonModal";
import type { SellerResp } from "@/types/api";
import { countryOptions } from "@/data/countryOptions";

const initData: Seller = {
  name: "",
  country: "",
  code: "",
};

function SellerPage() {
  const [sellers, setSellers] = useState<SellerResp[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState<Seller>(initData);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const resp = await sellerList();
        setSellers(resp);
      } catch (error) {
        console.error("Failed to fetch sellers", error);
      }
    };

    fetchSellers();
  }, []);

  // 등록 버튼 클릭
  const handleRegister = async () => {
    try {
      const res = await addSeller(data);
      setSellers(res);
    } catch (e) {
      console.error(e);
    } finally {
      setShowModal(false);
      setData(initData);
    }
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
          {
            key: "country",
            label: "국가",
            type: "select",
            options: countryOptions,
          },
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
          <>
            <td key={`seller-name-${idx}`} className="px-6 py-4">
              {seller.name}
            </td>
            <td key={`seller-country-${idx}`} className="px-6 py-4">
              {seller.country}
            </td>
            <td key={`seller-code-${idx}`} className="px-6 py-4">
              {seller.code}
            </td>
          </>
        )}
      />
    </>
  );
}

export default SellerPage;
