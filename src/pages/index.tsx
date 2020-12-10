import React, { useEffect } from "react"
import GlobalStyle from "src/globalStyle"
import Maze from "src/components/maze"

const Home = () => {
    useEffect(() => {
        document.title = "Web Projects"
    }, [])

    return (
        <>
            <GlobalStyle />
            <Maze />
        </>
    )
}

export default Home
