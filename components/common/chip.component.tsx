"use client";
import React from 'react'

export interface ChipProps {
    text: string;
    onClick: () => void;
    isSelected: boolean;
}
const Chip = ({text, onClick, isSelected}:ChipProps) => {
  return (
      <button onClick={onClick} className={`${isSelected?'bg-brandgreen':'bg-brandgreenlight'} p-2 px-4 transition-all rounded-full mx-2`}>
          <p className={`${isSelected ? 'text-white' : 'text-brandgreen'} text-sm font-semibold  `}>{text}</p>
    </button>
  )
}

export default Chip