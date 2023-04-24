import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image from "./Image";
import { Link } from "react-router-dom";

export default function MuiCard({ id, className, item }) {
  function NoStock() {
    return (
      <div className="hw100 abs z40 flex col light-txtCh centerY centerX">
        <div className="dark-bg o50 hw100 abs" />
        <h1 className="o100 z50">Sin stock</h1>
        <p className="o100 z50">(por el momento)</p>
      </div>
    )
  }
  return (
    <Card id={id} className={`rel ${className}`} css2="card">
      {!item.stock && <NoStock />}
      <Link className="z30" to={`/products/${item.id}`}>
        <Image
          fileName={item.filename}
          alt={item.name}
          className="flex _cardImage centerXY"
        />
        <CardContent id={id} css="cardContent" className="center-txt flex col">
          <label className="_itemName">{item.name}</label>
          <b className="_itemPrice">${item.price}</b>
        </CardContent>
      </Link>
    </Card>
  );
}
