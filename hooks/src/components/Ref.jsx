// useRef - Store mutable values that persist between renders without causing re-renders, and access DOM elements directly.

/**
 * Key Concepts:
 * Returns an object with a current property that you can mutate
 * Doesn't trigger re-renders when the value changes
 * Persists values across component re-renders
 * Primary use cases: DOM manipulation and storing previous values
 */

/**
 * Best Practises:
 * Avoid over-reliance on refs; use them as an escape hatch for DOM access
 * Don't access or mutate refs during render
 * Follow all rules of hooks (call at top level only)
 */

import { useEffect, useRef, useState } from "react";

const Ref = () => {
    const [count, setCount] = useState(0);

    const myRef = useRef(null);
    const counterRef = useRef();
    const videoRef = useRef(null);

    useEffect(() => {myRef.current.focus()}, []);

    useEffect(() => {
        counterRef.current = count;
    }, [count])

    useEffect(() => {
        videoRef.current.play()
        console.log(videoRef)
    }, [])

    const playVideo = () => {
        if(videoRef.current) {
            videoRef.current.play();
        }
    }

    const pauseVideo = () => {
        if(videoRef.current) {
            videoRef.current.pause();
        }
    }
    

    return( 
        <div className="ref-container">
            <input type="text" ref={myRef} />
            <p>Current: {count}</p>
            <p>Previous Current: {counterRef.current}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>

            <video 
                ref={videoRef}
                width="480"
                muted
                controls={true} 
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4" 
                loop={false}
            />
            <button onClick={playVideo}>Play</button>
            <button onClick={pauseVideo}>Pause</button>
        </div>
    )
}

export default Ref;