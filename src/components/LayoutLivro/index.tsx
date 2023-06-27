import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Livro {
  titulo: string;
  subTitulo: string;
  isbn: string;
  autor: string;
  editora: string;
  local: string;
  ano: number;
}

const LayoutLivro = () => {
  const [livro, setLivro] = useState<Livro>({
    titulo: '',
    subTitulo: '',
    isbn: '',
    autor: '',
    editora: '',
    local: '',
    ano: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/livros', livro);
      // Limpar o formulário após o envio bem-sucedido
      setLivro({
        titulo: '',
        subTitulo: '',
        isbn: '',
        autor: '',
        editora: '',
        local: '',
        ano: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" name="titulo" value={livro.titulo} onChange={handleChange} required />
      </label>
      <label>
        Subtítulo:
        <input type="text" name="subTitulo" value={livro.subTitulo} onChange={handleChange} />
      </label>
      <label>
        ISBN:
        <input type="text" name="isbn" value={livro.isbn} onChange={handleChange} required />
      </label>
      <label>
        Autor:
        <input type="text" name="autor" value={livro.autor} onChange={handleChange} required />
      </label>
      <label>
        Editora:
        <input type="text" name="editora" value={livro.editora} onChange={handleChange} required />
      </label>
      <label>
        Local:
        <input type="text" name="local" value={livro.local} onChange={handleChange} />
      </label>
      <label>
        Ano:
        <input type="number" name="ano" value={livro.ano} onChange={handleChange} required />
      </label>
      <button type="submit">Cadastrar Livro</button>
    </form>
  );
};

export default LayoutLivro;
