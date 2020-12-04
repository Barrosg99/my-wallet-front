import styled from 'styled-components';

const SignUpContainter = styled.div `
    text-align: center;
    padding-top: 95px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-weight: 400;
        font-size: 32px;
        color: white;
        margin-bottom: 28px;
    }

    input {
        margin-bottom: 13px;
        font-size: 20px;
        display: block;
        padding: 17px 5px 17px 10px;
        outline: none;
        border-radius: 5px;
        border: none;
        font-family: inherit;
        width: 86vw;
    }

    input::placeholder {
        color: black;
    }

    button {
        width: 86vw;
        padding: 11px 0px;
        font-size: 20px;
        font-family: inherit;
        background: #A328D6;
        color: white;
        border: none;
        border-radius: 5px;
        margin-bottom: 32px;
        outline: none;
        font-weight: bold;
    }

    a {
        display: block;
        color: white;
        font-size: 15px;
    }
`

export default SignUpContainter;