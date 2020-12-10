import { Button } from "@material-ui/core"
import { Pause, PlayArrow, Refresh } from "@material-ui/icons"
import React, { MouseEvent, MutableRefObject, useState, useEffect, useRef } from "react"
import styled from "styled-components"

const LINE_WIDTH = 1
const LINE_COLOR = "#333333"
const MAZE_WIDTH = 500
const MAZE_HEIGHT = 500
const CELL_SIZE = 20
const NUM_ROWS = MAZE_HEIGHT / CELL_SIZE
const NUM_COLS = MAZE_WIDTH / CELL_SIZE
const FRAME_DELAY_MS = 100

const CentralizedDiv = styled.div`
    padding: 0;
    margin: 0 auto;
    width: ${MAZE_WIDTH}px;
`

const StyledCanvas = styled.canvas`
    border: 1px solid black;
`

const Maze = () => {
    const animationRef = useRef() as MutableRefObject<number>
    const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>
    const canvasContextRef = useRef() as MutableRefObject<CanvasRenderingContext2D>
    const mazeGridRef = useRef(Array.from(Array(NUM_COLS), () => new Array(NUM_ROWS)))

    const [isPlaying, setIsPlaying] = useState(false)
    
    useEffect(() => {
        canvasContextRef.current = canvasRef.current.getContext("2d")!
        clearCanvas()
        drawGrid()
        drawGrid() // we call drawGrid twice to get the correct color (due to pixel placement, color is lighter than expected with only one call)
    }, [])

    useEffect(() => {
        if (!isPlaying) {
            cancelAnimationFrame(animationRef.current)
        } else {
            let prev = (new Date()).getTime()
            const animate = () => {
                let now = (new Date()).getTime()
                if (now - prev > FRAME_DELAY_MS) {
                    updateMaze()
                    prev = now
                }
                animationRef.current = requestAnimationFrame(animate)
            }
            animate()
        }
    }, [isPlaying])

    const updateMaze = () => {
        let bufferGrid = Array.from(Array(NUM_COLS), () => new Array(NUM_ROWS))
        let mazeGrid = mazeGridRef.current;
        for (let i = 0; i < NUM_COLS; i++) {
            for (let j = 0; j < NUM_ROWS; j++) {
                let neighbours = [
                    isInMaze(i - 1, j - 1) ? mazeGrid[i - 1][j - 1] : false,
                    isInMaze(i, j - 1) ? mazeGrid[i][j - 1] : false,
                    isInMaze(i + 1, j - 1) ? mazeGrid[i + 1][j - 1] : false,
                    isInMaze(i - 1, j) ? mazeGrid[i - 1][j] : false,
                    isInMaze(i + 1, j) ? mazeGrid[i + 1][j] : false,
                    isInMaze(i - 1, j + 1) ? mazeGrid[i - 1][j + 1] : false,
                    isInMaze(i, j + 1) ? mazeGrid[i][j + 1] : false,
                    isInMaze(i + 1, j + 1) ? mazeGrid[i + 1][j + 1] : false
                ]
                let count = 0
                for (const neighbour of neighbours) {
                    if (neighbour) {
                        count++
                    }
                }
                if ((mazeGrid[i][j] && count < 2) || (mazeGrid[i][j] && count > 3) || (!mazeGrid[i][j] && count == 3)) {
                    bufferGrid[i][j] = !mazeGrid[i][j]
                    drawCellAt(i, j, bufferGrid)
                } else {
                    bufferGrid[i][j] = mazeGrid[i][j]
                }
            }
        }
        mazeGridRef.current = bufferGrid
    }

    const isInMaze = (i: number, j: number) => {
        if (i < 0 || i >= NUM_COLS || j < 0 || j >= NUM_ROWS) {
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
        canvasContext.strokeStyle = LINE_COLOR
        canvasContext.stroke()
    }

    const drawCellAt = (i: number, j: number, grid: boolean[][]) => {
        const canvasContext = canvasContextRef.current
        if (!isInMaze(i, j) || canvasContext === undefined) {
            return
        }
        canvasContext.fillStyle = grid[i][j] ? "#000000" : "#FFFFFF"
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
        mazeGridRef.current[i][j] = !mazeGridRef.current[i][j]
        drawCellAt(i, j, mazeGridRef.current)
    }
    
    const handleResetClick = () => {
        setIsPlaying(false);
        for (let i = 0; i < NUM_COLS; i++) {
            for (let j = 0; j < NUM_ROWS; j++) {
                mazeGridRef.current[i][j] = false
            }
        }
        clearCanvas()
        drawGrid()
    }

    const handlePlayPauseClick = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <CentralizedDiv>
            <StyledCanvas width={MAZE_WIDTH} height={MAZE_HEIGHT} ref={canvasRef} onClick={handleCellClick} />
            <div>
                <Button variant="contained" color="secondary" onClick={handleResetClick}>
                    <Refresh />
                    <span>Reset</span>
                </Button>
                <Button variant="contained" color="primary" onClick={handlePlayPauseClick}>
                    {isPlaying ? <Pause /> : <PlayArrow />} 
                    <span>{isPlaying ? "Pause" : "Play"}</span>
                </Button>
            </div>
        </CentralizedDiv>
    )
}

export default Maze
