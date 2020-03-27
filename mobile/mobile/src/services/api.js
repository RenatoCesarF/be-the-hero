import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

const api = axios.create({
    baseURL: 'http://192.168.1.213:3333'
});

export default api;