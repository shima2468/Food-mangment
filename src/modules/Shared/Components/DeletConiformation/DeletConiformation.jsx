import React from 'react'
import NoDataImg from "../../../../assets/images/NoData.png"
export default function DeletConiformation({deletitem}) {
  return (
      <>
                <div   className="d-flex flex-column justify-content-center align-items-center " style={{ height: '390px' }} >
                                         
                             <img src={NoDataImg} alt="" />
                              <h5 className='my-2'>Delete this {}?</h5>
                              <p className='text-muted fs-6 px-4 text-center'>are you sure you want to delete this item ? if you are sure just click on delete it</p>                  
                                                         
                                                            
                </div>
      
      </>
  )
}
