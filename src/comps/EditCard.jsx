import { useState } from "react";
import Card from "@mui/material/Card";
import Image from "./Image";
import axios from "axios";

export default function EditCard({ id, className, item }) {
  const overwrite = {
    overflowX: "visible",
    overflowY: "visible",
    borderRadius: "1rem"
  }

  const stockText = stock => stock ? "Sí" : "No";

  const [editBody, setEditBody] = useState({"id": item.id});
  const [price, setPrice] = useState(item.price)
  const [stock, setStock] = useState(item.stock)

  const handlePrice = e => {
    const editedPrice = (e.target.value === "") ? 0 : parseInt(e.target.value);
    e.preventDefault();
    setPrice(editedPrice)
    setEditBody({
      ...editBody,
      "price": editedPrice
    })
  }

  const handleStock = (e) => {
    const switched = e.target.checked
    setStock(switched)
    setEditBody({
      ...editBody,
      "stock": switched
    })
  }

  const handleUpdate = async (e, id) => {
    try {
      e.target.value = "Actualizando..."
    const updated = await axios.patch(`${process.env.REACT_APP_BACKEND_LINK}/product/${id}`, editBody);
    e.target.value = updated && "OK!";
    } catch (error) {
      console.error(error)
      e.target.value = "Error :(";
    }
    setTimeout(() => {e.target.value = "Guardar cambios"}, 2500)
    
  }

  return (
    <Card id={id} style={overwrite} className={`rel ${className}`} css2="card">
      <div id="_centerFix" className="flex col hw100 z30 br1 centerY centerX">
        <Image
          fileName={item.mainImage}
          alt={item.detail}
          className="flex _cardImage centerXY"
        />
        <div className="pad05 flex w100 row evenly">
        <label>Precio:</label>
        $<input style={{width: "5rem"}} type="number" value={price} onChange={e => handlePrice(e)} />
          </div>
          <div className="flex w100 row evenly">
      <label>En stock:</label>
      <input type="checkbox" checked={stock} onChange={e => handleStock(e)} />
      <b>({stockText(stock)})</b>
      </div>
      <input className="m1 pad05" type="button" value="Guardar cambios" onClick={e => handleUpdate(e, id)} />
      </div>
    </Card>
  );
}
