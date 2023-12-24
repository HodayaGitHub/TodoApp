const { useSelector, useDispatch } = ReactRedux
const { useEffect, useState } = React

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { UPDATE_USER, SET_USER } from '../store/reducers/user.reducer.js'
import { userService } from '../services/user.service.js'

export function UserProfile() {

    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const dispatch = useDispatch()

    const [fullname, setNewFullname] = useState(user.fullname)
    const [txtColor, setTxtColor] = useState(user.txtColor)
    const [bgColor, setBgColor] = useState(user.bgColor)

    useEffect(() => {
        if(!user) return 
        userService.getById(user._id).then((user) => {
            dispatch({ type: SET_USER, user })
        }).catch(error => {
            console.error('Error fetching user:', error)
        })
    }, [])

    function handleSubmit(ev) {
        ev.preventDefault()
        onEditUser(ev)
    }


     function onEditUser() {
        const userToSave =  {
            ...user,
            fullname: fullname,
            txtColor: txtColor,
            bgColor: bgColor,
        }

        console.log('baba: ', userToSave);


        userService
            .save({...userToSave})
            .then((updatedUser) => {
                console.log(' d');
                console.log("updatedUser", updatedUser)
                dispatch({ type: UPDATE_USER, user: {...updatedUser} })
                showSuccessMsg("User updated successfully")
            })
            .catch((error) => {
                console.error("Error updating user:", error)
                showErrorMsg("Cannot update user")
            })
    }


    return (
        <React.Fragment>
            <div>
                <h1>Profile</h1>
            </div>
            {console.log('user', user)}

            <form onSubmit={handleSubmit}>
                <label htmlFor="fullname">Full Name</label>
                <input
                    onChange={(e) => setNewFullname(e.target.value)}

                    value={fullname}
                    type="text"
                    name="fullname"
                    id="fullname"
                />

                <label htmlFor="txtColor">Text Color</label>
                <input

                    onChange={(e) => setTxtColor(e.target.value)}
                    value={txtColor}
                    type="color"
                    name="txtColor"
                    id="txtColor"
                />

                <label htmlFor="bgColor">Background Color</label>
                <input

                    onChange={(e) => setBgColor(e.target.value)}
                    value={bgColor}
                    type="color"
                    name="bgColor"
                    id="bgColor"
                />

                <button disabled={!user.fullname}>Save</button>
            </form>

        </React.Fragment>
    )
}
