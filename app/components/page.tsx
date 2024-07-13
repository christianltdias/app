"use client";

import { useRouter } from "next/navigation";
import PageComponent from "../../shared/page/page";

export default function Page() {
  const router = useRouter();

  return (
    <PageComponent title="Home">
      <h1>Component List</h1>
      <ul>
        <li onClick={() => router.push("/components/badge")}><a>Badge</a></li>
        <li onClick={() => router.push("/components/calendar")}><a>Calendar</a></li>
        <li onClick={() => router.push("/components/card")}><a>Card</a></li>
        <li onClick={() => router.push("/components/container")}><a>Container</a>
          <ul>
            <li>
              Drag Items
            </li>
          </ul>
        </li>
        <li onClick={() => router.push("/components/controls")}><a>Controls</a>
          <ul>
            <li>Buttons
              <ul>
                <li>common</li>
                <li>dropdown</li>
                <li>icon</li>
                <li>multi</li>
              </ul>
            </li>
            <li>Inputs
              <ul>
                <li>checkbox</li>
                <li>radiogroup</li>
                <li>slider</li>
                <li>switch</li>
                <li>text</li>
              </ul>
            </li>
          </ul>
        </li>
        <li onClick={() => router.push("/components/divider")}><a>Divider</a></li>
        <li onClick={() => router.push("/components/header")}><a>Header</a></li>
        <li onClick={() => router.push("/components/modal")}><a>Modal</a></li>
        <li onClick={() => router.push("/components/page")}><a>Page</a></li>
        <li onClick={() => router.push("/components/pagination")}><a>Pagination</a></li>
        <li onClick={() => router.push("/components/picker")}><a>Picker</a>
          <ul>
            <li>Calendar</li>
            <li>Date</li>
          </ul>
        </li>
        <li onClick={() => router.push("/components/popup")}><a>PopUp</a></li>
        <li onClick={() => router.push("/components/sidenav")}><a>SideNav</a></li>
        <li onClick={() => router.push("/components/spinner")}><a>Spinner</a></li>
        <li onClick={() => router.push("/components/table")}><a>Table</a></li>
        <li onClick={() => router.push("/components/toast")}><a>Toast</a></li>
        <li onClick={() => router.push("/components/tooltip")}><a>Tooltip</a></li>
      </ul>
    </PageComponent>
  );
}
