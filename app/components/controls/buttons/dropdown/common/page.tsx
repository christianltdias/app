"use client";

import Dropdown from "../../../../../../shared/controls/buttons/dropdown/common/dropdown.common";
import PageComponent from "../../../../../../shared/page/page";
import styles from "../../../../page.module.sass";

export default function Page() {
  const numbers: number[] = Array.from(new Array(100),(_,index)=>index+1);
  const objs: {name: string, lastname: string, age: number}[] = [
    {name: "Christian", lastname: "Leite Dias", age: 29},
    {name: "Alvaro", lastname: "Dos Reis Dias", age: 66},
    {name: "Elaine", lastname: "Leite Dias", age: 58},
    {name: "Victor", lastname: "Leite Dias", age: 42},
    {name: "Julia", lastname: "Abreu Daflon", age: 26},
    {name: "Lili", lastname: "Abreu Daflon", age: 4},
    {name: "Luna", lastname: "Abreu Daflon", age: 5},
    {name: "Ace", lastname: "Leite Dias", age: .9},
  ];

  return (
    <PageComponent title="Controls">
      <div className={styles["example-container"]}>
        <span className={styles["example-description"]}>
          Dropdown is an user interface element that allows users to select one
          or more items from a dropdown list. Basic dropdown with a single
          select option.
        </span>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Items</h3>
            <h4 className={styles["example-prop"]}>items ({`<T>[ ]`} - accepts an array of generic type items) <span className={styles["required"]}>*required</span></h4>
          </div>
          <p className={styles["example-value"]}>simple number array</p>
          <div className={styles["row"]}>
            <Dropdown
              items={numbers}
              filterFun={(filterText) =>
                numbers.filter((i) =>
                  i.toString().startsWith(filterText)
                )
              }
              onSelect={(el) => console.log(el)}
            />
          </div>
          <p className={styles["example-value"]}>complex object (name, lastname and age) array</p>
          <div className={styles["row"]}>
            <Dropdown
              items={objs}
              renderItem={(el) => (<div><h1>{el.name}</h1><h2>{el.lastname}</h2><p>{el.age}</p></div>)}
              pickField={(el) => el.name}
              filterFun={(filterText) =>
                objs.filter((i) =>
                  i.name.toLowerCase().includes(filterText.toLowerCase()) || i.lastname.toLowerCase().includes(filterText.toLowerCase()) || i.age.toString().startsWith(filterText) 
                )
              }
              onSelect={(el) => console.log(el)}
            />
          </div>
        </div>

        <div className={styles["try-yourself"]}>
          <h1 className={styles["try-title"]}>Try yourself</h1>
          <div className={styles["row"]}>
            <div className={styles["column--center"]}>
              <Dropdown
                color="success"
                renderItem={(el) => el}
                pickField={(el) => el}
                items={numbers}
                filterFun={(filterText) =>
                  numbers.filter((i) =>
                    i.toString().startsWith(filterText)
                  )
                }
                onSelect={(el) => console.log(el)}
              />
            </div>
          </div>
          <div className={styles["column"]}>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
