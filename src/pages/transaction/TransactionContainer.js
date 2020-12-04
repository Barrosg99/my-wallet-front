const { default: styled } = require("styled-components");
const { default: StyledMain } = require("../../components/Container/StyledMain");

const TransactionsContainer = styled(StyledMain) `
    h1 {
        font-size: 26px;
        color: white;
        padding: 25px;
        margin-bottom: 15px;
    }

    svg {
        position: fixed;
        top: 22px;
        font-size: 25px;
        right: 15px;
        color: white;
    }
`
export default TransactionsContainer;