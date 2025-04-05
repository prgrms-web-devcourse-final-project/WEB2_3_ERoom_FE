import { useEffect, useState } from "react";
import AdminButton from "../../common/AdminButton";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../../../api/adminCategory";
import AdminTagChart from "./AdminTagChart";
import TagCountBox from "./TagCountBox";
import axios from "axios";
import AdminCategoryBox from "./AdminCategoryBox";
import AdminSubCategoryBox from "./AdminSubCategoryBox";
import AdminDetailTagBox from "./AdminDetailTagBox";

const AdminTag = () => {
  const { data: allCategories, error } = useQuery<AllCategoryType[]>({
    queryKey: ["AllCategory"],
    queryFn: getAllCategory,
    retry: false,
  });

  useEffect(() => {
    if (error && axios.isAxiosError(error) && error.response?.status === 403) {
      console.warn(" 403 오류 발생 → Not Found 페이지로 이동");
      window.location.href = "/not-found"; // 강제 이동
    }
  }, [error]);

  const [isTagList, setIsTagList] = useState("tagList");

  const handleButtonClick = (type: "tagList" | "tagData") => {
    setIsTagList(type);
  };

  // 클릭된 분야 id
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  // 클릭된 세부항목 Id
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    number | null
  >(null);

  useEffect(() => {
    setSelectedSubCategoryId(null);
  }, [selectedCategoryId]);

  return (
    <div className="h-[calc(100vh-50px)] bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0">
      <div className="min-h-[calc(100vh-80px)] mx-[30px] mb-[30px] px-[30px] pt-[30px] flex flex-col  bg-white/60">
        <div className="pl-[20px] mb-[30px]">
          <span className="text-[22px] font-bold text-main-green">
            태그 정보
          </span>
        </div>
        <div className="flex mb-[30px]">
          <div className="flex gap-[10px]">
            <AdminButton
              text="태그 목록"
              type={isTagList === "tagList" ? "green" : "white"}
              onClick={() => handleButtonClick("tagList")}
            />
            <AdminButton
              text="태그 데이터"
              type={isTagList === "tagData" ? "green" : "white"}
              onClick={() => handleButtonClick("tagData")}
            />
          </div>
        </div>

        {isTagList === "tagList" ? (
          <div className="flex w-full gap-[30px]">
            {/* 분야 */}
            <AdminCategoryBox
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              setSelectedSubCategoryId={setSelectedSubCategoryId}
            />

            {/* 세부항목 */}
            <AdminSubCategoryBox
              categoryId={selectedCategoryId}
              selectedSubCategoryId={selectedSubCategoryId}
              setSelectedSubCategoryId={setSelectedSubCategoryId}
            />

            {/* 상세항목 */}
            <AdminDetailTagBox subCategoryId={selectedSubCategoryId} />
          </div>
        ) : (
          <div className="w-full">
            <div className="flex gap-5 mb-[80px]">
              <TagCountBox title="총 분야 수" count={allCategories?.length} />
              <TagCountBox
                title="총 세부항목 수"
                count={allCategories?.reduce(
                  (acc, category) => acc + category.subcategories.length,
                  0
                )}
              />
              <TagCountBox
                title="총 상세항목 수"
                count={allCategories?.reduce((acc, category) => {
                  return (
                    acc +
                    category.subcategories.reduce((subAcc, subcategory) => {
                      return subAcc + subcategory.tags.length;
                    }, 0)
                  );
                }, 0)}
              />
            </div>
            <AdminTagChart />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTag;
