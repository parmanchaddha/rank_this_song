import React from "react";
import { render } from "@testing-library/react";
import "./SubmitCancelBar.css";
import Button from '@material-ui/core/Button';



//style = {this.changespaceandsize()} 
export const songfunc = (song_list) =>{
    var number = 16  
    var item = []
    randomize(song_list,item,number);
    let pert = []
    let bre = []
    let cor = []
    let jew = []
    var seekboi = []
    crayon(number,pert,"song",item,nextround2)
    crayon(number/2,bre,"ff","",nextround2)
    crayon(number/4,cor,"gg","",nextround2)
    jew.push(<div><Button id="tt" key={0} name={0} onClick={final}></Button><div></div>
            <Button id="tt" key={1} name={1} onClick={final}></Button></div>
        )
    function final(e){
        let bam = e.currentTarget.innerHTML
        let bra = document.querySelector("#chacha")
        bra.innerHTML = "The winner of this app designed soly by Nate the Great is " + bam
    }
    seekboi.push(<div><h5 id="chacha"></h5></div>)
    
    return (
        <div>
        <div class="container"> {pert} </div>
        <div class="container2"> {bre} </div>
        <div class="container3">{cor}</div>
        <div class="container4">{jew}</div>
        <div class="container5">{seekboi}</div>
        </div>
        );    
}


/* export const round2 = (song_list) => {
    var number = 
} */
const randomize = (song_list,item,number) => {
    for(var i=0; i<number; i++){
        item.push(song_list[Math.floor(Math.random() * song_list.length)]);
        var index = song_list.indexOf(item);
        song_list.splice(index,1);
    }
} 

function crayon(number,list,id_name,item,click){    
    for (var i=0; i<number; i++){
        if (i % 2 == 0){
            list.push(<div><Button id={id_name} key={i} name={i} value={item[i]} onClick={click}>{item[i]}</Button></div>)
        }
        else {
            list.push(<div><Button variant="contained" name={i} color="primary" value={item[i]} id={id_name} onClick={click} key={i}>{item[i]}</Button></div> )
            list.push(<p></p>)
        }
    }
}



function nextround2(e){
    var seed = e.currentTarget.name;
    var song_name = e.currentTarget.innerHTML
    if (e.currentTarget.id == "song"){
        let next_button = document.querySelectorAll("#ff")
        ble(seed,song_name,next_button)
    }
    else if(e.currentTarget.id == "ff"){
        let next_button = document.querySelectorAll("#gg")
        ble(seed,song_name,next_button)
    }
    else if (e.currentTarget.id == "gg"){
        let next_button = document.querySelectorAll("#tt")
        ble(seed,song_name,next_button)
    }


}




function ble(seed,song_name,next_button){
    if (seed<2){
        next_button[0].innerHTML = song_name
    }
    if (seed<4 && seed>1){
        next_button[1].innerHTML = song_name
    }
    if (seed<6 && seed>3){
        next_button[2].innerHTML = song_name
    }
    if (seed<8 && seed>5){
        next_button[3].innerHTML = song_name
    }
    if (seed<10 && seed>7){
        next_button[4].innerHTML = song_name
    }
    if (seed<12 && seed>9){
        next_button[5].innerHTML = song_name
    }
    if (seed<14 && seed>11){
        next_button[6].innerHTML = song_name
    }
    if (seed<16 && seed>13){
        next_button[7].innerHTML = song_name
    }
}