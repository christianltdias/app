"use client";

import { useRouter } from "next/navigation";
import MultiOptionButton from "../shared/controls/buttons/multi-option/multi-option-button";
import PageComponent from "../shared/page/page";
import Toaster from "../shared/toast/toaster";
import { useAppDispatch } from "../store/store";
import { createToast } from "../store/toast/toast.slice";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  let count = 0;

  return (
    <PageComponent title="Home">
      <MultiOptionButton
        color="primary"
        options={[
          {
            title: "Go to Dashboard",
            // onClick: () => router.push("/dashboard"),
            onClick: () =>
              dispatch(
                createToast({
                  children: "test",
                  title: `test title ${++count}`,
                  sticky: [true, false][Math.floor(Math.random() * 2)],
                  type: ["info", "warning", "success", "error"][Math.floor(Math.random() * 4)],
                })
              ),
          },
          {
            title: "Go to Details",
            onClick: () =>               dispatch(
              createToast({
                children: "This is a test Toast",
                title: 'Error',
                sticky: true,
                type: "error",
              })
            ),
          },
        ]}
      />
    </PageComponent>
  );
}
