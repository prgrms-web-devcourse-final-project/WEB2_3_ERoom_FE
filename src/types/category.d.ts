interface CategoryType {
  category?: string;
  subCategories1?: {
    name: string;
    data: string[];
  };
  subCategories2?: {
    name: string;
    data: string[];
  };
}

interface SelectCategoryProps {
  selectedData: CategoryType;
  setSelectedData: React.Dispatch<React.SetStateAction<selectedData>>;
}
