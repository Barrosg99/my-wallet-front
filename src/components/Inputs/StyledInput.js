const { default: styled } = require("styled-components");

const StyledInput = styled.input `
    margin-bottom: 13px;
    font-size: 20px;
    display: block;
    padding: 17px 5px 17px 10px;
    outline: none;
    border-radius: 5px;
    border: none;
    font-family: inherit;
    width: 86vw;
    &::placeholder {
        color: black;
    }
`

export default StyledInput;