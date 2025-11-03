// useRef - Store mutable values that persist between renders without causing re-renders, and access DOM elements directly.

/**
 * Why useRef:
 * 
 * By default functions in javascript stores in heap memory because functions are non primitive
 * 
 * If there is a variable that need to be addressed with the same memory even the component renders then 
 * we use the useRef.
 * 
 * for example:
 * const user = {name: "Seshu", age: 21}
 * on every render this will be updated to the another heap memory but to point the same intial render
 * memory for entire lifecycle of the component use useRef as name said use the reference
 * 
 * 
 * const user = useRef(user);
 * 
 * By default the useRef will have the intial value if we use the ref attribut in the html of the component
 * then useRef will update to this element and object of this element.
 * 
 */

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