interface CategoryType {
  category?: { id: number | null; name: string | undefined };
  subCategories?: SubCategoryType[];
}

interface temporaryCategory {
  category?: string;
  subCategories1?: string[];
  subCategories2?: string[];
}

interface SelectCategoryProps {
  selectedData: any;
  setSelectedData: React.Dispatch<React.SetStateAction<selectedData>>;
}

// 모든 카테고리 타입
interface AllCategoryType {
  id: number;
  name: string;
  subcategories: SubCategoryType[];
}

interface SubCategoryType {
  id: number;
  name: string;
  tags: { id: number; name: string }[];
}
