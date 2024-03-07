/* eslint-disable react/prop-types */
import Box from "../Box"

export default function ListaGramatica({ conteudo }) {
    console.log(conteudo)
    return (
        <div className="coluna">
            {conteudo.map((item, index) => {
                const { regra, conteudo } = item
                return (
                    <Box key={index} titulo={regra} categoria="regra" conteudo={conteudo}></Box>
                )
            })}
        </div>
    )
}