import React  , {useReducer}from 'react'

function Extra() {
    const Reducer = (state , action)=>{
        switch (action.type) {
            case "INCREMENT":
                return {count : state.count + 1 , text: state.text}
            case "TEXT":
                return {count : state.count , text: !state.text}
            default:
                return state 
        }
    }

    function outerFunction() {
        let outerVariable = 'Hello';
      
        function innerFunction() {
          console.log(outerVariable + ' World!');
        }
      
        return innerFunction;
      }
      let inner = outerFunction(); // inner now refers to innerFunction
      inner(); // prints "Hello World!"
      
    const [state, dispatch] = useReducer(Reducer , {count : 0 , text : true } )
    let num = 4
    let num2 = num 
    console.log(num)
    console.log(num2)
  return (
   <>
   <h1>{state.count}</h1>
   <button onClick={()=> {
    dispatch({type : "INCREMENT"})
    dispatch({type : "TEXT"})

   }}>click me </button>
    {state.text ? (<> 
   <h2>This is for the text </h2>

    </>):(<></>)}
   </>
  )
}

export default Extra
