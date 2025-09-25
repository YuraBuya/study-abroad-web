// School DTO
export interface SchoolDTO {
  id: string;
  name: string;
  nameKorean?: string;
  location: string;
  type: 'UNIVERSITY' | 'LANGUAGE_INSTITUTE' | 'GRADUATE_SCHOOL';
  logo?: string;
  coverImage?: string;
  pdfUrl?: string;
  website?: string;
  email?: string;
  phone?: string;
  description?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive';
}

// Brochure DTO
export interface BrochureDTO {
  id: string;
  name: string;
  slug: string;
  url: string;
  uploaded: string;
}