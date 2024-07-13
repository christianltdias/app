import { ReactNode, useState } from "react";
import Image from "next/image";
import styles from "./sidenav.module.sass";
import { concatStyles } from "../../utils/styles.utils";
import Divider from "../divider/divider";
import { useRouter } from "next/navigation";

export enum SideNavSectionType {
  Common,
  Route
}

export type SideNavSection = {
  elements: SideNavSectionElement[] | SideNavSectionRouteElement[];
  title?: string;
  type?: SideNavSectionType;
}

type SideNavSectionBaseElement = {
  icon: string;
  text: string;
}

export type SideNavSectionElement = SideNavSectionBaseElement & {
  action: () => void;
}

export type SideNavSectionRouteElement = SideNavSectionBaseElement & {
  path: string;
}

type SideNavOptions = {
  children: ReactNode;
  width?: number;
  sections?: SideNavSection[];
};

export default function SideNav({ children, width = 200, sections = [] }: SideNavOptions) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const router = useRouter();
  
  const widthValue = `${width}px`;
  const collapsedWidth = "70px";

  const getWidth = (): string => (isOpen ? widthValue : collapsedWidth);

  const createElement = (element: SideNavSectionElement) => {
    return (
      <div className={styles["sidenav-section-element"]} onClick={element.action}>
        <Image
          src={element.icon}
          alt={element.text}
          width={28}
          height={28}
        />
        <span className={styles["sidenav-section-text"]}>{element.text}</span>
      </div>
    )
  } 

  const createRouteElement = (element: SideNavSectionRouteElement) => {
    return (
      <div className={styles["sidenav-section-element"]} onClick={() => router.push(element.path)}>
        <Image
          src={element.icon}
          alt={element.text}
          width={28}
          height={28}
        />
        <span className={styles["sidenav-section-text"]}>{element.text}</span>
      </div>
    )
  } 

  const createSection = (section: SideNavSection) => {
    return (
      <div className={styles["sidenav-section"]}>
        {section.title && <h3 className={styles["sidenav-section-title"]}>{section.title.toUpperCase()}</h3>}
        {section.title && <Divider opacity={.3}/>}
        {section.elements.map((element: SideNavSectionElement |  SideNavSectionRouteElement) => {
          if(section.type === SideNavSectionType.Route){
            return createRouteElement(element as SideNavSectionRouteElement)
          }
          return createElement(element as SideNavSectionElement)
        })}
      </div>
    )
  }

  const mainSection: SideNavSection = {elements: [{icon: "/burger-menu.svg", text: "Imperius", action: () => setIsOpen(!isOpen) }]}
  
  return (
    <div className={styles["sidenav-container"]}>
      <div className={concatStyles(styles["container"], styles[isOpen ? "expanded" : "colapsed"])} style={{ width: getWidth() }}>
        {createSection(mainSection)}
        {sections.map(section => createSection(section))}
      </div>
      <div style={{ marginLeft: getWidth() }} className={styles["content"]}>
        {children}
      </div>
    </div>
  );
}
