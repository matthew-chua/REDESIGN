// import LoadingModal from ""
// const [loading, setLoading] = useState(false); 
// setLoading(true);
// setLoading(false);


import React from 'react'
import classes from "./LoadingModal.module.css"

export default function LoadingModal(props) {
// to test loading page only: 
// export default function LoadingModal() { 
    return (
        <>
        {props.isLoading && 
        <>
        <h3 className={classes.text}> </h3>
        <div className={classes.overlay}> </div>
        </>
        }
        </>
        
    )
}