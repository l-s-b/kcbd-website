import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MuiNavbar from '../comps/MuiNavbar';
import data from '../data/variables.json';
import WB from '../comps/WhatsAppButton';
import EditCard from '../comps/EditCard';
import Footer from '../comps/Footer';
import PageContainer from '../comps/PageContainer';

export default function HomeEdit() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const filters = [
    { string: "Todos los productos", condition: x => true },
    { string: "Automáticas", condition: x => x.seedpack?.seedType === "Automática" },
    { string: "Fotoperiódicas", condition: x => x.seedpack?.seedType === "Fotoperiódica" },
    /*{ string: "Regulares", condition: x => x.seedpack?.seedType === "Regular" },*/
    { string: "Aceites", condition: x => x.type === "oil" },
    { string: "Cremas", condition: x => x.type === "lotion" }
  ];
  
  const seedFilters = async (filter) => {
const correctedFilters = {
  "Automáticas": "Automática",
  "Fotoperiódicas": "Fotoperiódica",
  "Regulares": "Regular"
};

filter = correctedFilters[filter]

    try {
      const body = {
        "where": {
          "$seedpack.seedType$": filter
        },
        "order": [["id", "ASC"]]
      };
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/products/filter`, body);
      const products = response.data;
      setAllProducts(products);
      setFilteredProducts(products.filter(x => x.seedpack?.seedType === filter));
    } catch (error) {
      setAllProducts([]);
      setFilteredProducts([]);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/products`);
        const products = response.data;
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.log('Error fetching products:', error);
        setAllProducts([]);
        setFilteredProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = value => {
    setFilteredProducts(
      allProducts.filter(p =>
        p.detail.toLowerCase().includes(value.toLowerCase())
      )
    );
  };


  const FilterMenu = () => (
    <ul className="z30 m2y br2 dark-bg o75 flex row wrap evenly vw75 centerX2">
      {filters.map((f, index) => (
        <li key={index}>
          <button
            id="bg1"
            className="pill m1 pad05 o100 fs1-2 hoverToLight t200 pointer"
            onClick={async (e) => {
              e.preventDefault();
              let seedFilter = e.target.innerText
              if (['Automáticas', 'Fotoperiódicas', 'Regulares'].includes(seedFilter)) {
                await seedFilters(seedFilter);
              } else {
                setFilteredProducts(allProducts.filter(f.condition));
              }
            }}
          >
            {f.string}
          </button>
        </li>
      ))}
    </ul>
  );

  const catalogContainer = (content) => (
    <ul className="flex row wrap vw90 bg2 centerX centerXY">
      {content}
    </ul>
  )
 
  function Catalog() {
      const catalog = filteredProducts?.sort((a, b) => (a.stock ? -1 : 1)).map((p, index) => (
        <EditCard id="bg1" key={index} className="m1 z30 bg1 _card t1k" item={p} />
      ));
      if (filteredProducts === null) {
        return catalogContainer(<li><h2>Cargando...</h2></li>);
      }
      if (filteredProducts.length === 0) {
        return catalogContainer(
          <h2>Uh, no encontramos nada con ese nombre!</h2>
        );
       } else { return catalogContainer(catalog) }
    }

  return (
    <>
      <MuiNavbar showSearch={true} onSearchChange={handleSearchChange} />
      <PageContainer showPattern={true} rotate={filteredProducts === null}>
        <FilterMenu />
        <Catalog />
      </PageContainer>
      <WB />
      <Footer />
    </>
  );
}
