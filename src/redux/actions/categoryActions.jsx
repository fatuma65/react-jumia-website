import { categoriesTypes } from "./types";

export const fetchCategories = (categories) => {
    return {
        type: categoriesTypes.FETCH_CATEGORIES,
        payload: categories,
    }
}