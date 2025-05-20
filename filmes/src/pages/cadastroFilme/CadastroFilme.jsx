import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista"
import { Fragment, useEffect, useState } from "react";

import api from "../../services/Services"


//import Swal from 'sweetalert2'
import Swal from 'sweetalert2'

const CadastroFilme = () => {
    //funcao para trazer os generos no meu select
    const [listaGenero, setListaGenero] = useState([]);

    const [genero, setGenero] = useState("");
    const [filme, setFilme] = useState("");



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
       // alert("lista apareceu")
        try {
            const resposta = await api.get("genero");
            setListaGenero(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

     async function cadastrarFilme(e) {
        e.preventDefault();
        console.log(filme);
        console.log(genero);
        if(filme.trim() != ""){
        // trycatch > tratamento de exceção
        try {
           await api.post("filme", {titulo: filme, idGenero: genero});
              alertar("success", "Sucesso! Cadastro Realizado");
              setFilme("");
              setGenero("");
        } catch (error) {
            console.log(error);
        }
       // alert("foi chamado cadastrarFilme!");
       }else{
        alertar("error", "Erro! Preencha os campos")
       }
    }
    useEffect(() => {
        listarGenero();
    }, []);

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Filme"
                    placeholder=" Filme"
                    lista={listaGenero}
                    funcCadastro = {cadastrarFilme}

                    valorInput = {filme}
                    setValorInput = {setFilme}
                    setValorSelect = {setGenero}
                    valorSelect = {genero}
                />
                <Lista
                    tituloLista="Filmes"
                    nomeGenero="Genero"

                />
            </main>
            <Footer />

        </>
    )
}
export default CadastroFilme;