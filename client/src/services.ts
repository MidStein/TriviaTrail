const getCategories = async (): Promise<string[]> => {
  const res = await fetch('/api/categories');
  const categories: string[] = await res.json();
  categories.sort();
  return categories;
};

interface Question {
  id: number;
  difficulty: string;
  question: string;
  correctAnswer: boolean;
}
const getOneCategoryData = async (category: string): Promise<Question[]> => {
  const res = await fetch(`/api/${category}`);
  const questions: Question[] = await res.json();
  return questions;
};

export {
  getCategories,
  getOneCategoryData,
};
