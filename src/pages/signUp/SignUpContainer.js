import styled from 'styled-components';
import StyledMain from '../../components/Container/StyledMain';



const SignUpContainter = styled(StyledMain) `
    text-align: center;
    padding-top: 95px;

    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-weight: 400;
        font-size: 32px;
        color: white;
        margin-bottom: 28px;
    }

    a {
        display: block;
        color: white;
        font-size: 15px;
    }
`

export default SignUpContainter;