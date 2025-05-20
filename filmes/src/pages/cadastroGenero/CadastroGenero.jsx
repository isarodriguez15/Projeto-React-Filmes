import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import { useEffect, useState } from "react";
import api from "../../services/Services"

//import Swal from 'sweetalert2'
import Swal from 'sweetalert2'

const CadastroGenero = () => {


    //nome do genero
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);



    function alertar(icone, mensagem) {
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
    async function ExcluirGenero(generoId) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
            title: "Você tem certeza que deseja excluir?",
            text: "Não será possivél reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim!",
            cancelButtonText: "Não?",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // interpolacao * concatenacao 
                    await api.delete(`genero/${generoId.idGenero}`);
                    //((`genero/${idGenero})  Isso é template string, ou seja, permite inserir variáveis dentro da string.
                    //console.log(resposta.data);
                    // alertar("success", "Genero deletado com sucesso!")
                    listarGenero();

                } catch (error) {
                    console.log(error);
                    alertar("error", "Erro ao deletar o genero. Entre em contato com o suporte")
                }
                swalWithBootstrapButtons.fire({
                    title: "Deletado!",
                    text: "O gênero foi deletado.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Seu gênero não foi excluído :)",
                    icon: "error"
                });
            }
        });

    }
    //função da paginação de gênero


    //funcao atualizacao
    async function editarGenero(genero) {
       // console.log(genero);
        const { value: novoGenero } = await Swal.fire({
            title: "Modifique seu gênero",
            input: "text",
            inputLabel: "Novo gênero",
            inputValue: genero.nome,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });
        if (novoGenero) {
            try {
                api.put(`genero/${genero.idGenero}`,
                 {nome:novoGenero});
                Swal.fire(`O gênero modificado ${novoGenero}`);
            } catch (error) {
                    console.log(error);
            }
        }

    }





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
                alertar("Sucess macho", "Cadastro reaizado com sucesso!😁")
                // alert("");
                setGenero("")
                //atualiza minha lista assim que cadastrar um novo genero
                listarGenero();
            } catch (error) {
                alertar("sucess", "Erro macho! Entre em contato com o suporte!😭")
                console.log(error);
            }
        } else {
            alertar("error", "Preencha o campo!")
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
                  //  lista={listaGenero}
                    tituloLista="Cadastrados"
                    nomeGenero="none"
                    onDelete={ExcluirGenero}
                    funcEditar={editarGenero}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;