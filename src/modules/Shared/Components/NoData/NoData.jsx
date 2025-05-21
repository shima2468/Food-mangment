import React from 'react'
import NoDataImg from "../../../../assets/images/NoData.png"
export default function NoData() {
  return (
    <>
         
             <tr>
                <td colSpan="3">
                  <div
                    className="d-flex flex-column justify-content-center align-items-center gap-1"
                    style={{ height: '400px' }}
                  >
                     <img src={NoDataImg} alt="" />
                     <h3>No Data !</h3>
                     <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
                  </div>
                </td>
              </tr>
    </>
  )
}
