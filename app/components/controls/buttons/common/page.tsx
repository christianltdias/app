"use client";

import { useState } from "react";
import Button, { ButtonType } from "../../../../../shared/controls/buttons/common/button";
import PageComponent from "../../../../../shared/page/page";
import Dropdown from "../../../../../shared/controls/buttons/dropdown/common/dropdown.common";
import Input from "../../../../../shared/controls/inputs/text/input";
import styles from "../../../page.module.sass"
import { ButtonColors } from "../../../../../types/global.types";

export default function Page() {
  const colors: ButtonColors[] = ["danger", "gray", "info", "success", "warning", "white"]
  const types: ButtonType[] = ["border", "empty", "filled"]

  const [color, setColor] = useState<ButtonColors>(colors[2]);
  const [type, setType] = useState<ButtonType>("border");
  const [text, setText] = useState<string>("try yourself");

  
  return (
    <PageComponent title="Controls">
      <div className={styles["example-container"]}>
        <span className={styles["example-description"]}>
          A Button is a small, rectangular or circular element that is used to initiate an action. Basic buttons with a simple text to initiate an action.
        </span>

        
        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Text</h3>
            <h4 className={styles["example-prop"]}>children (string) <span className={styles["required"]}>*required</span></h4>
          </div>
          <div className={styles["row"]}>
            <Button onClick={() => alert("Text")}>Text</Button>
          </div>
        </div>
        
        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Click Event</h3>
            <h4 className={styles["example-prop"]}>onClick (e: MouseEvent) ={">"} void <span className={styles["required"]}>*required</span></h4>
          </div>
          <div className={styles["row"]}>
            <Button onClick={() => alert("This is a click action")}>Basic on click event</Button>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Color</h3>
            <h4 className={styles["example-prop"]}>color (primary, secondary, success, cancel, warning and white) (default: primary)</h4>
            <h4 className={styles["example-note"]}>* white buttons does not have filled or border options. When white color is selected we need to have a different background color. The gray background is only illustrative.</h4>
          </div>
          <div className={styles["row"]}>
            <Button onClick={() => alert("secondary")} color="danger">Danger</Button>
            <Button onClick={() => alert("primary")} color="gray">Gray</Button>
            <Button onClick={() => alert("secondary")} color="info">Info</Button>
            <Button onClick={() => alert("secondary")} color="success">Success</Button>
            <Button onClick={() => alert("secondary")} color="warning">Warning</Button>
            <div style={{backgroundColor: '#bbb', padding: '10px'}}>
              <Button onClick={() => alert("secondary")} color="white">White</Button>
            </div>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Type</h3>
            <h4 className={styles["example-prop"]}>type (border, filled and empty) (default: border)</h4>
            <h4 className={styles["example-note"]}>* white buttons does not have filled or border options. When white color is selected we need to have a different background color. The gray background is only illustrative.</h4>
          </div>
          
          <p className={styles["example-value"]}>border</p>
          <div className={styles["row"]}>
            <Button onClick={() => alert("secondary")} color="danger">Danger</Button>
            <Button onClick={() => alert("primary")} color="gray">Gray</Button>
            <Button onClick={() => alert("secondary")} color="info">Info</Button>
            <Button onClick={() => alert("secondary")} color="success">Success</Button>
            <Button onClick={() => alert("secondary")} color="warning">Warning</Button>
            <div style={{backgroundColor: '#bbb', padding: '10px'}}>
              <Button onClick={() => alert("white")} color="white">White</Button>
            </div>
          </div>

          <p className={styles["example-value"]}>filled</p>
          <div className={styles["row"]}>
            <Button onClick={() => alert("primary")} color="danger" type="filled">Danger</Button>
            <Button onClick={() => alert("secondary")} color="gray" type="filled">Gray</Button>
            <Button onClick={() => alert("sucess")} color="info" type="filled">Info</Button>
            <Button onClick={() => alert("cancel")} color="success" type="filled">Success</Button>
            <Button onClick={() => alert("warning")} color="warning" type="filled">Warning</Button>
            <div style={{backgroundColor: '#bbb', padding: '10px'}}>
              <Button onClick={() => alert("white")} color="white" type="filled">White</Button>
            </div>
          </div>

          <p className={styles["example-value"]}>empty</p>
          <div className={styles["row"]}>
            <Button onClick={() => alert("primary")} color="danger" type="empty">Danger</Button>
            <Button onClick={() => alert("secondary")} color="gray" type="empty">Gray</Button>
            <Button onClick={() => alert("sucess")} color="info" type="empty">Info</Button>
            <Button onClick={() => alert("cancel")} color="success" type="empty">Success</Button>
            <Button onClick={() => alert("warning")} color="warning" type="empty">Warning</Button>
            <div style={{backgroundColor: '#bbb', padding: '10px'}}>
              <Button onClick={() => alert("white")} color="white" type="empty">White</Button>
            </div>
          </div>
        </div>

        <div className={styles["try-yourself"]}>
          <h1 className={styles["try-title"]}>Try yourself</h1>
          <div className={styles["row"]}>
            <div className={styles["column--center"]}>
              <div style={{backgroundColor: color === 'white' ? '#bbb' : 'white', padding: "10px"}}>
                <Button onClick={() => alert(text)} type={type} color={color}>{text}</Button>
              </div>
            </div>
            <div className={styles["column"]}>
              <Dropdown
                items={colors}
                filterFun={(str) =>
                  colors.filter((color) =>
                    color.toLowerCase().includes(str.toLowerCase())
                  )
                }
                onSelect={(el) => setColor(el)}
                selected={color}
              />
              <Dropdown
                items={types}
                filterFun={(str) =>
                  types.filter((type) =>
                    type.toLowerCase().includes(str.toLowerCase())
                  )
                }
                onSelect={(el) => setType(el)}
                selected={type}
              />
              <Input
                label="Button text"
                onChange={setText}
                value={text}
              />
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
