import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import React from 'react'

function ResponseToast({ res, onClick, message, success }) {
   if (res) {
      if (!res.error) {
         Toastify({
            text: `${res?.data?.message}`,
            duration: 5000,
            newWindow: true,
            close: true,
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
               background: `darkgreen`,
               borderRadius: '10px',
               color: `white`,
               fill: `white`,
            },
            onClick: onClick, // Callback after click
         }).showToast()
      } else {
         Toastify({
            text: `${res?.error?.data?.message}`,
            duration: 5000,
            newWindow: true,
            close: true,
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
               background: `red`,
               borderRadius: '10px',
               color: `white`,
               fill: `white`,
            },
            onClick: onClick, // Callback after click
         }).showToast()
      }
   } else {
      Toastify({
         text: `${message}`,
         duration: 5000,
         newWindow: true,
         close: true,
         gravity: 'top', // `top` or `bottom`
         position: 'center', // `left`, `center` or `right`
         stopOnFocus: true, // Prevents dismissing of toast on hover
         style: {
            background: success ? 'darkgreen' : `red`,
            borderRadius: '10px',
            color: `white`,
            fill: `white`,
         },
         onClick: onClick, // Callback after click
      }).showToast()
   }
}

export default ResponseToast
