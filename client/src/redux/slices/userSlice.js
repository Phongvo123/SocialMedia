import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    firstname: '',
    lastname: '',
    username: '',
    profilePicture: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { firstname = '', lastname = '', username = '', profilePicture = '' } = action.payload
            state.firstname = firstname;
            state.lastname = lastname;
            state.username = username;
            state.profilePicture = profilePicture
        }
    }
})

export const {
    addUser
} = userSlice.actions

export default userSlice.reducer