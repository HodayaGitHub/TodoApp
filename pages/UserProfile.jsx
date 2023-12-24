const { useSelector, useDispatch } = ReactRedux
const { useEffect, useState } = React

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { UPDATE_USER, SET_USER } from '../store/reducers/user.reducer.js'
import { userService } from '../services/user.service.js'

export function UserProfile() {

    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const dispatch = useDispatch()

    const [userDetails, setUserDetails] = useState(null)

    // const [fullname, setNewFullname] = useState(user.fullname)
    // const [txtColor, setTxtColor] = useState(user.txtColor)
    // const [bgColor, setBgColor] = useState(user.bgColor)

    useEffect(() => {
        if (!user) return
        loadUser()
        // console.log('userrrrrrr', user)

    }, [])


    function loadUser() {
        userService.getById(user._id)
            .then((user) => {
                console.log('userrrrrrr', user)


                setUserDetails({
                    fullname: user.fullname || '',
                    txtColor: user.txtColor || '#000',
                    bgColor: user.bgColor || '#000',
                    activities: user.activities || []
                })
            })
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onEditUser(ev)
    }

    function handleChange(ev) {
        setUserDetails((prevUser) => ({ ...prevUser, [ev.target.name]: ev.target.value }))
    }


    function onEditUser() {
        const userToSave = {
            ...user, ...userDetails
        }
        console.log('baba: ', userToSave)


        userService
            .save({ ...userToSave })
            .then((updatedUser) => {
                console.log(' d')
                console.log("updatedUser", updatedUser)
                dispatch({ type: UPDATE_USER, user: { ...updatedUser } })
                showSuccessMsg("User updated successfully")
            })
            .catch((error) => {
                console.error("Error updating user:", error)
                showErrorMsg("Cannot update user")
            })
    }


    function setActivitieTime(activity) {
        console.log('activity', activity);
        const { at } = activity
        const timeDiff = new Date(Date.now() - at)
        const atByMin = timeDiff.getMinutes()
        if (atByMin < 60) return atByMin + ' minutes ago:'
        else if (atByMin > 60) return 'Couple of hours ago: '
        else if (atByMin > 60 * 24) return 'A day or more ago: '
    }



    if (!user || !userDetails) return <div>loading......</div>
    return (
        <React.Fragment>
            <div>
                <h1>Profile</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullname">Full Name</label>
                <input
                    onChange={handleChange}
                    value={userDetails.fullname}
                    type="text"
                    name="fullname"
                    id="fullname"
                />

                <label htmlFor="txtColor">Text Color</label>
                <input

                    onChange={handleChange}
                    value={userDetails.txtColor}
                    type="color"
                    name="txtColor"
                    id="txtColor"
                />

                <label htmlFor="bgColor">Background Color</label>
                <input
                    onChange={handleChange}
                    value={userDetails.bgColor}
                    type="color"
                    name="bgColor"
                    id="bgColor"
                />

                <button disabled={!user.fullname}>Save</button>
            </form>

            {userDetails.activities && <ul>
                {userDetails.activities.map((activity) => (
                    <li key={activity.at}>
                        {setActivitieTime(activity)}
                        {activity.txt}
                    </li>
                ))}
            </ul>}

        </React.Fragment>
    )
}
