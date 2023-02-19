import React from 'react'
import { useSelector } from 'react-redux'
import { removeuser } from '../store/slices/userSlice'
import {useDispatch} from 'react-redux'
import { adduser } from '../store/slices/userSlice'
import { deleteAlluser } from '../store/action/index'
import { allemail } from '../api/emaildata'
import '../css/bootstrap.min.css'
import '../css/main.css'
function Service() {
    const dispatch = useDispatch()
    const data = useSelector((state)=>{
        return state.users
    })
console.log(data)
const remove = (id)=>{
  dispatch(removeuser(id))
 console.log(removeuser(id))

 }
 const addUser = (email)=>{
    dispatch(adduser(email))
   
  }
  const deleteData=()=>{
  dispatch(deleteAlluser())
}
  return (
    <>
    
    <button class="btn btn-primary w-100 py-3 mt-4" type="submit" onClick={()=> addUser(allemail())}>
                 Add email 
                  </button>       
                  <div class="container-fluid py-6 px-5">
        <div class="text-center mx-auto mb-5" style={{maxWidth: '600px'}}>
            <h1 class="display-5 mb-0">What We Offer</h1>
            <hr class="w-25 mx-auto bg-primary"/>
        </div>
        <div class="row g-5"> 
               
    {data.map((userss , id)=>{

   return  <div class="col-lg-4 col-md-6"  key={id}>
   <div class="service-item bg-secondary text-center px-5" >
   <div class="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-4" style={{width: '90px', height: '90px'}}>
       <i class="fa fa-user-tie fa-2x"></i>
   </div>
   
    <h3 class="mb-3" >{userss}</h3>
                    <button class="btn btn-primary w-100 py-3 mt-4" type="submit" onClick={() => remove(id)}>
                  delete</button>
              
           
    </div>
                
    </div>
           

})}
       </div>
    </div>
    
 <button class="btn w-100 py-3 mt-4" type="submit" onClick={()=> deleteData()}>
                  All remove
                  </button>
    </>
  )
}

export default Service