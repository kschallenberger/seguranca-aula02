import "./input.style.css";

export function Input({ tipo, titulo, name, valor, onChange, erro, style, placeHolder }) {
  return (
    <div className="input__div">
      <label htmlFor={name}>{titulo}</label>
      <div className="input__div--input">
        <input className={style}
          id={name}
          type={tipo}
          name={name}
          value={valor}
          onChange={onChange}
          placeholder={placeHolder}
        />
      </div>
      <p className="erro">{erro}</p>
    </div>
  );
}
