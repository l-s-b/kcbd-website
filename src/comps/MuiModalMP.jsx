import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import '../css/MPButton.css';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
initMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY, {locale: 'es-AR'});

export default function MuiModalMP({data, p, qty, disabled}) {

  // STATES
  const [preferenceId, setPreferenceId] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
      "name": "",
      "sf": false,
      "prov": "",
      "city": "",
      "postal": "",
      "address": "",
      "phone": "",
      "email": ""
  })

  // DECLARATIONS
  let allFieldsOK = null;
  const validations = {
    "name": form.name.length > 5 && form.name.includes(" "),
    "prov": form.prov.length >= 5,
    "city": form.city.length >= 3,
    "postal": (form.postal.length === 4 || form.postal.length === 8),
    "address": form.address.length > 5 && form.address.includes(" "),
    "phone": form.phone.length >= 7,
    "email": form.email.length >= 7 && form.email.includes("@") && form.email.includes("."),
  }
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    boxShadow: 24,
    p: 4
  };

  // ACTIONS AND HANDLERS
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPreferenceId(null);
  }

  function validateThisField(e, key) {
    if (e) { key = e.target.name }
    if (validations.hasOwnProperty(key) && validations[key] === true) {
      document.querySelector(`input[name="${key}"]`).classList.remove('_notValid');
      document.querySelector(`input[name="${key}"]`).classList.add('_valid');
    }
    if (validations.hasOwnProperty(key) && validations[key] !== true) {
      allFieldsOK = false;
      document.querySelector(`input[name="${key}"]`).classList.remove('_valid');
      document.querySelector(`input[name="${key}"]`).classList.add('_notValid');
    }
  }

  function validateAll() {
    allFieldsOK = null
    for (const key in validations) {
      validateThisField(null, key)
    }
    if (allFieldsOK === null) {
      allFieldsOK = true
    }
  }

  const createPref = async () => {
    const dontShipImTesting = form.name === "Don't Ship I'm Testing";
    const freeShipping = p.elegida || p.price * qty > 45000 || dontShipImTesting;
    const courierPrice = freeShipping ? 0 : form.sf ? 500 : 1100;
    try {
      const response = await axios.post(
          `${data.backend}/create_preference`,
          {
            detail: p.detail,
            price: p.price + (courierPrice/qty),
            qty: qty,
            currency_id: "ARS"
          }
        );
        const { id } = response.data;
        return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleMPSubmit = async () => {
    validateAll();
    const id = allFieldsOK && await createPref();
    if (allFieldsOK) {
      document.querySelectorAll('.formMP input')
      .forEach(input => input.disabled = true);
      document.querySelector('#formMP').style.display = "none";
      document.querySelector('.modalHeader').style.display = "none";
    }
    if (id) { setPreferenceId(id) }
  }

  const handleSF = e => {
    const { checked } = e.target;
    setForm(form => ({
      ...form,
      "sf": checked,
      "prov": checked ? "Santa Fe" : "",
      "city": checked ? "Santa Fe" : "",
      "postal": checked ? "3000" : ""
    }));
    if (!checked) {
      document.querySelector(`input[name="prov"]`).classList.remove('_valid');
      document.querySelector(`input[name="city"]`).classList.remove('_valid');
      document.querySelector(`input[name="postal"]`).classList.remove('_valid');
    }
  }

  function handleFormChange(e) {
    document.querySelector(`input[name=${e.target.name}]`).classList.remove('_valid');
    document.querySelector(`input[name=${e.target.name}]`).classList.remove('_notValid');
    e.preventDefault();
    setForm(form => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  }

  function setCart() {
    const currentCart = localStorage.getItem('carrito');
    console.log(currentCart);
    if (!currentCart) {
      localStorage.setItem('carrito', [])
    }
  }

  function saveCartMsg() {
    const freeShipping = p.elegida || p.price * qty > 40000
    const courierPrice = freeShipping ? 0 : form.sf ? 500 : 1100;
    const finalPrice = p.price * qty + courierPrice;
    const dataSendURL = (
      `https://api.whatsapp.com/` +
      `send?phone=${data.contact.phone}` +
      `&text=${data.contact.cart}` +
      `%0D%0AProducto: ${p.detail}` +
      `%0D%0ACantidad: ${qty}`+
      `%0D%0A*Precio total: $${finalPrice}*` +
      `%0D%0A%0D%0ADatos para el envío:` +
      `%0D%0A%0D%0ARecibe: ${form.name}` +
      `%0D%0AProvincia: ${form.prov}` +
      `%0D%0ACiudad: ${form.city}` +
      `%0D%0ACódigo Postal: ${form.postal}` +
      `%0D%0ADirección: ${form.address}` +
      `%0D%0ATeléfono: ${form.phone}` +
      `%0D%0ACorreo electrónico: ${form.email}`
      );

      localStorage.setItem('lastPurchaseMsg', dataSendURL)
  }

  const Buy = () => preferenceId &&
  <div id="lastSteps" className="flex col centerXch">
    {saveCartMsg()}
    <h2>¡Último paso!</h2>
    <p>Hacer el pago aquí:</p>
    <div id="_mp">
      <Wallet initialization={{
        preferenceId,
        redirectMode: 'self'
      }} />
    </div>
  </div>

  const showLocationInputs = {
    "display": form.sf ? "none" : "flex"
  }
  // RENDERING
  return (
    <div className="t400">
      {setCart()}
      <button
        className="pad1 pill bg2 fs1-2 bold hoverToDark t400 centerXY pointer"
        onClick={handleOpen}
        disabled={disabled}
      >
        Comprar Online
      </button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} className="flex flexCh col br1 bg1">
          <h2 className="modalHeader">Necesitamos unos datos:</h2>
          <form id="formMP" className="formMP col" autoComplete='off'>
            <label className="centerXY col">
              Nombre completo
              <input
                type="text"
                value={form.name}
                name="name"
                onChange={handleFormChange}
                onBlur={e => validateThisField(e, null)}
                id=""
              />
            </label>
            <label className="centerXY wrap centerX centerY">
              ¿Te enviamos a ciudad de Santa Fe?
              <div className="row centerY">
                <Switch checked={form.sf} onChange={handleSF} />
                <label><b>{form.sf ? "Sí" : "No"}</b></label>
              </div>
            </label>
            <label style={showLocationInputs} className="centerXY col">
              Provincia
              <input
                type="text"
                value={form.prov}
                name="prov"
                onChange={handleFormChange}
                onBlur={e => validateThisField(e, null)}
                disabled={form.sf}
                id=""
              />
            </label>
            <label style={showLocationInputs} className="centerXY col">
              Localidad
              <input
                type="text"
                value={form.city}
                name="city"
                onChange={handleFormChange}
                onBlur={e => validateThisField(e, null)}
                disabled={form.sf}
                id=""
              />
            </label>
            <label style={showLocationInputs} className="centerXY col">
              Código Postal
              <input
                type="number"
                value={form.postal}
                name="postal"
                disabled={form.sf}
                onBlur={e => validateThisField(e, null)}
                onChange={handleFormChange}
                id=""
              />
            </label>
            <label className="centerXY col">
              Dirección
              <input
                type="text"
                value={form.address}
                name="address"
                onBlur={e => validateThisField(e, null)}
                onChange={handleFormChange}
                id=""
              />
            </label>
            <label className="centerXY col">
              N° de teléfono
              <input
                type="number"
                value={form.phone}
                name="phone"
                onBlur={e => validateThisField(e, null)}
                onChange={handleFormChange}
                id=""
              />
            </label>
            <label className="centerXY col">
              Correo electrónico
              <input
                type="email"
                value={form.email}
                name="email"
                onBlur={e => validateThisField(e, null)}
                onChange={handleFormChange}
                id=""
              />
            </label>
            <input
              type="button"
              id="bg2"
              className="m1y pad1 pill bg2 fs1-2 bold hoverToDark t400 centerXY pointer"
              value="Cargar datos"
              onClick={handleMPSubmit}
            />
          </form>
          {Buy()}
        </Box>
      </Modal>
    </div>
  );
}