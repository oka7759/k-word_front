import React, { useState } from "react";
import * as XLSX from "xlsx";
import Button from "@/components/ui/button/Button";
import Label from "@/components/ui/form/Label";
import Select from "@/components/ui/form/Select";
import { Modal } from "@/components/ui/modal/Modal";

interface ExcelRow {
  category: string;
  deck: string;
  card: string;
  face1: string;
  face2: string;
  face3: string;
  face4: string;
}

interface ExcelData {
  fn: string;
  category: string;
  deck: string;
  data: ExcelRow[];
}

const options = [
  { value: "🇺🇸", label: "ENG" },
  { value: "🇰🇷", label: "KOR" },
  { value: "🇻🇳", label: "VI" },
  { value: "🇳🇵", label: "NP" },
  { value: "🇲🇲", label: "MY" },
  { value: "🇮🇩", label: "ID" },
  { value: "🇯🇵", label: "JP" },
  { value: "🇪🇸", label: "EP" },
];

type LanguageSelection = {
  aLang: { value: string; label: string } | null;
  bLang: { value: string; label: string } | null;
  cLang: { value: string; label: string } | null;
  dLang: { value: string; label: string } | null;
};

function contentsPage() {
  const [excelData, setExcelData] = useState<ExcelData>({
    fn: "",
    category: "",
    deck: "",
    data: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRow, setTotalRow] = useState(0);
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageSelection>(
    {
      aLang: null,
      bLang: null,
      cLang: null,
      dLang: null,
    }
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.name.includes(".xlsx")) {
      alert("지원하지 않는 파일 형식입니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      if (typeof bstr !== "string") return;

      const workbook = XLSX.read(bstr, { type: "binary" });
      const headers = [
        "category",
        "deck",
        "card",
        "face1",
        "face2",
        "face3",
        "face4",
      ];
      const rows: ExcelRow[] = XLSX.utils.sheet_to_json(
        workbook.Sheets["Template"],
        { header: headers }
      ) as ExcelRow[];
      const detail = rows.splice(0, 3);
      const result: ExcelData = {
        fn: file.name,
        category: detail[0]?.card || "",
        deck: detail[1]?.card || "",
        data: rows,
      };

      if (rows.length > 6000) {
        alert("최대 6000개의 카드까지 가능합니다.");
        return;
      }

      setExcelData(result);
      setTotalRow(result.data.length);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    setShowModal(false);
    setIsLoading(true);
    const data = {
      excelData: excelData.data,
      category: excelData.category,
      deck: excelData.deck,
      language: {
        a: selectedLanguages.aLang?.value || null,
        b: selectedLanguages.bLang?.value || null,
        c: selectedLanguages.cLang?.value || null,
        d: selectedLanguages.dLang?.value || null,
      },
    };
    console.log(JSON.stringify(data));
  };

  return (
    <div>
      {/* 드래그 영역 */}
      <div
        className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="dz-message flex flex-col items-center p-10">
          <div className="mb-[22px] flex justify-center flex-col items-center gap-3.5">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <svg
                className="fill-current"
                width="29"
                height="28"
                viewBox="0 0 29 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-800 text-theme-xl">
              Drag & Drop Files Here
            </h4>
          </div>
        </div>
      </div>

      {/* 업로드 버튼 */}

      {/* 파일 정보 */}
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 mt-6">
        <h4 className="font-semibold text-gray-800 text-theme-xl mb-6">
          파일 정보
        </h4>
        <div className="grid grid-cols-1 gap-4 gap-x-32">
          <div>
            <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
              파일명:
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {excelData.fn}
            </p>
          </div>
          <div>
            <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
              카테고리 명
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {excelData.category}
            </p>
          </div>
          <div>
            <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
              덱 명:
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {excelData.deck}
            </p>
          </div>
        </div>
      </div>

      <div className="text-right p-6">
        <Button disabled={totalRow === 0} onClick={() => setShowModal(true)}>
          Deck 생성
        </Button>
      </div>

      {/* 언어 선택 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 mt-6">
        {(["aLang", "bLang", "cLang", "dLang"] as const).map((id, idx) => (
          <div key={id}>
            <Label htmlFor={id}>
              {String.fromCharCode(65 + idx)}면 언어 선택
            </Label>
            <Select
              options={options}
              placeholder={`:: ${String.fromCharCode(65 + idx)}면 언어 ::`}
              onChange={(value) => {
                setSelectedLanguages((prev) => ({
                  ...prev,
                  [id]: options.find((opt) => opt.value === value) || null,
                }));
              }}
              defaultValue={selectedLanguages[id]?.value || ""}
              className=" mt-1"
            />
          </div>
        ))}
      </div>

      {/* 테이블 렌더링 */}
      <table className="w-full mt-8 border text-sm">
        <thead>
          <tr className="table-fixed text-center ">
            <th className="py-5 w-[5%]">No.</th>
            <th className="py-5 w-[5%]">카테고리</th>
            <th className="py-5 w-[5%]">덱</th>
            <th className="py-5 w-[5%]">카드</th>
            <th className="py-5">A면</th>
            <th className="py-5">C면</th>
            <th className="py-5">D면</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {excelData.data.map((row, idx) => (
            <tr key={idx} className="">
              <td>{idx + 1}</td>
              {[
                "category",
                "deck",
                "card",
                "face1",
                "face2",
                "face3",
                "face4",
              ].map((key) => (
                <td key={key}>
                  {key.includes("face") ? (
                    <textarea
                      value={(row as any)[key]}
                      readOnly
                      className="w-full border bg-gray-50 p-1 rounded"
                    />
                  ) : (
                    <input
                      value={(row as any)[key]}
                      readOnly
                      className="w-full border bg-gray-50 p-1 rounded h-full"
                    ></input>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 모달 */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          className="w-xl"
        >
          <div className="p-6">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800">
                컨텐츠 업데이트
              </h4>
              <p className="mb-6 text-sm text-gray-500  lg:mb-7">
                컨텐츠를 업데이트 하시겠습니까?
              </p>
            </div>
            <div className="flex justify-between gap-4">
              <Button onClick={handleSubmit} className="w-full">
                OK
              </Button>
              <Button
                onClick={() => setShowModal(false)}
                className="w-full"
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default contentsPage;
