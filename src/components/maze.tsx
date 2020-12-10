import React, { MouseEvent, MutableRefObject, useState, useEffect, useRef } from "react"
import styled from "styled-components"

const MAZE_WIDTH = 500
const MAZE_HEIGHT = 500
const CELL_SIZE = 20
const NUM_ROWS = MAZE_HEIGHT / CELL_SIZE
const NUM_COLS = MAZE_WIDTH / CELL_SIZE
const MAZE_GRID: boolean[][] = Array.from(Array(NUM_COLS), () => new Array(NUM_ROWS))
const LINE_WIDTH = 2

const StyledCanvas = styled.canvas`
    padding: 0;
    margin: 0 auto;
    display: block;
    border: 1px solid black;
`

const Maze = () => {
    const animationRef = useRef() as MutableRefObject<number>
    const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>
    const canvasContextRef = useRef() as MutableRefObject<CanvasRenderingContext2D>

    const [isPlaying, setIsPlaying] = useState(false)
    
    useEffect(() => {
        canvasContextRef.current = canvasRef.current.getContext("2d")!
        drawGrid()
    }, [])

    useEffect(() => {
        if (!isPlaying) {
            cancelAnimationFrame(animationRef.current)
        } else {
            let count = 0
            const animate = () => {
                if (++count > 20) {
                    for (let i = 0; i < NUM_COLS; i++) {
                        for (let j = 0; j < NUM_ROWS - 1; j++) {
                            if (MAZE_GRID[i][j] && !MAZE_GRID[i][j + 1]) {
                                toggleCell(i, j)
                            } else if (!MAZE_GRID[i][j] && MAZE_GRID[i][j + 1]) {
                                toggleCell(i, j)
                            }
                        }
                    }
                    count = 0
                }
                animationRef.current = requestAnimationFrame(animate)
            }
            animate()
        }
    }, [isPlaying])

    const isInMaze = (i: number, j: number) => {
        if (i < 0 || i >= NUM_COLS || j < 0 || j >= NUM_ROWS) {
            console.warn(`Maze index (${i}, ${j}) out of bounds!`)
            return false
        } else {
            return true
        }
    }

    const clearCanvas = () => {
        const canvasContext = canvasContextRef.current
        canvasContext?.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height)
    }

    const drawGrid = () => {
        const canvasContext = canvasContextRef.current
        if (canvasContext === undefined) {
            return
        }
        canvasContext.lineWidth = LINE_WIDTH;
        // draw vertical lines
        for (let i = 0; i <= MAZE_WIDTH; i += CELL_SIZE) {
            canvasContext.moveTo(i, 0)
            canvasContext.lineTo(i, MAZE_HEIGHT)
        }
        // draw horizontal lines
        for (let i = 0; i <= MAZE_HEIGHT; i += CELL_SIZE) {
            canvasContext.moveTo(0, i)
            canvasContext.lineTo(MAZE_WIDTH, i)
        }
        canvasContext.strokeStyle = "black"
        canvasContext.stroke()
    }

    const toggleCell = (i: number, j: number) => {
        const canvasContext = canvasContextRef.current
        if (!isInMaze(i, j) || canvasContext === undefined) {
            return
        }
        MAZE_GRID[i][j] = !MAZE_GRID[i][j]
        canvasContext.fillStyle = MAZE_GRID[i][j] ? "#000000" : "#FFFFFF"
        canvasContext.fillRect(i * CELL_SIZE + LINE_WIDTH / 2 + 0.5, j * CELL_SIZE + LINE_WIDTH / 2 + 0.5, CELL_SIZE - LINE_WIDTH - 1, CELL_SIZE - LINE_WIDTH - 1)
    }

    const handleCellClick = (event: MouseEvent) => {
        if (isPlaying) {
            return
        }
        const x = event.clientX - canvasRef.current.getBoundingClientRect()!.left
        const y = event.clientY - canvasRef.current.getBoundingClientRect()!.top
        const i = Math.trunc(x / CELL_SIZE)
        const j = Math.trunc(y / CELL_SIZE)
        toggleCell(i, j)
    }
    
    const handleResetClick = () => {
        setIsPlaying(false);
        for (let i = 0; i < NUM_COLS; i++) {
            for (let j = 0; j < NUM_ROWS; j++) {
                MAZE_GRID[i][j] = false
            }
        }
        clearCanvas()
        drawGrid()
    }

    const handlePlayPauseClick = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <>
            <StyledCanvas width={MAZE_WIDTH} height={MAZE_HEIGHT} ref={canvasRef} onClick={handleCellClick} />
            <div>
                <input type="button" value="Reset" onClick={handleResetClick} />
                <input type="button" value={isPlaying ? "Pause" : "Play"} onClick={handlePlayPauseClick} />
            </div>
        </>
    )
}

export default Maze
