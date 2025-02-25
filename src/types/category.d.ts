interface CategoryType {
  category?: string;
  subCategories1?: string[];
  subCategories2?: string[];
}

interface temporaryCategory {
  category?: string;
  subCategories1?: string[];
  subCategories2?: string[];
}

interface SelectCategoryProps {
  selectedData: temporaryCategory;
  setSelectedData: React.Dispatch<React.SetStateAction<selectedData>>;
}
