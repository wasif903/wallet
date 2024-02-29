"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Field = ({ type = "text", disabled, placeHolder, name, ref, bgColor, value, className, onChange, xl, lg, md, isIcon, row, col, maxLength, StyleColor = "black", styles }) => {
   const [isPass, setIsPass] = useState(true);
   console.log(StyleColor)
   // input fields

   const inputClassName = `w-full border-none rounded-lg outline-none ${bgColor ? bgColor : "bg-[#F0F0F0]"} p-3 ${xl ? "sm:w-96 w-4/5" : lg ? "sm:w-80 w-4/5" : md ? "w-64" : "w-48"}`;

   const divClassName = ` w-full border rounded-md border-none ${bgColor ? bgColor : "bg-[#F0F0F0]"} outline-none ${isIcon ? "px-2" : "pr-2"} flex items-center justify-between overflow-hidden ${xl ? "sm:w-96 w-4/5" : lg ? "sm:w-80 w-4/5" : md ? "w-64" : "w-48"}`;

   const textAreaClassName = ` w-full border rounded-lg border-none outline-none px-2 py-1 flex items-center justify-between ${xl ? "w-96" : lg ? "w-80" : md ? "w-64" : "w-48"}`;

   const inputProps = {
      type: isPass && type === "password" ? "password" : type === "text" ? "text" : type === "email" ? "email" : type === "number" ? "number" : type === "range" ? "range" : type === "radio" ? "radio" : type === "checkbox" ? "checkbox" : type === "date" ? "date" : type === "time" ? "time" : type === "url" ? "url" : "text",

      placeholder: placeHolder || (type === "password" ? "Password" : type === "text" ? "Text" : type === "email" ? "Email" : type === "number" ? "Number" : type === "range" ? "Range" : type === "radio" ? "Radio" : type === "checkbox" ? "Checkbox" : type === "date" ? "Date" : type === "time" ? "Time" : type === "url" ? "URL" : "Text"),

      style: { color: StyleColor },
      name: name,
      maxLength: maxLength,
      value: value,
      disabled: disabled,
      onChange: onChange,
      className: className ? `${inputClassName} ${className}` : type === "password" || isIcon ? `w-full ${inputClassName}` : disabled ? `text-gray-500 cursor-not-allowed ${inputClassName}` : `${inputClassName}`,
   };

   const divProps = {
      className: `${divClassName} ${className}`,
   };

   const textareaProps = {
      className: `${textAreaClassName} ${className}`,
      placeHolder: placeHolder,
      disabled: disabled,
      style: { background: "#F0F0F0" },
      onChange: onChange,
      rows: row,
      cols: col,
   };

   return (
      <>
         {type === "password" ? (
            <div {...divProps}>
               <input {...inputProps} />

               {!isPass ? (
                  <FaEye
                     onClick={() => setIsPass(true)}
                     className="cursor-pointer"
                     style={{ color: "var(--primary-color)" }}
                  />
               ) : (
                  <FaEyeSlash
                     onClick={() => setIsPass(false)}
                     className="cursor-pointer"
                     style={{ color: "var(--primary-color)" }}

                  />
               )}
            </div>
         ) : type === "email" && isIcon ? (
            <div {...divProps}>
               <MdEmail
                  color="gray"
                  size={18}
               />

               <input {...inputProps} />
            </div>
         ) : type === "textarea" ? (
            <textarea {...textareaProps} />
         ) : (
            <input
               {...inputProps}
               ref={ref}
            />
         )}
      </>
   );
};

export default Field;
