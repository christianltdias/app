'use client'
 
import { useRouter } from 'next/navigation';
import Button from "../components/buttons/common/button";
import PageComponent from "../components/page/page";
import DatePicker from '../components/pickers/date/datepicker';

export default function Page() {
  const router = useRouter()

  return (
    <PageComponent title="Home">
      <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
      <DatePicker allowPastSelect={false} isDateRange/>
    </PageComponent>
  );
}