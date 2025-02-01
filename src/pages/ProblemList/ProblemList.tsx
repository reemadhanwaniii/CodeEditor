import React from "react";
import Sample from "./Sample";

function ProblemList() {
    let value = "something bigger";
    return(
        <>
            Problem List
            <br/>
            <button onClick={() => {
                console.log("Clicking ",value);
                value= "Something greater" + Math.random();
                console.log("Clicked", value);
                }}>Click</button>
            <br/>
            <Sample text={value}/>
        </>
    );
}

export default ProblemList;