import { useState, CSSProperties } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { ClipLoader } from 'react-spinners';



export default function loading() {


  return (
     <>
      
    <tr>
      <td colSpan="3">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '200px' }}
        >
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </td>
    </tr>
     </>
  )
}
