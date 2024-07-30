// import BounceLoader from "react-spinners/ClipLoader";

// const override = {
// 	display: "block",
// 	margin: "0 auto",
// 	borderColor: "#3f7fe9",
// };

// const Loading = () => {
//     return (
//       <div className='loading-component'>
//         <BounceLoader color={'yellow'} loading={true} cssOverride={override} size={150} />
//       </div>
//     )
//   }
  
//   export default Loading;

import { Spin } from 'antd';

const Loading = () => {
    return (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Spin style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }} size="large" spinning={true} fullscreen />
        </div>
      </div>
    )
  }
  
  export default Loading;