
import Botao from"../botao/Botao";

const Cadastro = (props) =>{
  return(
    <section className =" section_cadastro">

       <font  action ="" className =" layout_grit form_cadastro ">
         <h1>{props.tituloCadastro}</h1>

         <hr />
         
         <div className="campos_cadastro">
             
           <div className="campo_cad_nome" > 
             <label htmlFor="nome">Nome </label>
             <input type="text" name="nome" placeholder={`Digite o nome do ${props.placeholder}`}/>
           </div>

           <div className="campo_cad_genero" style={{display:props.visibili}}>
            <label htmlFor="genero">Gênero </label>
             <select name="genero" id="">
              <option value="" disabled selected > Selecione</option>
              <option value=""> op 1</option>
              <option value=""> op 2</option>
              <option value=""> op 3</option>
               
             </select>
           </div>

          <Botao nomeDoBotao="Cadastrar"/>
        
         </div>

    </font>

  </section>


  )


}
export default Cadastro;
