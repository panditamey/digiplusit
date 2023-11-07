import React, { useState } from 'react'

interface InputModalProps {
  visible: boolean;
  onClose: any;
}

function InputModal({ visible, onClose }: InputModalProps) {
  var [isModalOpen, setIsModalOpen] = useState(true);
  // if (!visible) return null

  const handleClose = () => {
    onClose();
  }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center'>
      <div className='bg-white p-2 rounded h-80 w-80 bg-center self-center flex flex-col text-center items-center '>
        
        <button onClick={handleClose}>Close</button>
      </div>
    
    </div>
  )
}

export default InputModal