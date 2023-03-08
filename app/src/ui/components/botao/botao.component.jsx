import "./botao.style.css";

export function Botao({ titulo, handleClick }) {
  return (
    <button className="botao__" onClick={handleClick}>{titulo}</button>
  );
}
