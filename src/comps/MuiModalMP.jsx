import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import axios from 'axios';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
initMercadoPago("APP_USR-2074cd4c-4f91-475c-803f-60a4f640c72f", {locale: 'es-AR'});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  boxShadow: 24,
  p: 4,
};

export default function MuiModalMP({data, p, qty}) {
  
  const [preferenceId, setPreferenceId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
/*   const handleClose = () => setOpen(false); */
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

  const validateForm = (
    form.name.length > 5 &&
    form.name.includes(" ") &&
    form.prov.length >= 5 &&
    form.city.length >= 3 &&
    (form.postal.length === 4 || form.postal.length === 8) &&
    form.address.length > 5 && form.address.includes(" ") &&
    form.phone.length >= 7 &&
    form.email.length >= 7 &&
    form.email.includes("@") &&
    form.email.includes(".")
  );

  const createPref = async () => {
    console.log(data.backend);
    console.log(p);
    console.log(qty);
    const elegida = p.elegida;
    const freeShipping = p.price * qty > 40000
    const courierPrice = (elegida || freeShipping) ? 0 : form.sf ? 500 : 1100;
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
        console.log("ID: ", id);
        return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleMPSubmit = async () => {
    const id = validateForm && await createPref();
    validateForm && document.querySelectorAll('.formMP input').forEach(
      input => input.disabled = true
    )
    if (id) { setPreferenceId(id) }
  }

  const handleSF = e => {
    const { checked } = e.target;
    setForm(form => ({
      ...form,
      "sf": checked,
      "prov": checked ? "Santa Fe" : "",
      "city": checked ? "Santa Fe" : "",
      "postal": checked ? 3000 : ""
    }))
  }

  useEffect(() => {
    //Just to check the form is working okay. Delete or comment when debugged or done
    console.log(form);
  }, [form]);

  function handleFormChange(e) {
    e.preventDefault();
      setForm(form => ({
        ...form,
        [e.target.name]: e.target.value,
      }));
    }

  const MPButton = () => preferenceId &&
  <div id="_mp">
    <Wallet initialization={{preferenceId}} />
  </div>

  const showLocationInputs = {
    "display": form.sf ? "none" : "flex"
  }

  return (
    <div className="t400">
      <Button onClick={handleOpen}>Comprar Online</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} className="flex flexCh col br1 bg1">
          <h2>Necesitamos unos datos:</h2>
          <form className="formMP col">
            <label className="centerXY col">
              Nombre completo
              <input type="text" value={form.name} name="name" onChange={handleFormChange} id="" />
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
              <input type="text" value={form.prov} name="prov" onChange={handleFormChange} disabled={form.sf} id="" />
            </label>
            <label style={showLocationInputs} className="centerXY col">
              Localidad
              <input type="text" value={form.city} name="city" onChange={handleFormChange} disabled={form.sf} id="" />
            </label>
            <label style={showLocationInputs} className="centerXY col">
              Código Postal
              <input type="number" value={form.postal} name="postal" disabled={form.sf} onChange={handleFormChange} id="" />
            </label>
            <label>Dirección</label>
            <input type="text" value={form.address} name="address" onChange={handleFormChange} id="" />
            <label>N° de teléfono</label>
            <input type="number" value={form.phone} name="phone" onChange={handleFormChange} id="" />
            <label>Correo electrónico</label>
            <input type="email" value={form.email} name="email" onChange={handleFormChange} id="" />
            <input type='button' value="Enviar datos" onClick={handleMPSubmit} />
          </form>
          {MPButton()}
        </Box>
      </Modal>
    </div>
  );
}