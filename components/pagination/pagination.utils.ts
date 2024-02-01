import { SetStateAction } from "react"
import { PageDefinition } from "./pagination"

export const createInitialPageDefinition = (values: any[], pageSize: number): PageDefinition =>  {
  return {
    page: 1,
    pages: Math.ceil(values.length / pageSize),
    offset: pageSize,
    total: values.length,
  }
}

export const setPageState = (
    page: number,
    pageDefinition: PageDefinition,
    setPage: (value: SetStateAction<PageDefinition>) => void): void => {
  if (page === pageDefinition.page) return;

  const newPageDef = {
    page: page,
    pages: pageDefinition.pages,
    offset: pageDefinition.offset,
    total: pageDefinition.total,
  };
  
  setPage(newPageDef);
}