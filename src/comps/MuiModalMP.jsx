import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import '../css/MPButton.css';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
initMercadoPago("APP_USR-2074cd4c-4f91-475c-803f-60a4f640c72f", {locale: 'es-AR'});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  boxShadow: 24,
  p: 4
};

export default function MuiModalMP({data, p, qty}) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
/*   const handleClose = () => setOpen(false); */
  const [paymentInfo, setPaymentInfo] = useState({});
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
    const elegida = p.elegida;
    const freeShipping = p.price * qty > 40000
    const courierPrice = (elegida || freeShipping) ? 0 : form.sf ? 500 : 1100;
    setPaymentInfo({
      detail: p.detail,
      price: p.price + (courierPrice/qty),
      qty: qty,
      currency_id: "ARS"
    })
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
    allFieldsOK && document.querySelectorAll('.formMP input').forEach(
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
      "postal": checked ? "3000" : ""
    }));
    if (!checked) {
      document.querySelector(`input[name="prov"]`).classList.remove('_valid');
      document.querySelector(`input[name="city"]`).classList.remove('_valid');
      document.querySelector(`input[name="postal"]`).classList.remove('_valid');
    }
  }
/* Just to check the form is working okay. Delete or comment when debugged or done
  useEffect(() => { console.log(form); }, [form]);
  */

  function handleFormChange(e) {
    document.querySelector(`input[name=${e.target.name}]`).classList.remove('_valid');
    document.querySelector(`input[name=${e.target.name}]`).classList.remove('_notValid');
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
      <button className="pad1 pill bg2 fs1-2 bold hoverToDark t400 centerXY pointer" onClick={handleOpen}>
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
              <input type="text" value={form.name} name="name" onChange={handleFormChange} onBlur={e => validateThisField(e, null)} id="" />
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
              <input type="text" value={form.prov} name="prov" onChange={handleFormChange} onBlur={e => validateThisField(e, null)} disabled={form.sf} id="" />
            </label>
            <label style={showLocationInputs} className="centerXY col">
              Localidad
              <input type="text" value={form.city} name="city" onChange={handleFormChange} onBlur={e => validateThisField(e, null)} disabled={form.sf} id="" />
            </label>
            <label style={showLocationInputs} className="centerXY col">
              Código Postal
              <input type="number" value={form.postal} name="postal" disabled={form.sf} onBlur={e => validateThisField(e, null)} onChange={handleFormChange} id="" />
            </label>
            <label className="centerXY col">
              Dirección
              <input type="text" value={form.address} name="address" onBlur={e => validateThisField(e, null)} onChange={handleFormChange} id="" />
            </label>
            <label className="centerXY col">
              N° de teléfono
              <input type="number" value={form.phone} name="phone" onBlur={e => validateThisField(e, null)} onChange={handleFormChange} id="" />
            </label>
            <label className="centerXY col">
              Correo electrónico
              <input type="email" value={form.email} name="email" onBlur={e => validateThisField(e, null)} onChange={handleFormChange} id="" />
            </label>
            <input type="button" id="bg2" className="m1y pad1 pill bg2 fs1-2 bold hoverToDark t400 centerXY pointer" value="Enviar datos" onClick={handleMPSubmit} />
          </form>
          {MPButton()}
        </Box>
      </Modal>
    </div>
  );
}