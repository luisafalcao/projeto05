// import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { listarItens } from "../infra/basededados"
import "./Vocabulario.css"
import ListaVocabulario from "../components/listas/ListaVocabulario"
import NovoConteudo from "../components/NovoConteudo"
import Form from "../components/Form"

export default function Vocabulario() {
    let { id } = useParams();

    const document = "vocabulario";

    const [vocabulario, setVocabulario] = useState([]);
    const [vocabularioId, setVocabularioId] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await listarItens("paratestes"); //o certo é usar a const id
            setVocabulario(data);
        }

        fetchData();
    }, [vocabularioId])

    const placeholder = [
        {
            palavraPt: "Gato",
            palavraId: "Chat",
            genero: "Masculino",
            classeGramatical: "Substantivo"
        },
        {
            palavraPt: "Cachorro",
            palavraId: "Chien",
            genero: "Masculino",
            classeGramatical: "Substantivo"
        },
    ]

    return (
        <main>
            <div className="container-flex half">
                <div className="coluna">
                    <ListaVocabulario conteudo={placeholder} />
                    <NovoConteudo>
                        <Form
                            setDatabaseId={setVocabularioId}
                            database={id}
                            document={document}
                            campos={[
                                {
                                    name: "palavraPt",
                                    type: "text",
                                    maxLength: 50,
                                    required: true,
                                    label: "Palavra (PT)"
                                },
                                {
                                    name: "palavraId",
                                    type: "text",
                                    maxLength: 50,
                                    required: true,
                                    label: "Palavra"
                                },
                                {
                                    name: "genero",
                                    type: "select",
                                    maxLength: 50,
                                    required: true,
                                    label: "Gênero",
                                    options: ["Masculino", "Feminino", "Neutro"]
                                },
                                {
                                    name: "classeGramatical",
                                    type: "text",
                                    maxLength: 50,
                                    required: true,
                                    label: "Classe Gramatical"
                                },
                            ]}
                            textoBotao="Adicionar"
                            textoSucesso="Vocabulário atualizado com sucesso!"
                        />
                    </NovoConteudo>
                </div>
            </div>
        </main>
    )
}