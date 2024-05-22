import { useState } from "react";
import straight from "../images/Straight.png";
import wavy from "../images/Wavy.png";
import curly from "../images/Curly.png";


import Straight1 from "../images/straight1.png";
import Straight2 from "../images/straight2.png";
import Straight3 from "../images/straight3.png";
import wavy1 from "../images/wavy1.png";
import wavy2 from "../images/wavy2.png";
import wavy3 from "../images/wavy3.png";
import curly1 from "../images/curly1.png";
import curly2 from "../images/curly2.png";
import curly3 from "../images/curly3.png";


// HairStyle component for displaying hair style options
export default function HairStyle() {
  // State variables for selected hair type
  const [straightSelected, setStraightSelected] = useState(false);
  const [wavySelected, setWavySelected] = useState(false);
  const [curlySelected, setCurlySelected] = useState(false);

  // Function to handle scrolling
  function handleScroll() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col text-center">
            <h1 className="text-6xl font-semibold text-white">
              Estilos de Cabello
            </h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-5">
          <div className="col-12 text-center">
            <p className="text-2xl font-semibold mb-4 text-white">Selecciona tu Tipo de Cabello</p>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card" onClick={() => { setStraightSelected(true); setWavySelected(false); setCurlySelected(false); handleScroll(); }}>
              <img src={straight} className="card-img-top" alt="Cabello Liso" />
              <div className="card-body">
                <h5 className="card-title text-cyan-600">Liso</h5>
                <p className="card-text">Se encuentra plano o liso en el cuero cabelludo</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card" onClick={() => { setStraightSelected(false); setWavySelected(true); setCurlySelected(false); handleScroll(); }}>
              <img src={wavy} className="card-img-top" alt="Cabello Ondulado" />
              <div className="card-body">
                <h5 className="card-title text-cyan-600">Ondulado</h5>
                <p className="card-text">Se encuentra entre el cabello liso y rizado</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card" onClick={() => { setStraightSelected(false); setWavySelected(false); setCurlySelected(true); handleScroll(); }}>
              <img src={curly} className="card-img-top" alt="Cabello Rizado" />
              <div className="card-body">
                <h5 className="card-title text-cyan-600">Rizado</h5>
                <p className="card-text">Cabello que crece en formas ovaladas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inspiración para Cabello Liso */}
      {straightSelected && (
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 text-center">
              <p className="text-2xl font-semibold mb-4 text-white">Inspiración para Cabello Liso</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src={Straight2} className="img-fluid rounded" alt="Inspiración para Cabello Liso" />
              <p className="text-xs font-thin text-center mt-1 text-white">@thunderbarbershop8</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src={Straight1} className="img-fluid rounded" alt="Inspiración para Cabello Liso" />
              <p className="text-xs font-thin text-center mt-1 text-white">@thunderbarbershop8</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src={Straight3} className="img-fluid rounded" alt="Inspiración para Cabello Liso" />
              <p className="text-xs font-thin text-center mt-1 text-white">mjbarberz1.booksy.com</p>
            </div>
          </div>
        </div>
      )}

      {/* Inspiración para Cabello Ondulado */}
      {wavySelected && (
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 text-center">
              <p className="text-2xl font-semibold mb-4 text-white">Inspiración para Cabello Ondulado</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src={wavy1} className="img-fluid rounded text-white" alt="Inspiración para Cabello Ondulado" />
              <p className="text-xs font-thin text-center mt-1 text-white">@thunderbarbershop8</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src={wavy2} className="img-fluid rounded" alt="Inspiración para Cabello Ondulado" />
              <p className="text-xs font-thin text-center mt-1 text-white">@thunderbarbershop8</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src={wavy3} className="img-fluid rounded" alt="Inspiración para Cabello Ondulado" />
              <p className="text-xs font-thin text-center mt-1 text-white">@thunderbarbershop8</p>
            </div>
          </div>
        </div>
      )}

      {/* Inspiración para Cabello Rizado */}
      {curlySelected && (
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 text-center">
              <p className="text-2xl font-semibold mb-4 text-white">Inspiración para Cabello Rizado</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src={curly1} className="img-fluid rounded" alt="Inspiración para Cabello Rizado" />
              <p className="text-xs font-thin text-center mt-1 text-white">@thunderbarbershop8</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src={curly2} className="img-fluid rounded" alt="Inspiración para Cabello Rizado" />
              <p className="text-xs font-thin text-center mt-1 text-white">@thunderbarbershop8</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src={curly3} className="img-fluid rounded" alt="Inspiración para Cabello Rizado" />
              <p className="text-xs font-thin text-center mt-1 text-white">@thunderbarbershop8</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
