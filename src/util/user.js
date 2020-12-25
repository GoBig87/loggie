

class User {
    constructor() {
        this.email = '';
        this.token = ''
        this.loggedIn = false;
        this.lat = '33.333';
        this.lon = '-117.222';
        this.quantity = 0;
        this.pitNum = null;
    }
    total() {
        return this.quantity*10;
    }
    resetCart() {
        this.lat = '33.333';
        this.lon = '-117.222';
        this.quantity = 0;
        this.pitNum = null;
    }
    authTokenHeader() {
        return {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }
    }
}

export default User