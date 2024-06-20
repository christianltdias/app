import styles from "./table.module.sass";
import { concatStyles } from "../../utils/styles.utils";
import { createRef, useEffect, useState } from "react";
import Image from "next/image";
import Tooltip from "../tooltip/tooltip";
import PopUp from "../popup/popup";
import Pagination, { PageDefinition } from "../pagination/pagination";
import {
  createInitialPageDefinition,
  setPageState,
} from "../pagination/pagination.utils";

export type HeadItem = {
  name: string;
  field: string;
  type: "text" | "number";
  sort?: boolean;
  filter?: boolean;
};

type TableProps = {
  header: HeadItem[];
  values: any[];
  type?: "info" | "warning" | "success" | "error";
  pageSize?: number;
  sticky?: "header" | "column" | "both" | "none";
};

interface SortDefinition {
  field: string;
  direction: "A" | "D" | "None";
  values: any[];
}

interface FilterDefinition {
  field: string;
  value: string;
  headerindex: number;
}

export default function Input({
  header,
  values,
  type = "info",
  pageSize = 50,
  sticky = "none",
}: TableProps) {
  const [headerRefs, setHeaderRefs] = useState([]);

  useEffect(() => {
    setHeaderRefs((elRefs) => header.map((_, i) => elRefs[i] || createRef()));
  }, header);

  const [pageDefinition, setPageDefinition] = useState<PageDefinition>(
    createInitialPageDefinition(values, pageSize)
  );

  const [filterDefinition, setFilterDefinition] = useState<FilterDefinition>({
    field: "a",
    value: "chris",
    headerindex: -1,
  });
  const [sortDefinition, setSortDefinition] = useState<SortDefinition>({
    field: "",
    direction: "None",
    values: values,
  });

  const sortfield = (fieldname: string) => {
    if (sortDefinition.field !== fieldname) {
      setSortDefinition({
        field: fieldname,
        direction: "A",
        values: [...values].sort((a, b) =>
          a[fieldname] > b[fieldname] ? 1 : b[fieldname] > a[fieldname] ? -1 : 0
        ),
      });
      return;
    }

    var newSortDefinition = { field: fieldname } as SortDefinition;

    switch (sortDefinition.direction) {
      case "A":
        newSortDefinition.direction = "D";
        newSortDefinition.values = [...values].sort((a, b) =>
          a[fieldname] > b[fieldname] ? -1 : b[fieldname] > a[fieldname] ? 1 : 0
        );
        break;
      case "D":
        newSortDefinition.direction = "None";
        newSortDefinition.values = values;
        break;
      case "None":
        newSortDefinition.direction = "A";
        newSortDefinition.values = [...values].sort((a, b) =>
          a[fieldname] > b[fieldname] ? 1 : b[fieldname] > a[fieldname] ? -1 : 0
        );
        break;
    }
    setSortDefinition(newSortDefinition);
  };

  const getPageValues = () => {
    const page = pageDefinition.page - 1;
    const offset = pageDefinition.offset;
    const firstSlice = page * offset;
    return sortDefinition.values.slice(firstSlice, firstSlice + offset);
  };

  const tableValues = getPageValues();

  return (
    <div className={styles["table-container"]}>
      <div className={styles["table-wrapper"]}>
        <table className={concatStyles(styles["table-main"], styles[type])}>
          <thead>
            <tr id={`table-header-row-${header.length}`}>
              {header.map((item, index) => (
                <th
                  className={concatStyles(
                    styles["theader"],
                    styles[type],
                    sticky === "header" || sticky === "both"
                      ? styles["sticky"]
                      : "",
                    (sticky === "column" || sticky === "both") && index === 0
                      ? styles["sticky-coll"]
                      : ""
                  )}
                  style={{
                    zIndex:
                      (sticky === "column" || sticky === "both") && index === 0
                        ? 10
                        : 1,
                  }}
                  id={`table-header-${index}`}
                >
                  <div
                    className={styles["theader-content"]}
                    id={`table-header-cont-${index}`}
                  >
                    <span>{item.name}</span>
                    {item.sort && (
                      <>
                        <Image
                          className={styles["sortable"]}
                          ref={headerRefs[index]}
                          onClick={() => {
                            setFilterDefinition({
                              headerindex: index,
                              field: "a",
                              value: "b",
                            });
                            sortfield(item.field);
                          }}
                          src={
                            sortDefinition.direction === "None" ||
                            sortDefinition.field !== item.field
                              ? "/sort.svg"
                              : sortDefinition.direction === "D"
                              ? "/sort-up.svg"
                              : "/sort-down.svg"
                          }
                          alt="sorting"
                          width={15}
                          height={15}
                        />
                        {filterDefinition.headerindex === index && (
                          <PopUp ref={headerRefs[index]} onClose={() => setFilterDefinition({
                            field: "a",
                            value: "chris",
                            headerindex: -1,
                          })} offset={{x: 10, y: 0}}>{item.field}</PopUp>
                        )}
                      </>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableValues.length > 0 &&
              tableValues.map((item, index) => {
                var rows = header.map((hearderinfo, collindex) => (
                  <td
                    id={`table-row-${index}-${collindex}`}
                    className={concatStyles(
                      (sticky === "column" || sticky === "both") &&
                        collindex === 0
                        ? styles["sticky-coll"]
                        : "",
                      styles[type],
                      index % 2 == 1 ? styles["even"] : ""
                    )}
                  >
                    <Tooltip
                      text={
                        item[hearderinfo.field] ? item[hearderinfo.field] : "-"
                      }
                    >
                      {item[hearderinfo.field] ? item[hearderinfo.field] : "-"}
                    </Tooltip>
                  </td>
                ));

                return (
                  <tr id={`table-row-${index}`} className={styles[type]}>
                    {rows}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {pageDefinition.pages > 1 && (
        <div className={styles["table-info"]}>
          <span>
            Showing {tableValues.length} of {pageDefinition.total} items.
          </span>
          <Pagination
            pageDefinition={pageDefinition}
            type={type}
            setPage={(page) =>
              setPageState(page, pageDefinition, setPageDefinition)
            }
          />
        </div>
      )}
    </div>
  );
}
