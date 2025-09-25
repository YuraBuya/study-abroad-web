// Public API client for fetching data from the public API endpoints

import { SchoolDTO, BrochureDTO } from './dto';

interface ApiError extends Error {
  status?: number;
  info?: any;
}

// Helper function to handle API errors
async function handleApiError(response: Response): Promise<never> {
  const errorText = await response.text();
  const error = new Error(
    `API Error: ${response.status} ${response.statusText} - ${errorText}`
  ) as ApiError;
  error.status = response.status;
  error.info = errorText;
  throw error;
}

// Generic fetcher for public API endpoints
export async function fetchPublicApi<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// Fetch schools with optional filters
export async function fetchSchools(params?: {
  type?: 'university' | 'language' | 'graduate';
  q?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ items: SchoolDTO[]; total: number; page: number; pageSize: number }> {
  const searchParams = new URLSearchParams();
  
  if (params?.type) searchParams.append('type', params.type);
  if (params?.q) searchParams.append('q', params.q);
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString());
  
  const queryString = searchParams.toString();
  const url = `/api/public/schools${queryString ? `?${queryString}` : ''}`;
  
  return fetchPublicApi(url);
}

// Fetch a single school by slug
export async function fetchSchoolBySlug(slug: string): Promise<SchoolDTO> {
  return fetchPublicApi(`/api/public/schools/${slug}`);
}

// Fetch brochures for a school
export async function fetchBrochures(params: {
  schoolId?: string;
  slug?: string;
}): Promise<BrochureDTO[]> {
  const searchParams = new URLSearchParams();
  
  if (params.schoolId) searchParams.append('schoolId', params.schoolId);
  if (params.slug) searchParams.append('slug', params.slug);
  
  const queryString = searchParams.toString();
  const url = `/api/public/brochures${queryString ? `?${queryString}` : ''}`;
  
  return fetchPublicApi(url);
}