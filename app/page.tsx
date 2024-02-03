'use client'
 
import { useRouter } from 'next/navigation';
import Button from "../components/buttons/common/button";
import PageComponent from "../components/page/page";
import DatePicker from '../components/pickers/date/datepicker';
import Calendar from '../components/pickers/calendar/calendar';

export default function Page() {
  const router = useRouter()

  return (
    <PageComponent title="Home">
      <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
      <DatePicker />
      <Calendar
        allowPastSelect={true}
        allowMultipleSelect
        firstDate={new Date()}
        setFirstDate={() => console.log()}
        secondDate={new Date()}
        setSecondDate={() => console.log()}
      />
    </PageComponent>
  );
}