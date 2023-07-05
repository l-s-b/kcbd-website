import { useRef } from "react";

export default function HeaderAlert({ headerHeight }) {
  const alertRef = useRef(null);
  const alertTranslation = {
    "--headerHeight": headerHeight + "px",
  };
/*   const handleCloseAlert = () => {
    if (alertRef.current) {
      alertRef.current.classList.remove("roll-down");
      alertRef.current.classList.add("roll-back-up");
      setTimeout(() => {
        alertRef.current.style.display = "none";
      }, 2000);
    }
  }; */
  return (
    <div
      ref={alertRef}
      style={alertTranslation}
      className="abs l r z30 pad05 blue-bg light-txt center-txt roll-down"
    >
      <b>Envíos gratis para tus compras a partir de $40000!</b>
    </div>
  );
}
