import HttpService, {SKIP_AUTH} from "./HttpConstructor";

class AuthService extends HttpService {
    BASE_URL = '/sessions';

    login({ login, password }) {
        return this.post(`${this.BASE_URL}/login`, {login, password}, {
            headers: {
                [SKIP_AUTH]: true,
            }
        })
    }
}

export default new AuthService();