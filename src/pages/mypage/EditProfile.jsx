import React from 'react'
import '../auth/Signup.css';
import AuthTop from '../../components/auth/AuthTop';
import SignupForm from '../auth/SignupForm';
import profileEdit from '../../assets/profileEdit.svg';
import EditProfileForm from './EditProfileForm';
import './EditProfile.css'

function EditProfile() {
    return (
        <div>
            <section className='a-signup-ct m-edit-profile'>
                <AuthTop type='프로필 수정' img={profileEdit} />
                <EditProfileForm />
            </section>
        </div>
    )
}

export default EditProfile
