import React, { useState } from 'react'
import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import ConfirmmationModal from '../../../Dashboard/ConfirmmationModal';
import { useNavigate } from 'react-router-dom';
 import { deleteAccount } from '../../../services/operations/settingsApi';

const DeleteAccount = () => {
  const [confirmationmodal , setConfirmMationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  return (
    <>
          <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12 w-[90%] opacity-80">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-bold text-white">
            Delete Account
          </h2>
          <div className="w-3/5 text-pink-25 ">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300"
            onClick={() => {
                setConfirmMationModal({
                     text1:'Are you sure ?', 
                     text2:'your Account Will be Permenantly Deleted' , 
                     btn1Text:'Delete' , 
                     btn2Text:'Cancel'  , 
                     btn1Handler:()=>dispatch(deleteAccount(user , navigate))  , 
                     btn2Handler:()=>setConfirmMationModal(null)
                })
            }}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
      {confirmationmodal && <ConfirmmationModal modalData={confirmationmodal}/>}
    </>
  )
}

export default DeleteAccount