import React from 'react'
import classes from "./ErrorPage.module.css"

export default function ErrorPage() { 
        return (
            <div className={classes.text}>
                <h1>Error</h1>
                <p>Please check that you have scanned the correct QR code and have an active internet connection</p>
                <h3>Thank you</h3>
            </div>
        )
    }