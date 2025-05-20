import "./Lista.css"
import CadastroGenero from "../../pages/cadastroGenero/CadastroGenero"
import Editar from "../../assets/img/pen-to-square-solid.svg"
import Excluir from "../../assets/img/trash-can-regular.svg"

import { use, useEffect, useState } from "react";

    const Lista = (props) => {

    const itensPorPagina = 5;
    const [paginaAtual, setPaginaAtual] = useState(1);

    const totalPaginas = Math.ceil((props.lista?.length || 0) / itensPorPagina);
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const listaPaginada = props.lista?.slice(inicio, inicio + itensPorPagina);

    return (

        <section className="layout_grid listagem">
            <h1>Lista de Gêneros {props.tituloLista}</h1>
            <hr />
            <div className="tabela">
                <table>
                    <thead>
                        <tr className="table_cabecalho">
                            <th>Nome</th>
                            <th style={{ display: props.nomeGenero }}>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* verificar se a lista está vindo vazia */}
                        {listaPaginada && props.listaPaginada.length > 0 ? (
                            //vamos mapear os itens da lista
                            listaPaginada.map((item) => (

                                <tr className="item_lista" key={item.idGenero}>
                                    <td data-cell="Nome">
                                        {item.nome}
                                    </td>
                                    <td data-cell="Gênero" style={{ display: props.nomeGenero }}>Suspense</td>
                                    <td data-cell="Editar">
                                        <button onClick={() => { props.funcEditar(item) }}>

                                            <img src={Editar} alt="Imagem de uma caneta" />
                                        </button>
                                    </td>
                                    <td data-cell="Excluir"><img src={Excluir} alt="Imagem de uma caixa de lixo"
                                        onClick={() => props.onDelete(item)}
                                        style={{ cursor: "pointer" }}
                                    />
                                    </td>
                                </tr>
                            ))
                        ) :
                            (
                                <p>Nenhum gênero foi encontrado.</p>
                            )

                        }
                    </tbody>
                </table>
            </div>
            {/* Paginação */}
            {props.lista && props.lista.length > itensPorPagina && (
                <div className="paginacao" style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))} disabled={paginaAtual === 1}>

                    </button>

                    <span style={{ margin: '0 1rem' }}>
                        Página {paginaAtual} de {totalPaginas}
                    </span>

                    <button onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))} disabled={paginaAtual === totalPaginas}>

                    </button>
                </div>
            )}
        </section>
    )
}
export default Lista;