'use client'
 
import { useRouter } from 'next/navigation';
import Button from "../components/buttons/common/button";
import PageComponent from "../components/page/page";
// import Spinner from '../components/spinner/spinner';
import Calendar from '../components/calendar/calendar';

export default function Page() {
  const router = useRouter()

  return (
    <PageComponent title="Home">
      <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
      <Calendar/>
    </PageComponent>
  );
}