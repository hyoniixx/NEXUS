import { auth } from "../firebase/config.js"
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'


//회원가입
export const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return user;
}

//로그인
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('로그인')
        return user;
    } catch (error) {
        throw error;
    }
}

//로그아웃
export const logout = async () => {
    await signOut(auth);
    console.log('로그아웃 성공')
}


// await logout();

//비밀번호 변경 로직
export const changePassword = async (newPassword) => {
    try {
        const user = auth.currentUser;
        if (user) {
            await updatePassword(user, newPassword);

            return true;
        } else {
            throw new Error("로그인된 사용자가 없습니다.");
        }
    } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
            console.error("비밀번호 변경 실패:", error);
            throw error;
        }
    }
}

//비밀번호 확인 로직
export const verifyCurrentPassword = async (currentPassword) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("로그인된 사용자가 없습니다.");

        const credential = EmailAuthProvider.credential(user.email, currentPassword);

        await reauthenticateWithCredential(user, credential);

        console.log("비밀번호 확인 성공");
        return true;
    } catch (error) {
        console.error("비밀번호 확인 실패:", error.code);
        return false;
    }
}


