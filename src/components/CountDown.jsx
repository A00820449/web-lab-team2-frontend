import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useState, useEffect, useCallback } from "react";

/**
 * @param {{time: number, callback: Function}} param0 
 */
export default function CountDown({time, callback}) {
    const [timeLeft, setTimeLeft] = useState(time)
    const memCallback = useCallback(() => {console.log("goodbye"); callback()}, [callback])

    useEffect(() => {
        const timer = setTimeout(()=>{
            setTimeLeft(Math.max(time - Date.now(), 0))
        }, 1000)
        return () => clearTimeout(timer)
    }, [time, timeLeft])

    useEffect(()=>{
        if (timeLeft <= 0) {
            memCallback()
        }
    },[timeLeft, memCallback])

    const msleft = Math.max(timeLeft, 0)

    let sleft = Math.trunc(msleft/1000)

    const hours = Math.floor(sleft / 3600)
    const shours = pad(hours)
    sleft %= 3600

    const mins = Math.floor(sleft / 60)
    const smins = pad(mins)
    sleft %= 60

    const secs = sleft
    const ssecs = pad(secs)

    return (
        <Box>
            <Typography variant="h2">
                {`${shours}:${smins}:${ssecs}`}
            </Typography>
        </Box>
    )
}

/**
 * @param {number} num 
 * @returns 
 */
function pad(num) {
    const str = num.toString()
    if (str.length < 2) {
        return `0${str}`
    }
    return str
}