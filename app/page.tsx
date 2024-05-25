'use client'
 
import { useRouter } from 'next/navigation';
import PageComponent from "../components/page/page";
import MultiOptionButton from '../components/controls/buttons/multi-option/multi-option-button';
import CheckBox from '../components/controls/inputs/checkbox/checkbox';

export default function Page() {
  const router = useRouter()

  return (
    <PageComponent title="Home">
      <MultiOptionButton 
        color='primary'
        options={[
          {
            'title': 'Go to Dashboard',
            'onClick': () => router.push('/dashboard')
          },
          {
            'title': 'Go to Details',
            'onClick': () => router.push('/dashboard/details')
          },
        ]}
      />
      <CheckBox>male</CheckBox>
      <CheckBox color='light-blue'>male</CheckBox>
      <CheckBox color='green'>male</CheckBox>
      <CheckBox color='yellow'>male</CheckBox>
    </PageComponent>
  );
}