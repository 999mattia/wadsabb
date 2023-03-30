import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Secret(){
    const router = useRouter();
    const message = router.query["secret"];

    useEffect(() => {
        if (!message) return
        
        localStorage.setItem("SecretMessage", message != 'clear' ? message : '')
    
        router.push("/") 
    }, [message])

    return(
        <>
            <h1>Zevin Lehnder</h1>
        </>
    )
}