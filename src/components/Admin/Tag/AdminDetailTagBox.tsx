import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { queryClient } from "../../../main";
import AdminTagBox from "./AdminTagBox";
import AdminTagAdd from "./AdminTagAdd";
import AddButton from "../../../assets/button/add_tag.svg";
import AdminTagList from "./AdminTagList";
import {
  adminAddnewDetailTag,
  adminGetDetailTag,
} from "../../../api/adminDetailTag";

interface AdminDetailTagBoxProps {
  subCategoryId: number | null;
}

const AdminDetailTagBox = ({ subCategoryId }: AdminDetailTagBoxProps) => {
  // 상세항목 데이터
  const { data: detailTags } = useQuery<{ id: number; name: string }[]>({
    queryKey: ["detailTag", subCategoryId],
    queryFn: () => adminGetDetailTag(subCategoryId),
  });

  // 상세항목 추가
  const [isAddDetailTag, setIsAddDetailTag] = useState(false);

  const handleAddDetail = () => {
    setIsAddDetailTag(true);
  };

  const { mutateAsync: addNewDetailTag } = useMutation({
    mutationFn: async ({
      subcategoryId,
      newDetailTagName,
    }: {
      subcategoryId: number;
      newDetailTagName: string;
    }) => {
      const response = await adminAddnewDetailTag(
        subcategoryId,
        newDetailTagName
      );
      console.log(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["detailTag"] });
      setIsAddDetailTag(false);
    },
  });

  const [isDetailTagClicked, setIsDetailTagClicked] = useState<number | null>(
    null
  );

  useEffect(() => {
    setIsDetailTagClicked(null);
  }, [subCategoryId]);

  return (
    <div className="flex flex-col w-full gap-[10px]">
      <span className="font-bold text-[16px] text-main-green">상세항목</span>

      <div className="flex w-full justify-end h-[27px]">
        {subCategoryId !== null && (
          <button onClick={handleAddDetail} className="cursor-pointer">
            <img src={AddButton} alt="상세항목 생성 버튼" />
          </button>
        )}
      </div>

      <AdminTagBox name="상세항목" />

      <div className="h-[400px] overflow-y-scroll scrollbar-none">
        {/* 태그 */}
        {detailTags?.map((detail, index) => (
          <AdminTagList
            key={detail.id}
            index={index}
            id={detail.id}
            name={detail.name}
            subcategoryId={subCategoryId}
            onClick={() => {}}
            isClicked={isDetailTagClicked}
            setIsClicked={setIsDetailTagClicked}
            type="detailTags"
          />
        ))}
        {isAddDetailTag && detailTags && (
          <AdminTagAdd
            index={detailTags.length}
            subcategoryId={subCategoryId}
            setIsAdd={setIsAddDetailTag}
            addType="detailTag"
            addDetailTag={(subcategoryId: number, newDetailTagName: string) =>
              addNewDetailTag({ subcategoryId, newDetailTagName })
            }
          />
        )}
      </div>
    </div>
  );
};

export default AdminDetailTagBox;
