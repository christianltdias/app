import styles from "./input.module.sass";

type InputProps = {
  label: string;
  type?: "text" | "password";
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  error,
}: InputProps) {
  var onValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    onChange(e);
  };

  var errorClass = error ? styles["error"] : '';

  return (
    <div className={styles["input_container"]}>
      <label className={styles["input"]}>
        <input
          className={[styles["input_field"], errorClass].join(' ')}
          type={type}
          placeholder=" "
          value={value}
          onChange={onValueChange}
        />
        <span className={[styles["input_label"], errorClass].join(' ')}>{label}</span>
      </label>
      {error && <span className={styles["input_error"]}>{error}</span>}
    </div>
  );
}
