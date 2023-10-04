import axios from "../axios";

class UserService {
    async checkCurrentUser() {
        const response = await axios.get('/currentuser');
        return response;
    }

    async logoutUser() {
        const response = await axios.get('/signout');
        return response;
    }

    async getUserSuggestions() {
        const response = await axios.get('/user/profile/user/suggestions');
        return response;
    }
}


export const userService = new UserService();