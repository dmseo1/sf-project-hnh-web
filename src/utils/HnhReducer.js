

export const hnhReducer = (state, action) => {
    switch (action.type) {
        case "SET_INIT_DATA":
            return action.payload;

        case "LOGIN":
            console.log("LOGINED");
            return;

        default:
            console.log("It should not happen");
            return;
    }
}