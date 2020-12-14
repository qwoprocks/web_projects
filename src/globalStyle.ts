import { createGlobalStyle } from 'styled-components'
import Fonts from "src/fonts/fonts"

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "PTSans";
        font-weight: normal;
        font-style: normal;
        src: local("PTSans"), url(${Fonts.PTSansRegularTTF}) format("truetype");
    }

    html {
        height: 100%;
        text-rendering: optimizeLegibility;
    }

    #gatsby-focus-wrapper, #___gatsby {
        height: 100%;
        width: 100%;
    }

    body {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        background-color: #303134;
        font-family: "PTSans";
    }
`

export default GlobalStyle
