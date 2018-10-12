import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case DELETE_POST:
            // omit returns new state object. in this case, the payload is the id
            // putting this into the reducer makes the UI just a little snappier since
            // it no longer relies on just a GET call to update the state
            return _.omit(state, action.payload);
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_POST:
            // ES5 and ES6 equivalence!!!
            // const post = action.payload.data;
            // const newState = { ...state };
            // newState[post.id] = post;
            // return newState;
            return { ...state, [action.payload.data.id]: action.payload.data };
        default:
            return state;
    }
}
