const { default: styled } = require("styled-components");
const { default: StyledMain } = require("../../components/Container/StyledMain");

export const MyWalletContainer = styled(StyledMain)`
    header {
        display: flex;
        font-size: 26px;
        padding: 25px;
        justify-content: space-between;
        color: white;
        width: 100%;
    }

    ul {
        background: white;
        width: 86vw;
        height: 67vh;
        border-radius: 5px;
        padding: 23px 12px 27px;
        overflow: scroll;
    }

    & > div {
        display: flex;
        justify-content: space-between;
        width: 86%;
        font-size: 17px;
        color: white;
        padding: 13px 0px;
    }

    a {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #A328D6;
        padding: 10px;
        width: 45%;
        height: 17vh;
        border-radius: 5px;

        svg {
            font-size: 24px;
        }
    }
`

export const Li = styled.li ` 
    display:flex;
    justify-content: space-between;
    font-size: 16px;
    margin-bottom: 15px;
    
    div {
        display:flex
    }

    time {
        color: #939393;
        margin-right: 15px;

    }

    span {
        color: ${ props => props.type === 'income' ? '#03AC00': '#C70000'};
    }
`

export const Footer = styled.footer ` 
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 21.60%;

    width: 81%;
    background: white;
    height: 40px;
    align-items: center;
    p {
        color: ${ props => parseFloat(props.balance) > 0 ? '#03AC00' : '#C70000'}
    }    
`

const myWalletStyles = {
    MyWalletContainer,
    Li,
    Footer
};

export default myWalletStyles;