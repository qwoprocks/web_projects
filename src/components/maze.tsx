import React, { MutableRefObject, useEffect, useRef } from "react"
import styled from "styled-components"

const Canvas = styled.canvas`
    padding: 0;
    margin: 0 auto;
    display: block;
    width: 500px;
    height: 500px;
    border: 1px solid black;
`

const Maze = () => {
    const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>
    
    useEffect(() => {
        const canvasContext: CanvasRenderingContext2D = canvasRef.current.getContext("2d")!;
        canvasContext.fillStyle = "#FF0000";
        canvasContext.fillRect(0, 0, 150, 75);
    }, [])

    return (
        <Canvas ref={canvasRef} />
    )
}

export default Maze
