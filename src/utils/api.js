class API {
    static _api
    static per_page = 100
    static endpoint

    constructor(endpoint){
        this.endpoint = endpoint;
        this._api = window.api;
    }

    get = async () => {
        const { _api, per_page, endpoint } = this;
        const response = await _api.get(endpoint, {
            per_page
        })
        const { data } = response;
        return data
    }

    add = async (category) => {
        const { _api, endpoint } = this;
        const response = await _api.post(endpoint, category);
        const { data } = response;
        return data
    }

    edit = async (id, category) => {
        const { _api, endpoint } = this;
        const response = await _api.put(`${endpoint}/${id}`, category);
        const { data } = response;
        return data
    }

    delete = async (id) => {
        const { _api, endpoint } = this;
        const response = await _api.delete(`${endpoint}/${id}`, {
                force: true,
            })
        const {data} = response;
        return data
    }
}

export default API