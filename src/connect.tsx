import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://jpcadastro.onrender.com',

})

const conMembros = {
    'getMembro': () => axiosInstance.get('/membros/'),
    'createMembro':(nome: string, nascimento: Date, cpf: string) => axiosInstance.post('/membros/', {nome ,nascimento, cpf}),
} 

export default conMembros