import React, { useState, createContext } from 'react';

const UserContext = createContext();

export default UserContext;

export function UserProvider(props) {
    const localData = localStorage.data !== undefined ? JSON.parse(localStorage.data) : null;
    const [ user, setUser ] = useState(localData);

    return (
        <UserContext.Provider value = { {user, setUser} }>
            { props.children }
        </UserContext.Provider>
    )
}