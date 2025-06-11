import ClipLoader from "react-spinners/ClipLoader";



export default function loading() {


  return (
     <>
      
    <tr>
      <td colSpan="12">
         <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                          <ClipLoader color="#4fa94d" size={50} />
    </div>
      </td>
    </tr>
     </>
  )
}


