
export default function isFavorites(state = '', action) {
    switch (action.type) {
        case 'FAVORITE':
            return action.isFavorites;
        default:
            return state;
    }
}
