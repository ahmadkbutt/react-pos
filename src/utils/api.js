import { toast } from 'react-toastify';
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
}

export default API