import { seedSchools } from '@/data/schoolsData';

export default async function initializeDatabase() {
  try {
    console.log('Seeding database with initial school data...');
    await seedSchools();
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}