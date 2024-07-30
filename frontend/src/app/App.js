import React, { useState, useEffect } from "react";
import Axios from "axios";
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import AppLayout from './AppLayout';
import UserContext from "./utils/UserContext";
import constant from './utils/constant';
import apis from "./api";
import { Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [cart, setCart] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    const getOrCreateCustomerId = () => {
      let customerId = Cookies.get('customerId');
      if (!customerId) {
        customerId = uuidv4();
        Cookies.set('customerId', customerId, { expires: 30 });
      }
      return customerId;
    }

    const checkLoggedIn = async () => {
      let token = localStorage.getItem("aotacticalToken");
      if (token === null) {
        localStorage.setItem("aotacticalToken", "");
        localStorage.setItem("aotacticalRole", "");
        token = "";
      }
      const tokenRes = await apis.checkLogin(token);
      if (tokenRes.data) {
        const userRes = await Axios.post(constant.BACKEND_URL + "/users/getUser", null, {
          headers: { "x-auth-token": token },
        });
        setCustomerId(userRes.data.id);
        setUserData({
          token,
          user: userRes.data,
        });
      } else {
        setCustomerId(getOrCreateCustomerId());
      }
    };

    checkLoggedIn();
  }, []);

  useEffect(() => {
    const saveCartToServer = async () => {
      await apis.addToCart({
        id: customerId,
        cart: cart
      })
    }

    if(cart.length > 0) {
      saveCartToServer()
    }
  }, [cart])

  return (
    <IntlProvider locale="en">
      <Router>
        <UserContext.Provider value={{ userData, setUserData, cart, setCart, customerId, setSpinning }}>
          {
            spinning && <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999
            }}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Spin style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }} size="large" spinning={true} fullscreen />
              </div>
            </div>
          }
          <AppLayout />
        </UserContext.Provider>
      </Router>
    </IntlProvider>
  );
}

export default App;
