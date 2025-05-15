import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import { use, useEffect, useState } from "react";
import api from "../../services/Services"

//import Swal from 'sweetalert2'
import Swal from 'sweetalert2'

const CadastroGenero = () => {


    //nome do genero
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);
    const [excluirGenero, setExcluir] = useState();


    function alerta(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }


    async function listarGenero() {
        try {
            const resposta = await api.get("genero");
            //  console.log(resposta.data[3]);
            setListaGenero(resposta.data);

        } catch (error) {
            console.log(error);

        }
    }
    //função de excluir o gênero ;)
    async function ExcluirGenero( generoId, idGenero) {
        try {

            await api.delete(`genero/${generoId.idGenero}`);
            //((`genero/${idGenero})  Isso é template string, ou seja, permite inserir variáveis dentro da string.
            //console.log(resposta.data);
            alerta("sucess", "Genero deletado com sucesso!")
            listarGenero();

        } catch (error) {
            console.log(error);
            alerta("error", "Erro ao deletar o genero. Entre em contato com o suporte")
        }
    }
       //função da paginação de gênero



    //Assim que a página renderizar, o método listarGenero() será chamado
    useEffect(() => {
        listarGenero();
        
    }, [listaGenero]);

    async function cadastrarGenero(evt) {
        evt.preventDefault();
        //Verificar se o input esta vindo vazio
        //Comedia Romantica
        if (genero.trim() != "") {
            try {
                //cadastrar um genero: post
                await api.post("genero", { nome: genero });
                alerta("Sucess macho", "Cadastro reaizado com sucesso!😁")
                // alert("");
                setGenero("")
            } catch (error) {
                alerta("sucess", "Erro macho! Entre em contato com o suporte!😭")
                console.log(error);
            }
        } else {
            alerta("error", "Preencha o campo!")
        }
    }

    //try => tentar(o esperado)
    //catch => pega a execao


    //Teste validar o genero
    //useEffect(<function>, <dependency>)
    //useEffect(() => {
    //console.log(genero);
    //},[genero]);

    //fim do teste

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    campoPlaceholder="Gênero"
                    //Atribuindo a funcao:
                    funcCadastro={cadastrarGenero}
                    //Atribuindo o valor ao input:
                    valorInput={genero}
                    //Atribuindo a funcao que atualiza o meu genero:
                    setValorInput={setGenero}
                />
                <Lista
                    nomeLista="Lista de Gênero"
                    visi_lista="none"
                    //atribuir para lista, o meu estado atual:
                    lista={listaGenero}
                    tituloLista="Cadastrados"
                    nomeGenero="none"
                    onDelete={ExcluirGenero}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;