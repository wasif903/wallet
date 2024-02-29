'use client'
import React from 'react'
import Loader from '../loader/Loader'
import dynamic from 'next/dynamic'

const Button = ({ name, bgcolor, className, disabled, onClick, isLoading, icon, textColor, style, pClass, mainClass }) => {
   let btnClass

   if (disabled) {
      btnClass = ` cursor-not-allowed text-gray-400 p-3 px-10 rounded-lg bg-gray-600 ${className}`
   } else if (mainClass) {
      btnClass = mainClass
   } else {
      btnClass = `p-3 px-10 text-white
       rounded-lg flex items-center justify-center ${className} w-full active:scale-95`
   }

   return (
      <button
         className={`${btnClass}  ${textColor}
      ${bgcolor ? bgcolor : disabled ? 'bg-gray-600' : 'bg-primary-color'}
      ${disabled ? 'text-white' : 'text-primary-color'}
      `}
         style={style}
         onClick={() => {
            if (disabled === true || isLoading) {
               return
            } else if (onClick) {
               return onClick()
            } else {
               return
            }
         }}
         disabled={disabled}>
         {isLoading ? (
            <p className={`flex items-center justify-center gap-2 ${pClass}`}>
               <Loader /> Loading...
            </p>
         ) : icon ? (
            <p className={`flex items-center gap-2 w-full ${pClass}`}>
               {icon} {name}
            </p>
         ) : (
            <p className={`flex items-center gap-2 justify-center w-full ${pClass}`}>
               {name}
            </p>
         )}
      </button>
   )
}

export default dynamic(() => Promise.resolve(Button), { ssr: false })
