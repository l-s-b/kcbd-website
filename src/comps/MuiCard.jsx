import * as React from "react";
import Card from "@mui/material/Card";
import Image from "./Image";
import { Link } from "react-router-dom";

export default function MuiCard({ id, className, item }) {
  function NoStock() {
    return (
      <div className="hw100 abs z40 flex col light-txtCh centerY centerX">
        <div className="dark-bg o50 hw100 abs" />
        <h2 className="o100 z50 _itemName">{item.detail}</h2>
        <b className="o100 z50 _itemPrice">${item.price}</b>
        <h1 className="o100 z50">Sin stock</h1>
        <p className="o100 z50">(por el momento)</p>
      </div>
    )
  }
  function Hover() {
    return (
      <div css="cardContent" className="hw100 abs z40 flex col centerY centerX t400">
        <div className="bg1 o75 hw100 abs" />
        <h2 className="o100 z50 _itemName">{item.detail}</h2>
        <b className="o100 z50 _itemPrice">${item.price}</b>
      </div>
    )
  }
  return (
    <Card id={id} className={`rel ${className}`} css2="card">
      {!item.stock && <NoStock />}
      <Link id="_centerFix" className="flex hw100 z30 centerY centerX" to={`/products/${item.id}`}>
        {item.stock && <Hover />}
        <Image
          fileName={item.mainImage}
          alt={item.detail}
          className="flex _cardImage centerXY"
        />
      </Link>
    </Card>
  );
}
