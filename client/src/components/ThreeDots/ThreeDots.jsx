import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { RxDotsHorizontal } from 'react-icons/rx'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
const ThreeDots = ({ func }) => {
   const [isOptions, setIsOptions] = useState(false)

   return (
      <div className='bg-transparent  gap-2 pr-2 flex items-center justify-center relative'>
         <BsThreeDotsVertical size={20} className='cursor-pointer' onClick={() => setIsOptions(!isOptions)} />
         {isOptions && (
            <div className='absolute top-9 right-6 rounded  z-50 flex flex-col gap-0 p-2 bg-primary-color'>
               <span
                  className='flex items-center gap-2 cursor-pointer p-2 text-white-color  rounded'
                  onClick={func}>
                  <IoMdInformationCircleOutline />
                  <p className='text-sm text-white text-nowrap'>View All</p>
               </span>

            </div>
         )}
      </div>
   )
}

export default ThreeDots
