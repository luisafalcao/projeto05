/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listarItens } from "../infra/basededados";

import NovoConteudo from "../components/NovoConteudo";
import Form from "../components/Form";
import ListaVerbos from "./listas/ListaVerbos";

export default function Verbos() {
    let { id } = useParams();

    const categoria = "verbos"

    const [verbos, setVerbos] = useState([]);
    const [verbosId, setVerbosId] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await listarItens(categoria, id)
            setVerbos(data)
        }

        fetchData()
    }, [verbosId])

    return (
        <>
            <div className="container grid">
                <div className="coluna">
                    <ListaVerbos conteudo={verbos} categoria={categoria} />
                </div>
                <div className="coluna">
                    <NovoConteudo label="Verbo">
                        <Form
                            setDatabaseId={setVerbosId}
                            idiomaSelecionado={id}
                            categoria={categoria}
                            campos={[
                                {
                                    name: "infinitivoPt",
                                    type: "text",
                                    maxLength: 100,
                                    required: true,
                                    label: "Infinitivo (Português)"
                                },
                                {
                                    name: "infinitivoId",
                                    type: "text",
                                    maxLength: 100,
                                    required: true,
                                    label: "Infinitivo (Idioma)"
                                },
                            ]}
                            textoBotao="Adicionar"
                            textoSucesso="Verbo adicionado com sucesso!"
                        />
                    </NovoConteudo>
                </div>
            </div>
        </>
    )
}