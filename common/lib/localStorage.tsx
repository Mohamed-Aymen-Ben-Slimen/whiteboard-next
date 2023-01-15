import Cryptr from 'cryptr';

const secret = 'KyKF2jl6l9d40v9NgrL@K1%l$N8IV7';

const cryptr = new Cryptr(secret);

const setUserLocalStorage = (user: any) => {
    const userString = JSON.stringify(user);
    const crypted = cryptr.encrypt(userString);
    localStorage.setItem('user', crypted);
}

const getUserLocalStorage = () => {
    const encryptedUser = localStorage.getItem('user');
    if (!encryptedUser || encryptedUser.length === 0) {
        return null;
    }
    try {
        const userString = cryptr.decrypt(encryptedUser);
        return JSON.parse(userString).user;
    } catch(e) {
        return null;
    }
}

const deleteUserLocalStorage = () => {
    localStorage.removeItem('user');
}

export {
    setUserLocalStorage,
    getUserLocalStorage,
    deleteUserLocalStorage,
};