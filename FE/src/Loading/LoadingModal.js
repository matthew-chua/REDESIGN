// import LoadingModal from ""
// const [loading, setLoading] = useState(false); 
// setLoading(true);
// setLoading(false);


import React from 'react'
import classes from "./LoadingModal.module.css"

export default function LoadingModal(props) {
    return (
        <>
        {props.isLoading && 
        <>
        <div className={classes.pic}>
            <h1 className={classes.text}> </h1>
        </div>
            <div className={classes.overlay}> </div>
        </>
        }
        </>
        
    )
}