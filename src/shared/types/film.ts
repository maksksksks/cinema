export type Film = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  shortDescription?: string;
  releaseYear: number;
  duration: number;
  rating: number;
  ageLimit: number;

  poster?: {
    url: string;
  };

  category?: {
    name: string;
  };
};