import { toast } from 'react-toastify';
import axios from 'axios';
class API {
    static _api
    static per_page = 100
    static endpoint

    constructor(endpoint) {
        this.endpoint = endpoint;
        this._api = window.api;
    }

    get = async () => {
        const { _api, per_page, endpoint } = this;
        try {
            const response = await _api.get(endpoint, {
                per_page
            })
            const { data } = response;
            return data
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }

    add = async (category) => {
        const { _api, endpoint } = this;
        try {
            const response = await _api.post(endpoint, category);
            const { data } = response;
            return data
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }

    edit = async (id, category) => {
        const { _api, endpoint } = this;
        try {
            const response = await _api.put(`${endpoint}/${id}`, category);
            const { data } = response;
            return data
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }

    delete = async (id) => {
        const { _api, endpoint } = this;
        try {
            const response = await _api.delete(`${endpoint}/${id}`, {
                force: true,
            })
            const { data } = response;
            return data
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }

    getCustomerBalance = async (customerId) => {
        const {
            REACT_APP_WORDPRESS_URL,
            REACT_APP_WORDPRESS_CONSUMER_KEY,
            REACT_APP_WORDPRESS_CONSUMER_SECRET,
        } = process.env;
        const customerBalance = await axios.get(`${REACT_APP_WORDPRESS_URL}/wp-json/str/v1/get_customer_total/${customerId}`, {
            consumer_key: REACT_APP_WORDPRESS_CONSUMER_KEY,
            consumer_secret: REACT_APP_WORDPRESS_CONSUMER_SECRET
        });
        return customerBalance?.data?.data?.totalBalance ? customerBalance.data.data.totalBalance : 0
    }
}

export default API