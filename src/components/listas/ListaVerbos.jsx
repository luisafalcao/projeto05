/* eslint-disable react/prop-types */
import Box from "../Box"
import Tabela from "../Tabela";

export default function ListaVerbos({ conteudo }) {

    return (conteudo.map((verbo, index) => {
        const { infinitivoId } = verbo;
        return (
            <Box key={index} titulo={infinitivoId} categoria="verbos">
                <Tabela conteudo={verbo} />
            </Box>
        )
    }))

}