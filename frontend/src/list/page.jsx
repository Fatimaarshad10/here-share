import React ,{useState}from 'react'
import Articles from './list'
import '../css/bootstrap.min.css'
import '../css/main.css'
function Page({data}) {
    const [votes, setVotes] = useState(data)
    const  sortData  = ()=>{
        const sortedData = [...votes].sort((a, b) => b.upvotes - a.upvotes);
       setVotes(sortedData); 
    }
    const sortDate = () => {
        const sortedData = [...votes].sort((a, b) => new Date(b.date) - new Date(a.date));
        setVotes(sortedData);
      };
  return (
    <>
     <div >
            <div className="layout-row align-items-center justify-content-center my-20 navigation">
                <button className='btn btn-primary w-20 py-1 mt-4  'onClick={sortData} >Most Upvoted</button>
                <button className='btn btn-primary w-20 py-1 mt-4'  onClick={sortDate} >Most Recent</button>
            </div>
    <Articles data={votes}/>

        </div>
    </>
  )
}

export default Page