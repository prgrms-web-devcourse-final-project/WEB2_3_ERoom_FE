interface CategoryType {
  name: string;
  subcategories?: {
    subname: string;
    data: { text: string; value: number }[];
  }[];
}

interface SelectCategoryProps {
  selectedData: {
    cate: string;
    subcate1: string[];
    subcate2: string[];
  };
  setSelectedData: React.Dispatch<
    React.SetStateAction<{
      cate: string;
      subcate1: string[];
      subcate2: string[];
    }>
  >;
  categoryData: CategoryType[];
}
