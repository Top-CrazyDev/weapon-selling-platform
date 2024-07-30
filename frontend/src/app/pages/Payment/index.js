import React, { useEffect, useState, useContext } from 'react';
import apis from '../../api';
import {Input , Select, Button, message} from 'antd';

const Payment = () => {
    const[expireMonth, setExpireMonth] = useState();
    const[expireYear, setExpireYear] = useState();
    const[cardNumber, setCardNumber] = useState("");
    const[cardName, setCardName] = useState("");
    const[cardCVV, setCardCVV] = useState("");
    const months=[
        {value: "01", label: "01"},
        {value: "02", label: "02"},
        {value: "03", label: "03"},
        {value: "04", label: "04"},
        {value: "05", label: "05"},
        {value: "06", label: "06"},
        {value: "07", label: "07"},
        {value: "08", label: "08"},
        {value: "09", label: "09"},
        {value: "10", label: "10"},
        {value: "11", label: "11"},
        {value: "12", label: "12"}
    ];
    const years=[
        {value: "2024", label: "2024"},
        {value: "2025", label: "2025"},
        {value: "2026", label: "2026"},
        {value: "2027", label: "2027"},
        {value: "2028", label: "2028"},
        {value: "2029", label: "2029"},
        {value: "2030", label: "2030"}
    ];
    const onChangeName = (e) => {
        setCardName(e.target.value);
    }
    const onChangeNumber = (e) => {
        setCardNumber(e.target.value);
    }
    const onChangeCVV = (e) => {
        setCardCVV(e.target.value);
    }
    const onChangeMonth = (value)=>{
        setExpireMonth(value);
    }
    const onChangeYear =(value) =>{
        setExpireYear(value);
    }
    const onClickConfirm = async () =>{
        try{
            const res = await apis.addpayment({
                "cardName" : cardName, 
                "cardNumber" : cardNumber, 
                "expireMonth" : expireMonth, 
                "expireYear" : expireYear, 
                "cardCVV" : cardCVV
            });
            // if(res.data.success) {
                
            // }

        }catch(e){
            message.error(e.response.data);
        }
            
    }
    return(
        <>
            <div className="payment">
                Please connect your card to proceed the payment
                <div className='card-container'>
                    <div className='card-detail'>Card Detail</div>
                    <div className='card-name-container'>
                        <div className='card-name-title'>Name (as it appears on card)</div>
                        <Input onChange={onChangeName} value={cardName}/>
                    </div>
                    <div className='card-number-container'>
                        <div className='card-number-title'>Card Number</div>
                        <Input onChange={onChangeNumber} value={cardNumber}/>
                    </div>
                    <div className='expire-container'>
                        <div className='expire-title'>Expire Date</div>
                        <div className='expire-date-container'>
                            <Select
                                className='expire-month-select'
                                value={expireMonth}
                                placeholder="Month"
                                onChange={onChangeMonth}
                                options={months}
                            />
                            <Select
                                className='expire-year-select'
                                value={expireYear}
                                placeholder="Year"
                                onChange={onChangeYear}
                                options={years}
                            />
                        </div>
                    </div>
                    <div className='cvv-container'>
                        <div className='cvv-title'>CVV</div>
                        <Input placeholder='***' onChange={onChangeCVV} value={cardCVV}/>
                    </div>
                    <div className='btn-container'>
                        <Button onClick={onClickConfirm}>Confirm</Button>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Payment;