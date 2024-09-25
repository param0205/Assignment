import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";



const Spinner = ({loading}) => {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };
  return (
    <ClipLoader 
    color='#4338ca'
    cssOverride={override}
    loading={loading}
    size={150}/>
  )
}

export default Spinner