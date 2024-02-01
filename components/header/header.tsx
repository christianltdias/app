import styles from "./header.module.sass";
import Image from "next/image";

type Prop = {
  isLogged: boolean;
};

export default function Header({ isLogged }: Prop) {
  return (
    <div className={styles.header_container}>
      <div className={styles.header_logo}>Imperius</div>
      <div className={styles.header_mgmt}>
        {isLogged && (
          <>
            <Image
              src="/gear.svg"
              alt="Configurations"
              width={24}
              height={24}
            />
            <Image src="/bell.svg" alt="Notifications" width={24} height={24} />
            <div className={styles.user_info}>
              Christian Dias <span>&#9660;</span>
              <Image src="/user.svg" alt="User" width={24} height={24} />
            </div>
            <Image src="/logout.svg" alt="Log out" width={24} height={24} />
          </>
        )}
        {!isLogged && (
          <Image src="/signin.svg" alt="Sign in" width={24} height={24} />
        )}
      </div>
    </div>
  );
}
