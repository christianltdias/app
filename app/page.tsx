"use client";

import { useRouter } from "next/navigation";
import MultiOptionButton from "../shared/controls/buttons/multi-option/multi-option-button";
import CheckBox from "../shared/controls/inputs/checkbox/checkbox";
import RadioGroup from "../shared/controls/inputs/radiogroup/radiogroup";
import PageComponent from "../shared/page/page";
import Switch from "../shared/controls/inputs/switch/switch";
import { useState } from "react";
import Divider from "../shared/divider/divider";
import RadioButton from "../shared/controls/inputs/radiogroup/radio";

export default function Page() {
  const router = useRouter();
  const [isChecked, setChecked] = useState<boolean>();
  const [selectedItem, setSelectedItem] = useState<number>(0);
  
  return (
    <PageComponent title="Home">
      <MultiOptionButton
        color="primary"
        options={[
          {
            title: "Go to Dashboard",
            onClick: () => router.push("/dashboard"),
          },
          {
            title: "Go to Details",
            onClick: () => router.push("/dashboard/details"),
          },
        ]}
      />

      <Divider />
      <CheckBox value={isChecked} onChange={setChecked}>
        checkbox
      </CheckBox>
      <Divider />
      <RadioButton value={isChecked} onChange={setChecked}>
        radio
      </RadioButton>
      <Divider />

      <RadioGroup
        title="test color"
        items={[
          { text: "item 1" },
          { text: "item 2" },
          { text: "item 3" },
          { text: "item 4", disabled: true },
          { text: "item 5" },
        ]}
        onChange={setSelectedItem}
        color="error"
        direction="row"
        borderless
      />

      <Divider />
      <Switch value={isChecked} onChange={setChecked} colored>default</Switch>
      <Switch disabled color="error" value={isChecked} onChange={setChecked}>error</Switch>
      <Switch color="green" value={isChecked} onChange={setChecked}>green</Switch>
      <Switch color="purple" value={isChecked} onChange={setChecked}>purple</Switch>
      <Switch color="warning" value={isChecked} onChange={setChecked}>warning</Switch>
      <Divider />
    </PageComponent>
  );
}
