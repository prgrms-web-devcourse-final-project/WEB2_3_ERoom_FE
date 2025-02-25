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

interface temporaryCategory {
  category?: string;
  subCategories1?: string[];
  subCategories2?: string[];
}

interface SelectCategoryProps {
  selectedData: temporaryCategory;
  setSelectedData: React.Dispatch<React.SetStateAction<selectedData>>;
}
