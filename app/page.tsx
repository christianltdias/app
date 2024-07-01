"use client";

import { useRouter } from "next/navigation";
import PageComponent from "../shared/page/page";
import { useAppDispatch } from "../store/store";
import Dropdown from "../shared/controls/buttons/dropdown/common/dropdown.common";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  let count = 0;
  const color = "white"
  return (
    <PageComponent title="Home">
      <Dropdown color="primary" placeholder="select" items={[{title: "test", onClick: () => console.log("test")}]}/>
    </PageComponent>
  );
}
