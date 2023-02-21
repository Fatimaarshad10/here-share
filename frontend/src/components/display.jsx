import React from 'react'
import { useSelector } from 'react-redux'
import { removeuser } from '../store/slices/userSlice'
import {useDispatch} from 'react-redux'

function Display() {
  const dispatch = useDispatch()
    const data = useSelector((state)=>{
        return state.users
    })
const remove = (id)=>{
  dispatch(removeuser(id))
 console.log(removeuser(id))

 }
  return (

    <>
    {data.map((user , id)=>{
      return <div key={id}>
        <h1>{user}</h1>
        <button class="btn btn-primary w-100 py-3 mt-4" type="submit" onClick={() => remove(id)}>
                  delete</button>
      </div>
    })}

    </>
  )
}

export default Display