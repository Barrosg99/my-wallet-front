const { default: styled } = require("styled-components")

import StyledMain from "../../components/Container/StyledMain";

const SignInContainer = styled(StyledMain)`
    text-align: center;
    padding-top: 159px;
    
    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-weight: 400;
        font-size: 32px;
        color: white;
        margin-bottom: 24px;
    }

    a {
        display: block;
        color: white;
        font-size: 15px;
    }
`

export default SignInContainer;