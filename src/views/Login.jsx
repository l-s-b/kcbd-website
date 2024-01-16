import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import MuiNavbar from '../comps/MuiNavbar';
import PageContainer from '../comps/PageContainer';
import Footer from '../comps/Footer';

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Error de login");
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    boxShadow: 24,
    p: 4
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  function LoginForm() {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const posted = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}login`, formData);
          if (posted) { navigate('/'); }
      } catch (error) {
          setMessage(error.response?.data?.error || error.response?.data?.message || "Credenciales incorrectas.");
          handleOpen()
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    return (
      <div className="flex col h100 z30 bg1 br2 pad2">
        <h2>Login</h2>
        <form className="flex col pad2" onSubmit={handleSubmit}>
            <label>
            <input
                type="text"
                name="username"
                placeholder="Usuario"
                value={formData.username}
                onChange={handleInputChange}
            />
            </label>
            <br />
            <label>
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
            />
            </label>
            <br />
            <button
                className="bg2 br1 fs1-2 bold hoverToDark pill pad1 t200 pointer _scaleWhenMobile"
                type="submit"
            >Entrar</button>
        </form>
    </div>
    )
  }

  function LoginFailModal() {
    return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle} className="flex flexCh centerXYch col br1 bg1">
        <h2>Uh oh...</h2>
        <p className="m1y">{`${message}`}</p>
        <button
          className="bg2 br1 fs1-2 bold hoverToDark pill pad1 t200 pointer _scaleWhenMobile"
          onClick={handleClose}
        >Intentar de nuevo</button>
      </Box>
    </Modal>
  )
}

  return (
    <>
        <MuiNavbar showSearch={false} />
        <div className="centerXYch">
        <PageContainer showPattern={true} rotate={true}>
            <LoginForm />
            <LoginFailModal />
        </PageContainer>
        </div>
        <Footer />
    </>
  );
};

export default Login;
