const active_order = {
    email: 'inbody.5@gmail.com',
    status: 'Processing',
    total: '10',
    items: {foo: 'bar'},
    phone: '419-957-5390',
    name: 'Jason Inbody',
    pitNum: 1,
    lon: -117.231963,
    lat: 32.787912,
    orderPlaced: 1609134501,
    orderDelivered: null,
}

const completed_order = {
    email: 'inbody.5@gmail.com',
    status: 'Delivered',
    total: '10',
    items: {foo: 'bar'},
    phone: '419-957-5390',
    name: 'Jason Inbody',
    pitNum: 1,
    lon: -117.231963,
    lat: 32.787912,
    orderPlaced: 1609134501,
    orderDelivered: 1609134701,
}

class User {
    constructor() {
        this.email = '';
        this.token = '';
        this.loggedIn = false;
        this.lat = '33.333';
        this.lon = '-117.222';
        this.quantity = 0;
        this.pitNum = null;
        this.orders = [];//[active_order, completed_order, completed_order, completed_order, completed_order, completed_order, completed_order, completed_order];
    }
    total = () => {
        return this.quantity*10;
    }
    resetCart = () => {
        this.lat = '33.333';
        this.lon = '-117.222';
        this.quantity = 0;
        this.pitNum = null;
    }
    updateOrders = (orders) => {
        // This method updates the active orders and completed orders
        this.orders = orders;
    }
    config = () => {
        // this method creates the head config for https requests
        const header = {headers: {Authorization: 'Bearer ' + this.token}};
        return header;
    }
}

export default User