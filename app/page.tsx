"use client";

import { useRouter } from "next/navigation";
import PageComponent from "../shared/page/page";
import { useAppDispatch } from "../store/store";
import Dropdown from "../shared/controls/buttons/dropdown/common/dropdown.common";
import MultiSelectDropdown from "../shared/controls/buttons/dropdown/multi/dropdown.multi";

type Test = {
  name: string,
  lastname: string,
  age: number
}

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items: Test[] = [
    {name: "Christian", lastname: "Leite Dias", age: 29},
    {name: "Elaine", lastname: "Leite Dias", age: 58},
    {name: "Victor", lastname: "Leite Dias", age: 42},
    {name: "Alvaro", lastname: "Dos Reis Dias", age: 66},
    {name: "Julia", lastname: "Abreu Daflon", age: 26},
    {name: "Ace", lastname: "Leite Dias", age: .8},
    {name: "Lili", lastname: "Abreu Daflon", age: 4},
    {name: "Luna", lastname: "Abreu Daflon", age: 5},
  ];
  return (
    <PageComponent title="Home">
      <div style={{display: "flex", gap: "50px"}}>
        <Dropdown
          items={items}
          color="success"
          renderItem={(el) => (<div><h1>{el.name}</h1><h2>{el.lastname}</h2><p>{el.age}</p></div>)}
          pickField={(el) => el.name}
          filterFun={(filterText) =>
            items.filter((i) =>
              i.name.toLowerCase().includes(filterText.toLowerCase()) || i.lastname.toLowerCase().includes(filterText.toLowerCase()) || i.age.toString().startsWith(filterText) 
            )
          }
        />

        <MultiSelectDropdown
          items={items}
          color="danger"
          renderItem={(el) => (<div><h1>{el.name}</h1><h2>{el.lastname}</h2><p>{el.age}</p></div>)}
          pickField={(el) => el.name}
          filterFun={(filterText) =>
            items.filter((i) =>
              i.name.toLowerCase().includes(filterText.toLowerCase()) || i.lastname.toLowerCase().includes(filterText.toLowerCase()) || i.age.toString().startsWith(filterText) 
            )
          }
        />
      </div>
    </PageComponent>
  );
}
