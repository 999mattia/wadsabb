import React from "react";
import styles from "../styles/header.module.css"

export default function Header(){
    return(
        <div>
            <div className={styles.headerContainer}>
                <img className={styles.logo} src="/Logo.png" ></img>
            </div>
        </div>
    )
}