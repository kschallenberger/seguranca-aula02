import { TbLoaderQuarter } from 'react-icons/tb';
import "./carregando.style.css";

export function Carregando() {
  return (
    <div className="carregando__">
      <TbLoaderQuarter className="carregando__animacao"/>
    </div>
  );
}
