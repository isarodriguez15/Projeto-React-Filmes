import "./Lista.css"
import CadastroGenero from "../../pages/cadastroGenero/CadastroGenero"
import Editar from "../../assets/img/pen-to-square-solid.svg"
import Excluir from "../../assets/img/trash-can-regular.svg"
const Lista = (props) => {
    return (
        <>
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
                            {props.lista && props.lista.length > 0 ? (
                                //vamos mapear os itens da lista
                                props.lista.map((item) => (

                                    <tr className="item_lista" key={item.idGenero}>
                                        <td data-cell="Nome">
                                            {item.nome}
                                        </td>
                                        <td data-cell="Gênero" style={{ display: props.nomeGenero }}>Suspense</td>
                                        <td data-cell="Editar"><img src={Editar} alt="Imagem de uma caneta" /></td>
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
            </section>
        </>
    )
}
export default Lista;