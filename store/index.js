export const state = () => ({
    data: [],
    type: null
});

export const mutations = {
    setData (state, value) {
        state.data = value;
    },
    setType (state, value) {
        state.type = value;
    }
};
