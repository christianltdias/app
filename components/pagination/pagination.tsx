import { concatStyles } from '../../utils/styles.utils';
import Tooltip from '../tooltip/tooltip';
import styles from './pagination.module.sass';

export type PageDefinition = {
  page: number;
  pages: number;
  total: number;
  offset: number;
};

type PaginationProps = {
  pageDefinition: PageDefinition;
  type: 'info' | 'warning' | 'success' | 'error' ;
  setPage: (page: number) => void;
};

export default function Pagination({pageDefinition, type, setPage}: PaginationProps) {
  return (
    <div className={styles["pagination-container"]}>
      {pageDefinition.pages > 0 &&
        Array.from({ length: pageDefinition.pages }, (_, i) => i + 1).map(
          (page) => {
            var pagenumber = <></>;
            const currentpage = pageDefinition.page;
            const totalpages = pageDefinition.pages;

            if (
              page === 1 ||
              page === totalpages ||
              (currentpage <= 3 && page <= 3) ||
              (currentpage >= totalpages - 2 && page >= totalpages - 2) ||
              (page <= currentpage + 1 && page >= currentpage - 1)
            ) {
              pagenumber = (
                <span
                  onClick={() => setPage(page)}
                  className={concatStyles(
                    styles["page-number"],
                    pageDefinition.page === page ? styles["selected"] : "",
                    styles[type]
                  )}
                >
                  {page}
                </span>
              );
            } else if (page === 2 || page === totalpages - 1) {
              pagenumber = (
                <span className={styles[type]} style={{fontWeight: 'bold'}}>...</span>
              );
            }

            return pagenumber;
          }
        )}
    </div>
  );
}
