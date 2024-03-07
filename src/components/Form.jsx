/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { inserirDocumento, inserirSubColecao } from "../infra/basededados";
import "./Form.css"

export default function Form({ campos, textoBotao, database, document, textoSucesso, setDatabaseId }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    async function enviarDados(dados) {
        if (database === "idiomas") {
            const novoIdioma = dados.idioma.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            let id = await inserirDocumento(dados, database, novoIdioma);
            setDatabaseId(id)
        } else {
            const subColecaoNome = dados.palavraId.toLowerCase();
            await inserirSubColecao(dados, database, document, subColecaoNome)
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
                                    <label htmlFor={name}>{label}</label>
                                    <input type={type} {...register(name, { required: required, maxLength: maxLength })} />
                                </div>)
                        }

                    })
                }
                <input type="submit" value={textoBotao} />
            </form>
        </div>
    )
}