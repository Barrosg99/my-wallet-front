import Axios from 'axios';
import React,{ useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';

export default function SignIn() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassowrd ] = useState('');
    const [ isClicked, setIsClicked ] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    useEffect( () => {
        if (user) history.push('/');
    }, [user]);
    
    function signIn(e) {
        e.preventDefault();
        setIsClicked(true);

        const userInfo = {
            email,
            password
        };
        Axios
            .post('https://barros-mywallet.herokuapp.com/api/users/sign-in', userInfo)
            .then( res => {
                if(!res) return alert('Usuário não encontrado');

                const { data } = res;
                const jsonData = JSON.stringify(data);
                localStorage.data = jsonData;

                setUser(data);
                setIsClicked(false);
            })
            .catch( err => {
                const { response } = err;
                if(!response) alert("Internal Server Error");

                else    alert(JSON.stringify(response.data));
                setIsClicked(false);
            })

    }

    return(
        <SignInContainer>
            <h1>MyWallet</h1>
            <form onSubmit = { signIn }>
                <input
                    placeholder = 'E-mail'
                    type = 'email'
                    value = { email }
                    onChange = { e => setEmail(e.target.value)}
                    autoComplete = 'username'
                    required
                />
                <input
                    placeholder = 'Senha'
                    type = 'password'
                    value = { password }
                    onChange = { e => setPassowrd(e.target.value)}
                    autoComplete = 'current-password'
                    required
                />
                <input type = 'submit' value = 'Entrar' disabled = { isClicked } />
                <Link to='/signUp' >Primeira Vez? Cadastre-se!</Link>
            </form>
        </SignInContainer>
    )
}

const SignInContainer = styled.div `
    text-align: center;
    padding-top: 159px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-weight: 400;
        font-size: 32px;
        color: white;
        margin-bottom: 24px;
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

    input:nth-child(3) {
        padding: 11px 0px;
        font-family: inherit;
        font-weight: bold;
        background: #A328D6;
        color: white;
        border: none;
        margin-bottom: 36px;
        outline: none;
    }

    input::placeholder {
        color: black;
    }

    a {
        display: block;
        color: white;
        font-size: 15px;
    }
`