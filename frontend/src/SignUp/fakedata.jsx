import React from 'react'
function Fake() {
    const data = ()=>{
        
      fetch('http://localhost:4000/user/success')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
    
    }
  
    
  return (
    <>
    <button onClick={data}>Get the data </button>
    </>
  )
}

export default Fake