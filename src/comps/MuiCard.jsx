import * as React from "react";
import Card from "@mui/material/Card";
import Image from "./Image";

export default function MuiCard({ id, className, item }) {
  const overwrite = {
    overflowX: "visible",
    overflowY: "visible",
    borderRadius: "1rem"
  }
  function NoStock() {
    return (
      <div className="hw100 abs z40 flex col light-txtCh centerY centerX">
        <div className="dark-bg o75 hw100 abs br1 " />
        <h2 className="o100 z50 _itemName">{item.detail}</h2>
        <b className="o100 z50 _itemPrice">${item.price}</b>
        <h1 className="o100 z50">Sin stock</h1>
        <i className="o100 z50 center-txt">Preguntá por alternativas!</i>
      </div>
    )
  }
  function Hover() {
    return (
      <>
      <div id="_desktopCard" style={overwrite} className="hw100 abs br1 z40 flex col centerY centerX t400">
        <div className="bg1 br1 o75 hw100 abs" />
        <h2 className="o100 z50 _itemName center-txt">{item.detail}</h2>
        <b className="o100 z50 _itemPrice">${item.price}</b>
      </div>
      <div id="_mobileCard" style={overwrite} className="hw100 abs br1 z40 flex col centerY t400">
      <h2 className="abs _outerTop center-txt bg1 p1x pill w-fit z50 _itemName">{item.detail}</h2>
      <b className="abs _outerBottom bg1 pad05 pill w-fit z50 _itemPrice">${item.price}</b>
    </div>
    </>
    )
  }
  return item.stock && (
    <Card id={id} style={overwrite} className={`rel ${className}`} css2="card">
      {/* {!item.stock && <NoStock />} */}
      <a id="_centerFix" className="flex hw100 z30 br1 centerY centerX" href={`/products/${item.id}`}>
        {/* {item.stock && <Hover />} */}
        <Hover />
        <Image
          fileName={item.mainImage}
          alt={item.detail}
          className="flex _cardImage centerXY"
        />
      </a>
    </Card>
  );
}
