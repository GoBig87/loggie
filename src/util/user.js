

class User {
    constructor() {
        this.email = '';
        this.token = ''
        this.payment = '';
        this.loggedIn = true;
        this.lat = '33.333';
        this.lon = '-117.222';
        this.quantity = 2;
        this.total = this.quantity*10
    }
}

export default User