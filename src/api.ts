import { CellId } from "./hooks/gameContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const baseUrl = 'http://163.172.177.98:8081';
console.log(baseUrl)

const baseHeaders = {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
}

export const login = async (email: string, password: string): Promise<string> => {
    const result = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })
    
    const data = await result.json()
    console.log(data)

    return data.accessToken
};

export const register = async (email: string, password: string) => {
    const result = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()

    return data.accessToken
};


export const getUserDetails = async (): Promise<any> => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token) {

            const headers = {
                'Authorization': `Bearer ${token}`,
                ...baseHeaders
            };
        
            const response = await fetch(`${baseUrl}/user/details/me`, {
                method: 'GET',
                headers: headers
            });

            const data = await response.json();
            return data;

        } else {
            throw new Error('Token not found in AsyncStorage');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const listGames = async (token: string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'get',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json();
    
    return data
}



export const createGame = async (token: string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json();
    return data
}

export const loadGame = async (token: string, gameId: number) => {
    const result = await fetch(`${baseUrl}/game/${gameId}`, {
        method: 'get',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json();

    return data
}

export const sendMove = async (token: string, gameId: number, cell: CellId) => {
    const result = await fetch(`${baseUrl}/game/move/${gameId}`, {
        method: 'post',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            cell
        })
    })

    const data = await result.json();

    return data
}