import { addSeller, sellerList } from "@/api/sellerApi";
import Button from "@/components/ui/button/Button";
import CommonTable from "@/components/common/CommonTable";
import { useEffect, useState } from "react";
import CommonModal from "@/components/common/CommonModal";
import type { MemberResp, SellerResp } from "@/types/api";
import { countryOptions } from "@/data/countryOptions";
import { memberList } from "@/api/memberApi";

function MemberPage() {
  const [members, setMembers] = useState<MemberResp>([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const resp = await memberList();
        setMembers(resp);
      } catch (error) {
        console.error("Failed to fetch sellers", error);
      }
    };

    fetchSellers();
  }, []);

  return (
    <>
      <CommonTable
        columns={["Id", "Name", "Email", "가입일"]}
        data={members}
        renderRow={(member, idx) => (
          <>
            <td key={`seller-name-${idx}`} className="px-6 py-4">
              {member.id}
            </td>
            <td key={`seller-country-${idx}`} className="px-6 py-4">
              {member.name}
            </td>
            <td key={`seller-code-${idx}`} className="px-6 py-4">
              {member.email}
            </td>
            <td key={`seller-code-${idx}`} className="px-6 py-4">
              {member.joinDate.substring(0, 10)}
            </td>
          </>
        )}
      />
    </>
  );
}

export default MemberPage;
