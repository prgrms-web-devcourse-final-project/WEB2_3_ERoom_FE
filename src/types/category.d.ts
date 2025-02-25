interface CategoryType {
  category?: string;
  subCategories1?: string[];
  subCategories2?: string[];
}

interface SelectCategoryProps {
  selectedData: CategoryType;
  setSelectedData: React.Dispatch<React.SetStateAction<selectedData>>;
}
