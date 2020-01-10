// AQUI É ONDE VAI FICAR A CONFIGURAÇÃO DO REDUX
import { createStore } from 'redux'

const INITIAL_STATE = {
    data: [
        'React Native',
        'ReactJS',
        'HTML'
    ],
};
//ESSE É O REDUCER DA APLICAÇÃO
// recebe como parametros o estado anterior e uma action
function courses(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_COURSE':
            return { ...state, data: [...state.data, action.title] };
        default:
            return state;
    }
}

const store = createStore(courses);

export default store;