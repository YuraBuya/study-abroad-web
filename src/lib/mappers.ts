import { School } from '@prisma/client';
import { SchoolDTO } from './dto';

// Map Prisma School model to SchoolDTO
export function mapSchoolToDTO(school: School): SchoolDTO {
  return {
    id: school.id,
    name: school.name,
    nameKorean: school.nameKorean || undefined,
    location: school.location,
    type: school.type as 'UNIVERSITY' | 'LANGUAGE_INSTITUTE' | 'GRADUATE_SCHOOL',
    logo: school.logo || undefined,
    coverImage: undefined,
    pdfUrl: school.pdfUrl || undefined,
    website: undefined,
    email: undefined,
    phone: undefined,
    description: undefined,
    tags: undefined,
    createdAt: school.createdAt.toISOString(),
    updatedAt: school.updatedAt.toISOString(),
    status: 'active', // Default status
  };
}