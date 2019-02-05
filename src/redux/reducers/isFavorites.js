
export default function isFavorites(state = ' ', action) {
    switch (action.type) {
        case 'FAVORITE':
            console.log(action, '  =  ', state);
            return !action.isFavorites;
        default:
            return state;
    }
}
