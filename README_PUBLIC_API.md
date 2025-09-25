# Public API Implementation

This document provides documentation for the public API endpoints implemented for the study abroad web application.

## Overview

The public API exposes data uploaded via the Admin interface (schools, brochures, etc.) to the public user site. All endpoints are read-only and do not require authentication.

## Base URL

```
/api/public
```

## Endpoints

### 1. List Schools

```
GET /api/public/schools
```

#### Query Parameters

| Parameter | Type   | Description                          | Example          |
|-----------|--------|--------------------------------------|------------------|
| type      | string | Filter by school type                | university       |
| q         | string | Search keyword                       | seoul            |
| page      | number | Page number (1-based)                | 1                |
| pageSize  | number | Number of items per page             | 10               |

#### Response

```json
{
  "items": [
    {
      "id": "clxxxxxx",
      "name": "Seoul National University",
      "nameKorean": "서울대학교",
      "location": "Seoul, South Korea",
      "type": "UNIVERSITY",
      "logo": "/logos/snu.png",
      "pdfUrl": "/brochures/snu.pdf",
      "website": "https://www.snu.ac.kr",
      "description": "Seoul National University is a national research university located in Seoul, South Korea.",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "status": "active"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 10
}
```

### 2. Get School by Slug

```
GET /api/public/schools/{slug}
```

#### Path Parameters

| Parameter | Type   | Description     |
|-----------|--------|-----------------|
| slug      | string | School ID/slug  |

#### Response

```json
{
  "id": "clxxxxxx",
  "name": "Seoul National University",
  "nameKorean": "서울대학교",
  "location": "Seoul, South Korea",
  "type": "UNIVERSITY",
  "logo": "/logos/snu.png",
  "pdfUrl": "/brochures/snu.pdf",
  "website": "https://www.snu.ac.kr",
  "description": "Seoul National University is a national research university located in Seoul, South Korea.",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "status": "active"
}
```

### 3. Get Brochures

```
GET /api/public/brochures
```

#### Query Parameters

| Parameter | Type   | Description     | Example          |
|-----------|--------|-----------------|------------------|
| schoolId  | string | School ID       | clxxxxxx         |
| slug      | string | School slug     | seoul-university |

#### Response

```json
[
  {
    "id": "brxxxxxx",
    "name": "Admission Brochure 2023",
    "slug": "admission-brochure-2023",
    "url": "/brochures/snu-admission-2023.pdf",
    "uploaded": "2023-01-01T00:00:00.000Z"
  }
]
```

## Data Transfer Objects (DTOs)

### SchoolDTO

| Field        | Type              | Description                  |
|--------------|-------------------|------------------------------|
| id           | string            | Unique identifier            |
| name         | string            | School name                  |
| nameKorean   | string (optional) | Korean name                  |
| location     | string            | Location (city, country)     |
| type         | enum              | UNIVERSITY, LANGUAGE_INSTITUTE, GRADUATE_SCHOOL |
| logo         | string (optional) | Logo URL                     |
| coverImage   | string (optional) | Cover image URL              |
| pdfUrl       | string (optional) | PDF brochure URL             |
| website      | string (optional) | Official website             |
| email        | string (optional) | Contact email                |
| phone        | string (optional) | Contact phone                |
| description  | string (optional) | Description                  |
| tags         | string[] (optional)| Tags                        |
| createdAt    | string (ISO)      | Creation timestamp           |
| updatedAt    | string (ISO)      | Last update timestamp        |
| status       | enum              | active, inactive             |

### BrochureDTO

| Field    | Type         | Description           |
|----------|--------------|-----------------------|
| id       | string       | Unique identifier     |
| name     | string       | Brochure name         |
| slug     | string       | URL-friendly name     |
| url      | string       | Brochure URL          |
| uploaded | string (ISO) | Upload timestamp      |

## Caching

All public API endpoints implement caching with the following headers:

```
Cache-Control: s-maxage=60, stale-while-revalidate=300
```

This means:
- Content is cached for 60 seconds
- Content can be served stale for up to 300 seconds while revalidation happens in the background

## Error Handling

All endpoints return appropriate HTTP status codes:

| Status Code | Description              |
|-------------|--------------------------|
| 200         | Success                  |
| 400         | Bad Request (validation) |
| 404         | Not Found                |
| 500         | Internal Server Error    |

Error responses include a descriptive message:

```json
{
  "error": "School not found"
}
```

## Usage Examples

### Fetching Universities

```javascript
// Fetch universities with pagination
const response = await fetch('/api/public/schools?type=university&page=1&pageSize=10');
const data = await response.json();
```

### Searching for Schools

```javascript
// Search for schools in Seoul
const response = await fetch('/api/public/schools?q=seoul');
const data = await response.json();
```

### Getting School Details

```javascript
// Get details for a specific school
const response = await fetch('/api/public/schools/clxxxxxx');
const school = await response.json();
```

## Client-Side Integration

The application includes a reusable API client (`/src/lib/api-client.ts`) for fetching data from the public API endpoints with proper error handling and caching.

### Example Usage

```typescript
import { fetchSchools, fetchSchoolBySlug } from '@/lib/api-client';

// Fetch universities
const universities = await fetchSchools({ type: 'university' });

// Fetch a specific school
const school = await fetchSchoolBySlug('seoul-national-university');
```

## Security

- All endpoints are read-only
- No authentication required for public endpoints
- No internal notes or secrets are exposed
- Input validation with Zod
- Error messages don't expose internal details