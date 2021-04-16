import React from 'react'
import { useAlert } from 'react-alert'
 
const AlertComponent = () => {
  const alert = useAlert()
 
  return (

    <img src onError={alert.show('Błędne dane !')} />
    
  )
  
}
 
export default AlertComponent