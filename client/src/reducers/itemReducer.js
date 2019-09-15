import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEM } from '../actions/types';

const initialState = {
    items: [
        {
            id: uuid(),
            name: 'Telor'
        },
        {
            id: uuid(),
            name: 'Permen'
        },
        {
            id: uuid(),
            name: 'Chitato'
        },
        {
            id: uuid(),
            name: 'Kwaci'
        }
    ]
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state
            };
        default:
            return state;
    }
}
