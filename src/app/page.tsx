import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HomeClient from './HomeClient';

// 서버에서 필요한 데이터는 여기서 fetch 가능
export default async function Page() {
  // const data = await getData(); // 서버 데이터 로드 가능
  return <HomeClient /* initialData={data} */ />;
}
