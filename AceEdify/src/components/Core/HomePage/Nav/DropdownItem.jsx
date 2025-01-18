import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../services/operations/authApi';

const DropdownItem = ({title}) => {
  return (
      <div className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-mango-green hover:font-bold transition-colors rounded-md">
          {title}
      </div>
  )
}

export default DropdownItem