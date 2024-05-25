"use client";

import Button from "../../components/controls/buttons/common/button";
import Input from "../../components/controls/inputs/text/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./login.module.sass";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles["login-container"]}>
      <div className={styles["app-banner"]}>
        <h2>Imperius</h2>
        <p>A good app</p>
        <Button onClick={()=> router.push("signup")} color="white" type='filled'>Sign up</Button>
      </div>
      <div className={styles["login-form"]}>
        <div className={styles["login-form-container"]}>
          <Input label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <div  className={styles["login-form-buttons"]}>
            <Button type="filled" onClick={() => console.log('hello')}>Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
