import Axios from "axios";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../helpers/endpoints";
import { SET_CURRENT_USER } from "./types";
import setAuthToken from "../helpers/setAuthToken";
import jwt_decode from 'jwt-decode';

export const loginUser = (userData) => dispatch => {

    return new Promise((resolve, reject) => {
        Axios.post(LOGIN_ENDPOINT, userData,{
            headers: {'Accept': 'application/json', 'Content-type': 'application/json'}
        }).then(response => {
            
            const { authorization } = response.headers

            localStorage.setItem('jwtToken', authorization);

            setAuthToken(authorization);

            const decoded = jwt_decode(authorization);

            dispatch(setCurrentUser({user: decoded, loggedIn: true}));


            resolve(response);
        }).catch(error => {
            reject(error);
        })
    }); 

}

export const registerUser = (userData) => dispatch => {

    return new Promise((resolve, reject) => {
        Axios.post(REGISTER_ENDPOINT, userData,{
            headers: {'Accept': 'application/json', 'Content-type': 'application/json'}
        }).then(response => {
        
            resolve(response);
        }).catch(error => {
            reject(error);
        })
    }); 

}


export const setCurrentUser = ({user, loggedIn}) => {
    return{
        type: SET_CURRENT_USER,
        payload: {user, loggedIn}
    };
}


export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');

    setAuthToken(false);

    dispatch(setCurrentUser({
        user: {},
        loggedIn: false
    }));
}


