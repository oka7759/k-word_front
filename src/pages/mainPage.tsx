import { dashBoard } from "@/api/dashBoardApi";
import MemberInfo from "@/components/dashboard/MemberInfo";
import type { DashBoardResp } from "@/types/api";
import { useEffect, useState } from "react";

function MainPage() {
  const [dashboard, setDashboard] = useState<DashBoardResp>();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const resp = await dashBoard();
        setDashboard(resp);
      } catch (error) {
        console.error("Failed to fetch sellers", error);
      }
    };

    fetchSellers();
  }, []);
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 ">
        <MemberInfo data={dashboard} />
      </div>
    </div>
  );
}

export default MainPage;
