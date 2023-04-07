import React from 'react'
import '../css/bootstrap.min.css'
import '../css/main.css'
import Aboutpart1 from './aboutpart1'
import TeamMember from './teamMember'

function About() {

  return (
    <>
     <div class="container-fluid bg-dark p-5">
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="display-4 ">About Us</h1>
                <a href=""  className='text-secondary'>Home</a>
                <i class="far fa-square text-secondary  px-2"></i>
                <a href="" className='text-secondary'>About</a>
            </div>
        </div>
    </div>
     <Aboutpart1/>
      <TeamMember/>
   
    
    
    </>
  )
}

export default About