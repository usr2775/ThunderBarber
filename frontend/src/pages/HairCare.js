import haircareIMG from "../images/haicare.jpg";
import haircareIMG2 from "../images/kit_productos_peluqueria.jpg";

export default function HairCare() {
  return (
    <div>
      <header className="bg-banner bg-cover bg-center bg-fixed mb-6">
        <div className="text-center text-white py-5">
          <h1 className="text-white">Cuidado del Cabello</h1>
        </div>
      </header>

      <section className="py-5 ">
        <div className="container text-white">
          <div className="row g-5 align-items-start">
            <div className="col-lg-6  text-center">
              <img
                className="img-fluid rounded shadow-lg mb-4"
                src={haircareIMG}
                alt="Hair Care"
              />
              <img
                className="img-fluid rounded shadow-lg"
                src={haircareIMG2}
                alt="Hair Care2"
              />
            </div>
            <div className="col-lg-6 ">
              <h2> Consejos para el Cuidado del Cabello</h2>
              <p className="text-white">- Aquí tienes algunos consejos para un mejor cuidado del cabello:</p>
              <ul className="list-unstyled mt-4">
                <div className="mb-3 bg-white p-3 rounded text-black">
                  <li>
                    <h5 className="text-cyan-400 fw-bold">Opta por Productos Naturales y Suaves</h5>
                    <p>Utiliza champús elaborados con ingredientes naturales que limpien tu cabello suavemente...</p>
                  </li>
                </div>
                <div className="mb-3 bg-white p-3 rounded text-black">
                  <li>
                    <h5 className="text-cyan-400 fw-bold">Reduce la Frecuencia de Lavado</h5>
                    <p>No es necesario lavar tu cabello todos los días. Espacia los lavados para mantener el equilibrio natural de aceites...</p>
                  </li>
                </div>
                <div className="mb-3 bg-white p-3 rounded text-black">
                  <li>
                    <h5 className="text-cyan-400 fw-bold">No Descuides el Acondicionador</h5>
                    <p>Complementa tu rutina de cuidado con acondicionador para mantener tu cabello suave, hidratado y fácil de peinar...</p>
                  </li>
                </div>
                <div className="mb-3 bg-white p-3 rounded text-black">
                  <li>
                    <h5 className="text-cyan-400 fw-bold">Protege tu Cabello al Nadar</h5>
                    <p>Antes de sumergirte en la piscina, humedece y acondiciona tu cabello para prevenir daños causados por el cloro...</p>
                  </li>
                </div>
                <div className="mb-3 bg-white p-3 rounded text-black">
                  <li>
                    <h5 className="text-cyan-400 fw-bold">Maneja tu Cabello con Cuidado</h5>
                    <p>Sé gentil al lavar, peinar y estilizar tu cabello. Evita la fricción excesiva y el uso de herramientas de calor...</p>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
