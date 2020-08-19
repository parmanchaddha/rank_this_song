import Button from '@material-ui/core/Button';
import React from "react";

export function randomize(songs_list){  //randomize function
    var item = [];
    var no_duplicates = [...new Set(songs_list)]
    for (var i=0; i<8; i++){
      item.push(no_duplicates[Math.floor(Math.random() * no_duplicates.length)]);
      var index = no_duplicates.indexOf(item[i]);
      no_duplicates.splice(index,1);      
    }
    
    return item;
}


export function Button_Top(props){  //both coloured buttons
    return(
           <div> <Button variant="contained" color="primary" onClick={props.onClick}>{props.selection}</Button> </div>
    )
}
export function Button_Bottom(props){
    return(
           <div> <Button variant="contained" color="secondary" onClick={props.onClick}>{props.selection}</Button> </div>
    )
}




