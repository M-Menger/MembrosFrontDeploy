import { useState, useEffect } from 'react';
import './App.css';
import conMembros from './connect';

function PegaMembros() {
  const [nome, setNome] = useState<string>('');
  const [nasc, setNasc] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [membros, setMembros] = useState<any[]>([]); // Armazena a lista de membros
  const [error, setError] = useState<string | null>(null); // Para mensagens de erro

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedDate = nasc.split('-').join('-');

    try {
      await conMembros.createMembro(nome, formattedDate, cpf); // Passando 'formattedDate'
      alert('Membro cadastrado com sucesso!');
      setNome('');
      setNasc('');
      setCpf('');
      fetchMembros(); // Atualiza a lista de membros após cadastrar
    } catch (error) {
      console.error('Erro ao cadastrar membro:', error);
      alert('Erro ao cadastrar membro.');
    }
};

  const fetchMembros = async () => {
    try {
      const response = await conMembros.getMembro();
      setMembros(response.data); // Armazena os dados recebidos
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
      setError('Erro ao buscar membros.');
    }
  };

  useEffect(() => {
    fetchMembros(); // Busca os membros ao montar o componente
  }, []);

  return (
    <>
      <div className='Div-Cadastro'>
        <h1>JpCadastro</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="Nome" 
            id="Nome" 
            placeholder='Nome' 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
          />
          <input 
            type="date" 
            name="nasc" 
            id="nasc" 
            value={nasc} 
            onChange={(e) => setNasc(e.target.value)} 
          />
          <input 
            type="text" 
            name="Cpf" 
            id="Cpf" 
            placeholder='CPF' 
            value={cpf} 
            onChange={(e) => setCpf(e.target.value)} 
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>

      {error && <p className="error">{error}</p>}

      <div>
        <h2>Membros Cadastrados:</h2>
        <ul>
          {membros.map((membro, index) => (
            <li key={index}>
              Nome: {membro.nome}, Nascimento: {new Date(membro.nascimento).toLocaleDateString()}, CPF: {membro.cpf}
            </li>
          ))}
        </ul>
      </div>

      <p className="read-the-docs">
        Desenvolvido por @Matheus Menger
      </p>
    </>
  );
}

export default PegaMembros;
