import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.sass";
import Image from "next/image";
import PageButton, { PageButtonProps } from "../controls/buttons/pagebutton/pagebutton";

type ModalProps = {
  buttons?: PageButtonProps[];
  children: ReactNode;
  title?: string;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: 'default' | 'alert' | 'error' | 'success' | 'info'
};

const Modal = ({ onClose, children, title, buttons, type = 'default'}: ModalProps) => {
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose(e);
  };

  const modalContent = (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-wrapper"]}>
        <div className={styles["modal"]}>
          {(onClose || title) && (
            <div className={[styles["modal-header"], styles[type]].join(' ')}>
              <h1>{title}</h1>
              {onClose && (
                <a href="#" onClick={handleCloseClick}>
                  <Image src="/close.svg" alt="Close" width={24} height={24} />
                </a>
              )}
            </div>
          )}
          <div className={styles["modal-body"]}>{children}</div>
          {buttons != null && buttons.length > 0 && (
            <div className={styles["modal-footer"]}>
              <hr />
              <div className={styles["modal-buttons"]}>
                {buttons.map((button, index) => {
                  return (
                    <PageButton key={`page-button=${index}`}>
                      {button.children}
                    </PageButton>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default Modal;
