import axios from "axios";

class User {
    constructor() {
        this.email = localStorage.getItem('email');
        this.token = localStorage.getItem('token');
        this.loggedIn = false;
        this.lat = '33.333';
        this.lon = '-117.222';
        this.quantity = 0;
        this.pitNum = null;
        this.orders = [];
        this.order = null;
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
    getDate= (timeStamp) => {
        var date = new Date(timeStamp * 1000);
        var month = date.getMonth();
        var day = date.getDate();
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = month + '/' + day + '/' + year + ' ' +hours + ':' + minutes.substr(-2)
        return formattedTime
    }
    logout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        this.loggedIn = false;
        this.lat = '33.333';
        this.lon = '-117.222';
        this.quantity = 0;
        this.pitNum = null;
        this.orders = [];
        this.order = null;
    };
}

export default User