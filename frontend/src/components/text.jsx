import React  from 'react'
import { allemail } from '../api/emaildata'
import {useDispatch} from 'react-redux'
import { adduser } from '../store/slices/userSlice'
import { deleteAlluser } from '../store/slices/userSlice'
import Display from './display'
function Text() {
  const dispatch = useDispatch()
  const addUser = (email)=>{
    dispatch(adduser(email))
   
  }
  const deleteData=()=>{
  dispatch(deleteAlluser())
}
  return (
    <>
    
    <button class="btn btn-primary w-100 py-3 mt-4" type="submit" onClick={()=> addUser(allemail())}>
                   email
                  </button>
                  <Display/>
                  <button class="btn w-100 py-3 mt-4" type="submit" onClick={()=> deleteData()}>
                  All remove
                  </button>
                 

                 
    </>
  )
}

export default Text