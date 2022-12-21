import React,{useEffect, useReducer,useRef,useState} from "react";
import To_do_list from "./To-do-list";
import {Add,Edit,Delete} from "./action";
import axios from "axios";
const To_do=()=>{
    const [todo,setTODO]=useState({value:""});
    const [id,setId]= useState('');
    const [isAdd,setAdd]=useState(true);
    const [data,setData]= useState([]);
    let inputref=useRef();
    const  updateHandler= (id,val)=>{
        axios.put(`http://localhost:3001/change/${id}`,{to_do:val});
        console.log(id,val);
    }
    const reducer= (state,action)=>{
        switch(action.type){
            case Add:
                const updatedState=[...state,{value:todo.value,order:state.length+1}];
                const new_todo= {
                    to_do:todo.value,
                    order:state.order
                }
                axios.post("http://localhost:3001/create",new_todo)
                axios.get("http://localhost:3001/todos").then((data)=>setData(data)).catch((err)=>console.log(err));
                setTODO({value:""});
                return updatedState;
            case Edit:
                let statecopy=[...state];
                if(isAdd){
                    setAdd(false);
                    setTODO({value:action.payload.to_do})
                    setId(action.payload._id);
                    
                }else{
                    // statecopy.forEach((st)=>{
                    //     if(st.order === todo.order){
                    //         st.value = todo.value;
                    //     }
                    // })
                    // let edited={to_do:todo.value}
                    // console.log(edited)
                   
                    updateHandler(id,todo.value)
                    axios.get("http://localhost:3001/todos").then((data)=>setData(data)).catch((err)=>console.log(err));
                    setAdd(true);
                    setTODO({value:"",order:""});
                }
                return statecopy;
            case Delete:
                let newState = state.filter((st)=>{
                    return st.order !== action.payload.order
                })
                axios.delete(`http://localhost:3001/change/${action.payload._id}`)
                axios.get("http://localhost:3001/todos").then((data)=>setData(data)).catch((err)=>console.log(err));
                return newState
            default:
                return state;
        }
    }
    const [state,dispatch]=useReducer(reducer,[]);
    const handleDispatch= ()=>{
        if(isAdd){
        if(todo.value!=""){
         dispatch({type:Add})
        }
        }
        else{
            if(todo.value!="")
           {
            dispatch({type:Edit})}
        }
    }
    useEffect(()=>{
        fetch("http://localhost:3001/todos").then((res)=>res.json()).then((data)=>setData(data))
    },[state])
    return(
        <div className="container">
           <h1>To Do List</h1>
           <div className="input-div">
            <textarea id="task" rows={3} cols={40} onChange={(event)=>{setTODO({...todo,value:event.target.value})}} value={todo.value}></textarea>
            <button id="btn"  ref={inputref} onClick={()=>{handleDispatch()}}>{isAdd?"Save":"Edit & Save"}</button>        
           </div>
            <To_do_list list={data} dispatch={dispatch}/>
        </div>
    )
}
export default To_do;