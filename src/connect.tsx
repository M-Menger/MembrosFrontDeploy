import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://jp-cadastro.onrender.com',
})

const conMembros = {
    'getMembro': () => axiosInstance.get('/membros/'),
    'createMembro': (nome: string, nascimento: string, cpf: string) =>
        axiosInstance.post('/membros/', { nome, nascimento, cpf }) 
}


export default conMembros