import React, { useState } from 'react';
import MuiNavbar from '../comps/MuiNavbar';
import products from '../data/products.json';
import WB from '../comps/WhatsAppButton';
import MuiCard from '../comps/MuiCard';
import Footer from '../comps/Footer';
import PageContainer from '../comps/PageContainer';

export default function Home() {

  const [filteredProducts, setFilteredProducts] = useState(products)

  const handleSearchChange = value => {
    setFilteredProducts(products
    .filter(
      p => p.detail.toLowerCase().includes(value.toLowerCase())
    )
    );
  }

  const filters = [
    { string: "Todos los productos", condition: x => true },
    { string: "Automáticas", condition: x => x.seedpack?.seedType === "Automática" },
    { string: "Fotoperiódicas", condition: x => x.seedpack?.seedType === "Fotoperiódica" },
    { string: "Aceites", condition: x => x.type === "oil" },
    { string: "Cremas", condition: x => x.type === "lotion" }
  ]

  const FilterMenu = () => (
    <ul className="z30 m2y br2 dark-bg o75 flex row wrap evenly vw75 centerX2">
      {filters.map((f, index) => (
        <li key={index}>
          <button
            id="bg1"
            className="pill m1 pad05 o100 fs1-2 hoverToLight t200 pointer"
            onClick={() => setFilteredProducts(products.filter(f.condition))}
          >
            {f.string}
          </button>
        </li>
      ))}
    </ul>
  );
 
  const Catalog = () => (
    <ul className="flex row wrap vw90 bg2 centerX centerXY">
      {filteredProducts
      .sort(function(a) {
        if (a.stock) {return -1} else {return 1}
      })
      .map((p, index) => (
        <MuiCard id="bg1" key={index} className="m1 z30 bg1 _card t1k" item={p} />
      ))
      }
      {
        filteredProducts.length === 0 &&
        <h2>Uh, no encontramos nada con ese nombre!</h2>
      }
    </ul>
  )

  return (
    <>
      <MuiNavbar onSearchChange={handleSearchChange} />
      <PageContainer showPattern={true}>
        <FilterMenu />
        <Catalog />
      </PageContainer>
      <WB />
      <Footer />
    </>
  )
}
