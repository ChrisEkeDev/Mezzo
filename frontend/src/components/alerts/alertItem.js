import React from 'react'
import { useEffect } from "react";
import './alerts.css';
import { TbAlertCircle } from 'react-icons/tb';


function AlertItem({removeAlerts, alert}) {

useEffect(() => {
    setTimeout(() => removeAlerts(alert), 5000)
}, [alert]);

  return (
    <div onClick={() => removeAlerts(alert)} className='alert--wrapper'>
      <div className='alert--label'>
        <TbAlertCircle className='alert--icon'/>
        <p className='alert--message'>{alert.message}</p>
      </div>
    </div>
  )
}

export default AlertItem
