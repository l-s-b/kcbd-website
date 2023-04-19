import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image from "./Image";
import { Link } from "react-router-dom";

export default function MuiCard({ id, className, item }) {
  return (
    <Card id={id} className={className} css2="card">
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
