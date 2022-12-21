import React from "react";
// import { useEffect,useState } from "react";
import {Edit,Delete} from "./action"
const To_do_list=({list,dispatch})=>{

    const all_todos=[]

    for(let i=0;i<list.length;i++){
        all_todos.unshift(list[i]);
    }
    return(
        <div className="all-cards">
            {all_todos.map((todo,i)=>{
                return(
                    <section className="card" key={`${todo.to_do}-${i}`}>
                        <div className="notes">{todo.to_do}</div>
                        <div className="btn-art">
                            <button className="list-btn" onClick={()=>{dispatch({type:Edit,payload:todo})}}>Edit</button>
                            <button className="list-btn" onClick={()=>{dispatch({type:Delete,payload:todo})}}>Delete</button>
                        </div>
                    </section>
                )
            })}
        </div>
    )
}
export default To_do_list