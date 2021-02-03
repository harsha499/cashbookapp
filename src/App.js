import React, { useState, useEffect,useCallback } from 'react';
import Moment from 'react-moment';
import './App.css';

function App() {

let [Localstate,updaterLocalstate]=useState({
  val:0,
  message:""
})

  let [firststate,updaterstate]=useState({
    cashbook:[
    ],
    totalvalue:0,
    toggleIn:false,
    toggleOut:false
  })
  let textChange=(property,event)=>{

      updaterLocalstate({
        val: property=="val"?event.target.value:Localstate.val,
        message:property=="message"?event.target.value:Localstate.message
      })
  }

  let ToggleClickIn=(val)=>{
    console.log(3)
      updaterstate({
        cashbook:firststate.cashbook,
        totalvalue:firststate.totalvalue,
        toggleIn:!firststate.toggleIn,
        toggleOut:false
      })
    
  }

  let EntryIn=()=>{
    let Obj={message:Localstate.message,time:new Date().toUTCString(),InVal:Localstate.val,OutVal:0,type:"IN"};
    let newState = JSON.parse(JSON.stringify(firststate)); 
    newState.toggleIn=false;
    newState.cashbook.push(Obj)
    
    updaterstate({...newState})
    updaterLocalstate({
      val: 0,
      message:""
    })
    gettotalvalue(newState)
  }
  let EntryOut=()=>{
    console.log(5)
    let Obj={message:Localstate.message,time:Date(),InVal:0,OutVal:Localstate.val,type:"OUT"};
    
    let newState = JSON.parse(JSON.stringify(firststate)); 
    newState.toggleOut=false;
    newState.cashbook.push(Obj)
    updaterstate(newState)
   
    updaterLocalstate({
      val: 0,
      message:""
    })
    gettotalvalue({...newState})
  }
  let ToggleClickout=(val)=>{
  console.log(1)
    updaterstate({
      cashbook:firststate.cashbook,
      totalvalue:firststate.totalvalue,
      toggleIn:false,
      toggleOut:!firststate.toggleOut
    })
  }


  let gettotalvalue=(newstate)=>{
    if(newstate.cashbook.length>0)
    {
      let totalvalue= newstate.cashbook.reduce((x,y)=>{
        if(y.type=="IN")
        {
          return x+=+y.InVal
        }
        else

        return x-=+y.OutVal
      },0);
      newstate.totalvalue=totalvalue
      updaterstate({...newstate})
    }
  }

  return (
    <React.Fragment>
      <div className="topDiv">
      <div className="MainDiv">
      <div className="cashbookdiv">My Cashbook</div>
      <div className="balancetoday">
        <span className="green">{firststate.totalvalue.toFixed(1) } &#8377; </span>
        <span className="grey">Todays Balance</span>
      </div>
    </div>
    <div className="data">
      {
        firststate.cashbook.length==0?<span ><p className="noentry" > No ENTRY Found!</p></span>:
        <div>
        <table>
          <tbody>
        {   firststate.cashbook.map((x,y)=>{
            return  <tr className="" key={x.time}> 
              <td className="message"><span>{x.time}</span><br/><span>{x.message}</span> </td>
              <td className="out"><span>Out</span><br/><span>{x.OutVal==0?"-" :x.OutVal }&#8377; </span>
              </td>
              <td className="in"><span>In</span><br/><span>{x.InVal==0?"-":x.InVal} &#8377;</span></td>
               </tr>
        })
      }
      </tbody>
        </table>
        </div>
      }
     
    </div>
    <div>
      <button  id="green" onClick={()=>ToggleClickIn()} >Check-in</button>
      <button id="red" disabled={firststate.totalvalue<0} onClick={()=>ToggleClickout()} >Widraw</button>
    </div>
    {
      firststate.toggleIn?
      <div className="model">
      <div className='model-content'>
      <span>
        <button className="close-btn" onClick={()=>ToggleClickIn(false)}>Close</button>
      </span>
      <h2>New Entry</h2>
      <input type="number"  min="0" step=".1" onChange={(y)=>textChange("val",y)} placeholder="0.00 &#8377;"  value={Localstate.val} />
      <textarea rows="10"  onChange={(y)=>textChange("message",y)} column="10" placeholder="Enter Note" value={Localstate.message} />
      <button className="green-btn" disabled={Localstate.val<=0} onClick={()=>EntryIn()}>IN</button>
    </div></div>:null
    }
    {
      firststate.toggleOut?
      <div className="model">
    <div className='model-content'>
    <span>
      <button className="close-btn" onClick={()=>ToggleClickout(false)}>Close</button>
    </span>
    <h2>New Entry</h2>
    <input type="number" min="0" step=".1" onChange={(y)=>textChange("val",y)} placeholder="0.00 &#8377;" value={Localstate.val} />
    <textarea rows="10"  onChange={(y)=>textChange("message",y)} column="10" placeholder="Enter Note" value={Localstate.message} />
    <button disabled={  firststate.totalvalue<Localstate.val|| Localstate.val<=0} className="red-btn" onClick={()=>EntryOut()}>OUT</button>
  </div></div>:null
    }
    </div>
    </React.Fragment>
  );
}

export default App;
