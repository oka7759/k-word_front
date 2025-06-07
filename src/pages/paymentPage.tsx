import CommonTable from "@/components/common/CommonTable";
import { useEffect, useState } from "react";
import type { PaymentResp } from "@/types/api";
import { payData } from "@/api/paymentApi";

function PaymentPage() {
  const [payment, setPayment] = useState<PaymentResp>();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const resp = await payData();
        setPayment(resp);
      } catch (error) {
        console.error("Failed to fetch sellers", error);
      }
    };

    fetchSellers();
  }, []);

  return (
    <>
      <h4 className="font-semibold text-gray-800 text-theme-xl">
        셀러별 판매 수량
      </h4>
      <CommonTable
        columns={["Id", "셀러 이름", "코드", "국가", "1개월 ", "3개월"]}
        data={payment?.sellerList ?? []}
        renderRow={(seller, idx) => (
          <>
            <td key={`seller-name-${idx}`} className="px-6 py-4">
              {seller.id}
            </td>
            <td key={`seller-country-${idx}`} className="px-6 py-4">
              {seller.name}
            </td>
            <td key={`seller-code-${idx}`} className="px-6 py-4">
              {seller.code}
            </td>
            <td key={`seller-code-${idx}`} className="px-6 py-4">
              {seller.country}
            </td>
            <td key={`seller-code-${idx}`} className="px-6 py-4">
              {seller.countMonthly}
            </td>
            <td key={`seller-code-${idx}`} className="px-6 py-4">
              {seller.countQuarterly}
            </td>
          </>
        )}
      />

      <h4 className="font-semibold text-gray-800 text-theme-xl mt-10">
        모든 구매 이력
      </h4>

      <CommonTable
        columns={["Id", "OS", "상품명", "구매자", "국가", "셀러명", "결제일"]}
        data={payment?.payList ?? []}
        renderRow={(payment, idx) => (
          <>
            <td key={`seller-name-${idx}`} className="px-6 py-4">
              {payment.id}
            </td>
            <td key={`seller-country-${idx}`} className="px-6 py-4">
              {payment.os}
            </td>
            <td key={`seller-code-${idx}`} className="px-6 py-4">
              {payment.productName}
            </td>
            <td key={`seller-code-${idx}`} className="px-6 py-4">
              {payment.username}
            </td>
            <td key={`seller-code-${idx}`} className="px-6 py-4">
              {payment.sellerCountry}
            </td>
            <td key={`seller-code-${idx}`} className="px-6 py-4">
              {payment.sellerName}
            </td>
            <td key={`seller-code-${idx}`} className="px-6 py-4">
              {payment.createdAt.substring(0, 10)}
            </td>
          </>
        )}
      />
    </>
  );
}

export default PaymentPage;
