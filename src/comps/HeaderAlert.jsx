import { useRef } from "react";

export default function HeaderAlert({ headerHeight }) {
  const modalRef = useRef(null);
  const modalTranslation = {
    "--headerHeight": headerHeight + "px",
  };
  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.remove("roll-down");
      modalRef.current.classList.add("roll-back-up");
      setTimeout(() => {
        modalRef.current.style.display = "none";
      }, 2000);
    }
  };
  return (
    <div
      ref={modalRef}
      style={modalTranslation}
      className="abs l r z30 pad05 blue-bg light-txt center-txt roll-down"
    >
      <b>Envíos gratis para tus compras a partir de $40000!</b>
      <b
        onClick={handleCloseModal}
        style={{ marginRight: "2em" }}
        className="abs r centerXY pointer t1k"
      >
        x
      </b>
    </div>
  );
}
