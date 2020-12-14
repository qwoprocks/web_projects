import styled from "styled-components"
import React from "react"
import { GitHub, Mail } from "@material-ui/icons"
import { Link } from "@material-ui/core"

const Container = styled.footer`
    width: 100%;
    padding: 20px 0;
    margin-top: 30px;
    background-color: #23232a;
    border-top: 3px dashed #929590;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
`

const Footer = () => {
    return (
        <Container>
            <Link href="https://github.com/qwoprocks/web_projects" target="_blank">
                <GitHub />
            </Link>
            <Link href="mailto:qwoprocks@gmail.com">
                <Mail />
            </Link>
        </Container>
    )
}

export default Footer
