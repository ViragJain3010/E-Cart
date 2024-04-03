import React from 'react'
import Navbar from '../Feature/Navbar/Navbar'
import UserProfile from '../Feature/Users/User'

const UserProfilePage = () => {
    return (
        <div>
            <Navbar>
                <UserProfile />
            </Navbar>
        </div>
    )
}

export default UserProfilePage