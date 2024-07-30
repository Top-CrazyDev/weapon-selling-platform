import React, { useState } from "react";
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from "react-spinners/ClipLoader";
import apis from "../../../api";

const override = {
	display: "block",
	margin: "0 auto",
	borderColor: "#3f7fe9",
};

const signInBtn = {
    cursor: 'pointer',
    backgroundPosition: 'right -170px',
    display: 'block',
    height: '28px',
    position: 'relative',
    color: '#000',
    fontSize: '12px',
    lineHeight: '28px',
    textAlign: 'center',
    fontWeight: '700',
    textDecoration: 'none',
    textShadow: '0 1px 0 #ffe093',
    width: '200px',
    borderRadius: '2px',
    margin: '30px auto'
}

const UploadProduct = () => {
    const [loading, setLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [file, setFile] = useState({});

    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            setFile(files[0])
            setIsReady(true) 
        }
    }

    const handleFile = () => {
        if(isReady) {
            setLoading(true)
            /* Boilerplate to set up FileReader */
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;
        
            reader.onload = async (e) => {
            /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws);
                /* Update state */
                let result = [];
                const chunkSize = 200;
                for (let i = 0; i < data.length; i += chunkSize) {
                    result.push(data.slice(i, i + chunkSize));
                }
                for(const req of result) {
                    await apis.uploadProduct(req)
                }
                setLoading(false);
            };
           
            if (rABS) {
            	reader.readAsBinaryString(file);
            } else {
            	reader.readAsArrayBuffer(file);
            };
        }else{
			toast.warning("Please select the file first!", {
				position: toast.POSITION.TOP_RIGHT
			});
		}
    }

    const handleFile1 = () => {
        if(isReady) {
            setLoading(true)
            /* Boilerplate to set up FileReader */
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;
        
            reader.onload = async (e) => {
            /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws);
                /* Update state */
                let result = [];
                const chunkSize = 200;
                for (let i = 0; i < data.length; i += chunkSize) {
                    result.push(data.slice(i, i + chunkSize));
                }
                for(const req of result) {
                    await apis.addImgLink(req)
                }
                setLoading(false);
            };
           
            if (rABS) {
            	reader.readAsBinaryString(file);
            } else {
            	reader.readAsArrayBuffer(file);
            };
        }else{
			toast.warning("Please select the file first!", {
				position: toast.POSITION.TOP_RIGHT
			});
		}
    }

    return (
        <div className="product-upload" style={{ textAlign: 'center' }}>
            <ToastContainer />
            <label className='label' htmlFor="file" style={{ margin: '20px 0', display: 'block'}}>Select a CSV file to upload product information!</label>
            <div className='button-group'>
                <input type="file" className="form-control" id="file" onChange={handleChange} />
                <div className='btn-primary' style={signInBtn} onClick={handleFile}>
					Upload
				</div>
            </div>
            <hr />
            <label className='label' htmlFor="file" style={{ margin: '20px 0', display: 'block'}}>Select a CSV file to upload product images!</label>
            <div className='button-group'>
                <input type="file" className="form-control" id="file" onChange={handleChange} />
                <div className='btn-primary' style={signInBtn} onClick={handleFile1}>
					Upload
				</div>
            </div>
            {
                loading && <div className='loading-component'>
                    <BounceLoader color={'yellow'} loading={loading} cssOverride={override} size={150} />
                </div>
            }
        </div>
    );
}

export default UploadProduct;