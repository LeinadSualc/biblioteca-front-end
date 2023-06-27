"use client"
//import { useClient } from "next/client";
import { Loading } from "@/components/Loading";
import { ToastComponent } from "@/components/Toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from 'nookies'
import { useCallback, useRef, useState } from "react"

export default function Login() {

    const router = useRouter();

    const refForm = useRef<any>();
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')


    const submitForm = useCallback((e: any) => {
        e.preventDefault();
        if (refForm.current.checkValidity()) {
            setLoading(true)
            const objSalvar = {
                titulo: e.target.titulo.value,
                subTitulo: e.target.subTitulo.value,
                isbn: e.target.isbn.value,
                autor: e.target.autor.value,
                editora: e.target.editora.value,
                local: e.target.local.value,
                ano: e.target.ano.value,
            }

            axios.post('/livros',
                objSalvar
            )
                .then((resposta) => {
                    console.log(resposta.data)

                    setCookie(
                        undefined,
                        'shoopypainel.token',
                        resposta.data.token,
                        {
                            maxAge: 60 * 60 * 24 * 30,
                            path: '/'
                        }
                    )

                    router.push('/dashboard')

                    setLoading(false)
                })
                .catch((err) => {
                    setLoading(false)
                    setToast(true)
                    setToastMessage('Dados invalidos')
                    console.log(err)
                })

        } else {
            refForm.current.classList.add('was-validated')
        }


    }, [])

    return (
        <>
            <Loading loading={loading} />
            <ToastComponent
                show={toast}
                message={toastMessage}
                colors="danger"
                onClose={() => { setToast(false) }}
            />


            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh'
            }}>
                <div style={{
                    border: 2,
                    borderColor: '#ccc',
                    borderStyle: 'solid',
                    padding: 20
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: 70
                    }}>
                        <h1 style={{ color: "#FF7F50" }}>
                            Cadastro de Livros
                        </h1>

                    </div>
                    <hr />
                    <form
                        className="row g-3 needs-validation"
                        noValidate
                        style={{
                            // paddingBottom: 20
                            alignItems: 'center'
                        }}
                        ref={refForm}
                        onSubmit={submitForm}

                    >
                        <div className="col-md-12">
                            <label
                                htmlFor="titulo"
                                className="form-label"
                            >
                                Titulo
                            </label>
                            <div className="input-group has-validadion">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Digite o titulo"
                                    id="titulo"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Informe o titulo
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label
                                htmlFor="titulo"
                                className="form-label"
                            >
                                Subtitulo
                            </label>
                            <div className="input-group has-validadion">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Digite o subtitulo"
                                    id="subTitulo"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Informe o subtitulo
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label
                                htmlFor="isbn"
                                className="form-label"
                            >
                                ISBN
                            </label>
                            <div className="input-group has-validadion">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Digite o ISBN"
                                    id="isbn"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Informe o ISBN
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="autor" className="form-label">
                                Autor
                            </label>
                            <div className="input-group has-validation">
                                <select className="form-control" id="autor" required>
                                    <option value="">Selecione um autor</option>
                                    <option value="1">Autor 1</option>
                                    <option value="2">Autor 2</option>
                                    <option value="3">Autor 3</option>
                                    {/* Adicione mais opções conforme necessário */}
                                </select>
                                <div className="invalid-feedback">
                                    Selecione um autor válido.
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="editora" className="form-label">
                                Editora
                            </label>
                            <div className="input-group has-validation">
                                <select className="form-control" id="editora" required>
                                    <option value="">Selecione uma editora</option>
                                    <option value="1">Editora 1</option>
                                    <option value="2">Editora 2</option>
                                    <option value="3">Editora 3</option>
                                    {/* Adicione mais opções conforme necessário */}
                                </select>
                                <div className="invalid-feedback">
                                    Selecione uma editora válida
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label
                                htmlFor="local"
                                className="form-label"
                            >
                                Local
                            </label>
                            <div className="input-group has-validadion">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Digite o local"
                                    id="isbn"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Informe o Local
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label
                                htmlFor="ano"
                                className="form-label"
                            >
                                Ano
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Digite o ano"
                                id="ano"
                                required
                            />
                            <div className="invalid-feedback">
                                Por favor digite o ano.
                            </div>
                        </div>
                        <div className="col-md-12">
                            <button
                                className="btn btn-primary"
                                type='submit'
                                id="botao"

                            >
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}