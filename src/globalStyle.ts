import { createGlobalStyle } from 'styled-components'
import Fonts from "src/fonts/fonts"

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "PTSans";
        font-weight: normal;
        font-style: normal;
        src: local("PTSans"), url(${Fonts.PTSansRegularTTF}) format("truetype");
    }

    body {
        font-family: "PTSans";
        text-rendering: optimizeLegibility;
    }
`

export default GlobalStyle
