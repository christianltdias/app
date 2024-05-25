'use client'
 
import { useRouter } from 'next/navigation';
import PageComponent from "../components/page/page";
import MultiOptionButton from '../components/buttons/multi-option/multi-option-button';

export default function Page() {
  const router = useRouter()

  return (
    <PageComponent title="Home">
      <MultiOptionButton color='cancel' onClick={() => router.push('/dashboard')}>Dashboard</MultiOptionButton>
    </PageComponent>
  );
}