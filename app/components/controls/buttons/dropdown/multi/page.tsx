"use client";

import { useState } from "react";
import { BadgeColors } from "../../../../../../shared/badge/badge";
import PageComponent from "../../../../../../shared/page/page";
import styles from "../../../../page.module.sass"
import MultiSelectDropdown from "../../../../../../shared/controls/buttons/dropdown/multi/multidropdown.common";

export default function Page() {
  const [color, setColor] = useState<BadgeColors>("default");

  const numbers: number[] = Array.from(new Array(100), (_, index) => index + 1);
  const objs: { name: string; lastname: string; age: number }[] = [
    { name: "Christian", lastname: "Leite Dias", age: 29 },
    { name: "Alvaro", lastname: "Dos Reis Dias", age: 66 },
    { name: "Elaine", lastname: "Leite Dias", age: 58 },
    { name: "Victor", lastname: "Leite Dias", age: 42 },
    { name: "Julia", lastname: "Abreu Daflon", age: 26 },
    { name: "Lili", lastname: "Abreu Daflon", age: 4 },
    { name: "Luna", lastname: "Abreu Daflon", age: 5 },
    { name: "Ace", lastname: "Leite Dias", age: 0.9 },
  ];
  const colors: BadgeColors[] = [
    "default",
    "danger",
    "info",
    "success",
    "warning",
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
            <h4 className={styles["example-prop"]}>
              items ({`<T>[ ]`} - accepts an array of generic type items){" "}
              <span className={styles["required"]}>*required</span>
            </h4>
          </div>
          <p className={styles["example-value"]}>simple number array</p>
          <div className={styles["row"]}>
            <MultiSelectDropdown
              items={numbers}
              filterFun={(filterText) =>
                numbers.filter((i) => i.toString().startsWith(filterText))
              }
              // onSelect={(el) => console.log(el)}
            />
          </div>
          <p className={styles["example-value"]}>
            complex object (name, lastname and age) array
          </p>
          <div className={styles["row"]}>
            <MultiSelectDropdown
              items={objs}
              renderItem={(el) => (
                <div>
                  <h1>{el.name}</h1>
                  <h2>{el.lastname}</h2>
                  <p>{el.age}</p>
                </div>
              )}
              pickField={(el) => el.name}
              filterFun={(filterText) =>
                objs.filter(
                  (i) =>
                    i.name.toLowerCase().includes(filterText.toLowerCase()) ||
                    i.lastname
                      .toLowerCase()
                      .includes(filterText.toLowerCase()) ||
                    i.age.toString().startsWith(filterText)
                )
              }
              onSelect={(el) => console.log(el)}
            />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Filter Function</h3>
            <h4 className={styles["example-prop"]}>
              filterFun ((filterText: string) {`<T>[ ]`}){" "}
              <span className={styles["required"]}>*required</span>
            </h4>
          </div>
          <p className={styles["example-value"]}>
            Eg: (filterText) {`=>`} items.startsWith(filterText)
          </p>
          <div className={styles["row"]}>
            <MultiSelectDropdown
              items={numbers}
              filterFun={(filterText) =>
                numbers.filter((i) => i.toString().startsWith(filterText))
              }
              onSelect={(el) => console.log(el)}
            />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>On select function</h3>
            <h4 className={styles["example-prop"]}>
              onSelect ((el: {`<T>`}) {`=>`} void){" "}
              <span className={styles["required"]}>*required</span>
            </h4>
            <h4 className={styles["example-note"]}>
              ** This function is invoked everytimea a new item is selected.
            </h4>
          </div>
          <p className={styles["example-value"]}>Eg: (el) {`=>`} alert(el)</p>
          <div className={styles["row"]}>
            <MultiSelectDropdown
              items={numbers}
              filterFun={(filterText) =>
                numbers.filter((i) => i.toString().startsWith(filterText))
              }
              onSelect={(el) => alert(el)}
            />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Selected</h3>
            <h4 className={styles["example-prop"]}>
              select ({`<T>`}) (default: undefined)
            </h4>
            <h4 className={styles["example-note"]}>
              ** When given it will be the selected item.
            </h4>
          </div>
          <p className={styles["example-value"]}>Eg: (el) {`=>`} alert(el)</p>
          <div className={styles["row"]}>
            <MultiSelectDropdown
              items={numbers}
              filterFun={(filterText) =>
                numbers.filter((i) => i.toString().startsWith(filterText))
              }
              onSelect={(el) => console.log(el)}
              selected={numbers[12]}
            />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Render item</h3>
            <h4 className={styles["example-prop"]}>
              renderItem (({`<T>`}) {`=>`} ReactNode) (default: (el: {`<T>`}){" "}
              {`=>`} el)
            </h4>
            <h4 className={styles["example-note"]}>
              ** This is the function to return the item UI component to be
              rendered in the dropdown.
            </h4>
          </div>
          <p className={styles["example-value"]}>Eg: (el) {`=>`} el.name</p>
          <div className={styles["row"]}>
            <MultiSelectDropdown
              items={objs}
              filterFun={(filterText) =>
                objs.filter((i) => i.name.startsWith(filterText.toLowerCase()))
              }
              onSelect={(el) => console.log(el)}
              renderItem={(el) => el.name}
              pickField={(el) => el.name}
            />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Pick field</h3>
            <h4 className={styles["example-prop"]}>
              pickField (({`<T>`}) {`=>`} ReactNode) (default: (el: {`<T>`}){" "}
              {`=>`} el)
            </h4>
            <h4 className={styles["example-note"]}>
              ** This is the function to return the item value to be displayed
              in the selected badge.
            </h4>
          </div>
          <p className={styles["example-value"]}>Eg: (el) {`=>`} el.lastname</p>
          <div className={styles["row"]}>
            <MultiSelectDropdown
              items={objs}
              filterFun={(filterText) =>
                objs.filter((i) => i.name.startsWith(filterText.toLowerCase()))
              }
              onSelect={(el) => console.log(el)}
              renderItem={(el) => el.name}
              pickField={(el) => el.lastname}
            />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Color</h3>
            <h4 className={styles["example-prop"]}>
              color (default, info, warning, danger and success) (default:
              default)
            </h4>
          </div>
          <div className={styles["column"]}>
            <p className={styles["example-value"]}>default</p>
            <MultiSelectDropdown
              items={numbers}
              color="default"
              filterFun={(filterText) =>
                numbers.filter((i) => i.toString().startsWith(filterText))
              }
              onSelect={(el) => console.log(el)}
              selected={numbers[12]}
            />
            <p className={styles["example-value"]}>danger</p>
            <MultiSelectDropdown
              items={numbers}
              color="danger"
              filterFun={(filterText) =>
                numbers.filter((i) => i.toString().startsWith(filterText))
              }
              onSelect={(el) => console.log(el)}
              selected={numbers[12]}
            />
            <p className={styles["example-value"]}>info</p>
            <MultiSelectDropdown
              items={numbers}
              color="info"
              filterFun={(filterText) =>
                numbers.filter((i) => i.toString().startsWith(filterText))
              }
              onSelect={(el) => console.log(el)}
              selected={numbers[12]}
            />
            <p className={styles["example-value"]}>success</p>
            <MultiSelectDropdown
              items={numbers}
              color="success"
              filterFun={(filterText) =>
                numbers.filter((i) => i.toString().startsWith(filterText))
              }
              onSelect={(el) => console.log(el)}
              selected={numbers[12]}
            />
            <p className={styles["example-value"]}>warning</p>
            <MultiSelectDropdown
              items={numbers}
              color="warning"
              filterFun={(filterText) =>
                numbers.filter((i) => i.toString().startsWith(filterText))
              }
              onSelect={(el) => console.log(el)}
              selected={numbers[12]}
            />
          </div>
        </div>

        <div className={styles["try-yourself"]}>
          <h1 className={styles["try-title"]}>Try yourself</h1>
          <div className={styles["row"]}>
            <div className={styles["column--center"]}>
              <MultiSelectDropdown
                color={color}
                renderItem={(el) => el}
                pickField={(el) => el}
                items={numbers}
                filterFun={(filterText) =>
                  numbers.filter((i) => i.toString().startsWith(filterText))
                }
                onSelect={(el) => console.log(el)}
              />
            </div>
            <div className={styles["column"]}>
              <MultiSelectDropdown
                items={colors}
                filterFun={(str) =>
                  colors.filter((color) =>
                    color.toLowerCase().includes(str.toLowerCase())
                  )
                }
                onSelect={(el) => setColor(el)}
                selected={colors[0]}
              />
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
