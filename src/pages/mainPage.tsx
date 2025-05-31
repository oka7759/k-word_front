import MemberInfo from "@/components/dashboard/MemberInfo";

function MainPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 ">
        <MemberInfo />
      </div>
    </div>
  );
}

export default MainPage;
