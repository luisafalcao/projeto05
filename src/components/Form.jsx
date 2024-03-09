/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { inserirIdioma, inserirItem } from "../infra/basededados";
import "./Form.css"

export default function Form({ campos, textoBotao, idiomaSelecionado, categoria, textoSucesso, setDatabaseId, subCategoria }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    async function enviarDados(dados) {

        if (categoria === "idiomas") {
            const idiomaNome = dados.idioma.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            let id = await inserirIdioma(dados, idiomaNome);

            setDatabaseId(id)
        } else {
            let subColecaoNome
            let tempo
            let conjGrupo

            if (categoria === "vocabulario") {
                subColecaoNome = dados.palavraId.toLowerCase();
            } else if (categoria === "gramatica") {
                subColecaoNome = dados.regra.toLowerCase();
            } else if (categoria === "verbos") {
                if (subCategoria) {
                    subColecaoNome = subCategoria.toLowerCase()
                    const { tempoVerbal, ...conjugacoes } = dados
                    tempo = tempoVerbal.toLowerCase()
                    conjGrupo = conjugacoes
                } else {
                    subColecaoNome = dados.infinitivoId.toLowerCase() //faire
                }
            }
            await inserirItem(dados, idiomaSelecionado, categoria, subColecaoNome, tempo, conjGrupo)
        }

        alert(textoSucesso)
        reset();
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit(enviarDados)}>
                {
                    campos.map((campo, index) => {
                        const { name, type, maxLength, required, label, options } = campo
                        {/* 
                        if (group === true) {
                            return (
                                <div key={index} className="form-group">
                                    <label htmlFor="grupoInputs"></label>
                                    <div>
                                        <input className={`full-width ${required && 'required'}`} type={type} placeholder={label} {...register(`grupoInputs.${name}`, { required: required, maxLength: maxLength })} />
                                    </div>
                                </div>
                            )
                        } */}

                        if (type === "textarea") {
                            return (
                                <div key={index} className="form-group">
                                    <label htmlFor={name}>{label}</label>
                                    <textarea cols="30" rows="10" {...register(name, { required: required, maxLength: maxLength })}></textarea>
                                </div>
                            )
                        } else if (type === "select") {
                            return (
                                <div key={index} className="form-group">
                                    <label htmlFor={name}>{label}</label>
                                    <select {...register(name, { required: required, maxLength: maxLength })}>
                                        {options.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className="form-group">
                                    <label htmlFor={name}>{label}{required && <span>*</span>}</label>
                                    <input className={`${required && 'required'}`} type={type} {...register(name, { required: required, maxLength: maxLength })} />
                                </div>
                            )
                        }



                    })
                }
                <input type="submit" value={textoBotao} />
            </form>
        </div>
    )
}