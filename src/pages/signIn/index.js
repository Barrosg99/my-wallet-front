import Axios from 'axios';
import React,{ useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import StyledButton from '../../components/Buttons/StyledButton';
import SignInContainer from './SignInContainer';
import StyledInput from '../../components/Inputs/StyledInput';

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
                <StyledInput
                    placeholder = 'E-mail'
                    type = 'email'
                    value = { email }
                    onChange = { e => setEmail(e.target.value)}
                    autoComplete = 'username'
                    required
                />
                <StyledInput
                    placeholder = 'Senha'
                    type = 'password'
                    value = { password }
                    onChange = { e => setPassowrd(e.target.value)}
                    autoComplete = 'current-password'
                    required
                />
                <StyledButton type = "submit" disabled = {isClicked} >Entrar</StyledButton>
                <Link to='/signUp' >Primeira Vez? Cadastre-se!</Link>
            </form>
        </SignInContainer>
    )
}

