import createGlobalState from 'react-create-global-state';

const USER_KEY = "user";
const userSalvo = localStorage.getItem(USER_KEY);
const initialState = userSalvo ? JSON.parse(userSalvo) : null;

const [_useGlobalUser, Provider] = createGlobalState(initialState);

function useGlobalUser() {
    const [_user, _setUser] = _useGlobalUser();

    function setUser(user) {
        _setUser(user);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    return [_user, setUser];
}

export const GlobalUserProvider = Provider;

export default useGlobalUser;