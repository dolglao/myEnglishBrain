import React from 'react'

const ExerciseInfo = ({ exercicioSelecionado }) => {
    return (
        <div>
            <p>Exercício: {exercicioSelecionado.exercicio}</p>
            <p>Grupo: {exercicioSelecionado.grupo}</p>
            <p>Intervalo: {exercicioSelecionado.intervalo}</p>
            <p>Observações: {exercicioSelecionado.obs}</p>
            <p>Repetições: {exercicioSelecionado.repeticoes}</p>
            <p>Séries: {exercicioSelecionado.series}</p>
        </div>
    );
};


export default ExerciseInfo