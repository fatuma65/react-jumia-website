import { categoriesTypes } from "../actions/types";

const initialState = {
    categories: [],
    loading: false,
    error: null
}

const categoriesReducer = (state = initialState, action) => {
    switch(action.type) {
        case(categoriesTypes.FETCH_CATEGORIES):
        return {
            ...state,
            categories: action.payload,
            loading: false
        }
        default: 
        return state
    }
}
export default categoriesReducer