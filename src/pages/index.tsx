import React, { useEffect } from "react"
import GlobalStyle from "src/globalStyle"
import Maze from "src/components/maze"
import Footer from "src/components/footer"
import Main from "src/components/main"
import Wrapper from "src/components/wrapper"

const Home = () => {
    useEffect(() => {
        document.title = "Web Projects"
    }, [])

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <Main>
                    <Maze />
                </Main>
                <Footer />
            </Wrapper>
        </>
    )
}

export default Home
