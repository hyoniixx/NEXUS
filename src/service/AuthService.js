import { auth } from "../firebase/config.js"
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut } from 'firebase/auth'


export const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return user;
}

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('로그인 성공: ', user.uid)

        return user;
    } catch (error) {
        console.log('로그인 실패:', error);
        throw error;
    }
}

export const logout = async () => {
    console.log('현재 로그인 되어 있는 사용자의 UID:', auth.currentUser.uid);
    console.log('현재 로그인 되어 있는 사용자의 UID:', auth.currentUser.email);

    //로그아웃
    await signOut(auth);
    console.log('로그아웃 성공');
    console.log('현재 로그인 되어 있는 사용자의 UID:', auth.currentUser);

}


// await logout();


