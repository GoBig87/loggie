

class User {
    constructor() {
        this.email = '';
        this.token = '';
        this.loggedIn = false;
        this.lat = '33.333';
        this.lon = '-117.222';
        this.quantity = 0;
        this.pitNum = null;
        this.activeOrders = [];
        this.completedOrders = [];
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
        const arrayLength = orders.length;
        const activeArray = [''];
        const completedArray = [''];
        this.activeOrders = []
        this.completedOrders = [];
        for (let i = 0; i < arrayLength; i++) {
            console.log(orders[i]);
            if(orders[i].hasOwnProperty('status')){
                if(orders[i]['status'].includes(activeArray)){
                    this.activeOrders.push(orders[i])
                }else if(orders[i]['status'].includes(completedArray)){
                    this.completedOrders.push(orders[i])
                }else{
                    console.log('Invalid status for order');
                    console.log(orders[i]);
                }
            }
        }
    }
    config = () => {
        // this method creates the head config for https requests
        const header = {headers: {Authorization: 'Bearer ' + this.token}};
        return header;
    }
}

export default User