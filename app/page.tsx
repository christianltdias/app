'use client'
 
import { useRouter } from 'next/navigation'
import Button from "../components/buttons/common/button";
import Table, {HeadItem} from "../components/table/table";
import PageComponent from "../components/page/page";
import styles from './page.module.sass'
import PopUp from '../components/popup/popup';
import { useRef, useState } from 'react';
import DragContainer from '../components/container/drag/dragcontainer';

export default function Page() {
  const router = useRouter()
  const ref = useRef(null)
  const [isPopUpOpen, setPopUpOpen] = useState(false)

  var header = [
    {name: 'Name', field: 'name', type: 'text', sort: true},
    {name: 'Last Name', field: 'lastname', type: 'text', sort: true},
    {name: 'Age', field: 'age', type: 'number', sort: true},
    {name: 'Height', field: 'height', type: 'number', sort: true},
    {name: 'City', field: 'city', type: 'text', sort: true},
    {name: 'State', field: 'state', type: 'text'}
  ] as HeadItem[];

  const values = [
    {name: 'Chris', lastname: 'Leite Dias', age: '29', height: '1.73m', city: 'Nova Friburgo'},
    {name: 'Julia', lastname: 'Abreu Daflon', age: '25', height: '1.24m', city: 'Balneário'},
    {name: 'Elaine', lastname: 'Leite Dias', age: '58', height: '1.54m', city: 'Nova Friburgo'},
    {name: 'Alvaro', lastname: 'Reis Dias', age: '66', height: '1.74m', city: 'Cordeiro'},
    {name: 'Victor', lastname: 'Leite Dias', age: '41', height: '1.74m', city: 'Nova Friburgo'},
    {name: 'Ace', lastname: 'D. Leite', age: '0.3', height: '0.2m', city: 'Rio de Janeiro'},
    {name: 'Lily', lastname: 'Daflon Leite', age: '4', height: '0.3m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
    {name: 'Luna', lastname: 'Daflon Leite', age: '5', height: '0.27m', city: 'Nova Friburgo'},
  ]

  const dragitems = [
    <div className={styles.test}><h1>This is a test</h1> Test 1</div>,
    <div className={styles.test}><button>2</button></div>,
    <div className={styles.test}><h1>This is a test</h1> Test 2</div>,
    <div className={styles.test}><button>4</button></div>,
    <div className={styles.test}><button>5</button></div>,
    <div className={styles.test}><h1>This is a test</h1> Test 3</div>,
    <div className={styles.test}><Button ref={ref} onClick={() => setPopUpOpen(!isPopUpOpen)}>Open Pop Up</Button></div>,
  ];

  return (
    <PageComponent title="Home">
      <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
      {/* <Button ref={ref} onClick={() => setPopUpOpen(!isPopUpOpen)}>Open Pop Up</Button>
      {isPopUpOpen && <PopUp onClose={()=> setPopUpOpen(false)} ref={ref}><div><h1>PopUp</h1><p>I'm a popup</p></div></PopUp> } */}
      <DragContainer items={dragitems}  count={3} />
    </PageComponent>
  );
}