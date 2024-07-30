import React, { useState, useContext } from "react";
import { Button, Modal, Space, Input, Typography, Select, Drawer, message, DatePicker } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apis from "../../api";
import {
    FileOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import GoogleMapReact from 'google-map-react';
import UserContext from "../../utils/UserContext";

const Marker = ({ children }) => children;

const InfoWindow = ({ children }) => children;

const API_KEY = "AIzaSyDDmRHy7x10C8X678t_Ybh2TpvNW1TNADc";

const FFLDealer = (props) => {
    const { setSpinning } = useContext(UserContext);
    const [distance, setDistance] = useState(25);
    const [zipCode, setZipCode] = useState('');
    const [dealers, setDealers] = useState([]);
    const [selectedDealer, setSelectedDealer] = useState(null);
    const [currentPos, setCurrentPos] = useState({});
    const [pickedDealer, setPickedDealer] = useState(null);

    const handleZipCodeChange = (ev) => {
        setZipCode(ev.target.value)
    }

    const handleDistanceChange = (value) => {
        setDistance(value)
    };

    const findDealers = async (ev) => {
        ev.preventDefault();

        if (!zipCode || zipCode === "") {
            toast.warning("Please input zip code!", {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        setSpinning(true)
        const res = await apis.getFflDealers({
			"radius": distance,
			"zipcode": zipCode
		});
        setSpinning(false)
        if(res.data.dealers.length > 0) {
            setDealers(res.data.dealers)
            setCurrentPos({ lat: res.data.dealers[1].lat, lng: res.data.dealers[1].lng })
        }else{
            message.info("No dealers found. Please increase the distance.")
        }
    }

    const mapIt = (dealer) => {
        setSelectedDealer(dealer)
    }

    const pickFflDealer = (dealer) => {
        props.pickFflDealer(dealer)
        setPickedDealer(dealer)
    }
 
    return (
        <div className='ffl-dealer' style={{ marginTop: '20px' }}>
            <ToastContainer />
            <div style={{maxWidth: '1480px', margin: '0 auto', padding: '20px', minHeight: '500px'}}>
                <h2 style={{color: '#006400'}}>Find a Federal Firearms License Dealer Near You</h2>
                <h3>Search the aotactical.com network for transfer agents near you.</h3>

                <Typography.Title level={5}>By Distance & Zip code:</Typography.Title>
                <div style={{display: 'flex', justifyContent: 'flex-start', gap: '20px'}}>
                    <Select
                        defaultValue={25}
                        style={{
                            width: '25%',
                        }}
                        onChange={handleDistanceChange}
                        options={[
                            {
                                value: 5,
                                label: '5 Miles',
                            },
                            {
                                value: 15,
                                label: '15 Miles',
                            },
                            {
                                value: 25,
                                label: '25 Miles',
                            },
                            {
                                value: 50,
                                label: '50 Miles',
                            },
                            {
                                value: 100,
                                label: '100 Miles',
                            },
                        ]}
                    />
                    <Input style={{width: '25%'}} placeholder="Zipcode" onChange={handleZipCodeChange} />
                    <Button style={{width: '25%', color: '#006400'}} onClick={findDealers}>Find Dealers</Button>
                </div>
                {
                    selectedDealer && <div style={{ height: '300px', width: '100%', marginTop: '20px' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: API_KEY }}
                            defaultZoom={11}
                            center={currentPos}
                        >
                            <Marker
                                lat={selectedDealer.lat}
                                lng={selectedDealer.lng}
                            >
                                <img src="mark.png" style={{width: '50px'}} />
                            </Marker>
                            {/* <InfoWindow
                                lat={selectedDealer.lat}
                                lng={selectedDealer.lng}
                            >
                                <div style={{backgroundColor: '#fff', color: '#000'}}>
                                {
                                    selectedDealer.business_name || selectedDealer.license_name
                                }
                                </div>
                            </InfoWindow> */}
                        </GoogleMapReact>
                    </div>
                }
                {
                    dealers.length > 0 && <div className="dealer-list" style={{marginTop: '20px'}}>
                        <h4 style={{
                            margin: 0,
                            fontSize: '13px',
                            fontWeight: 600,
                            backgroundColor: '#555',
                            color: '#fff'
                        }}>
                            <span style={{display: 'block', padding: '10px 15px'}}>Search Result:</span>
                        </h4>
                        {
                            dealers.map(dealer => {
                                return <div key={dealer.license_number} style={dealer.business_name === pickedDealer?.business_name ? {padding: '10px 15px', border: '1px solid #d9d9d9', backgroundColor: 'rgba(0, 100, 0, 0.3)'} : {padding: '10px 15px', border: '1px solid #d9d9d9'}} onClick={() => pickFflDealer(dealer)}>
                                    <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <span>
                                            {dealer.business_name || dealer.license_name} ({dealer.license_number})
                                        </span>
                                        <span>
                                            {
                                                dealer.ffl_on_file > 0 && <a style={{color: '#006400'}}>
                                                    <FileOutlined />
                                                    FFL on file
                                                </a>
                                            }
                                            {
                                                (dealer.lat && dealer.lng) && <a style={{marginLeft: '20px', color: '#006400'}} onClick={() => mapIt(dealer)}>
                                                    <EnvironmentOutlined />
                                                    Map it
                                                </a>
                                            }
                                        </span>
                                    </h3>
                                    <div style={{marginBottom: '0.5em'}}>
                                        <h4>Address:</h4>
                                        <div>{dealer.premise_city}, {dealer.premise_state}</div>
                                        <div>{dealer.premise_street}</div>
                                    </div>
                                    <div>
                                        <h4>Phone:</h4>
                                        <div>{dealer.voice_phone}</div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                }
            </div>
            
        </div>
    );
}

export default FFLDealer;