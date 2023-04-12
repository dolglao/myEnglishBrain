import React from 'react'

const ExerciseSelector = ({ exerciciosFiltrados, handleExerciseChange }) => {
    return (
        <select className='exercicio' onChange={handleExerciseChange}>
            <option value="">Selecione um exercício</option>
            {exerciciosFiltrados.map(exercicio => (
                <option key={exercicio._id} value={exercicio._id}>
                    {exercicio.exercicio}
                </option>
            ))}
        </select>
    );
};


export default ExerciseSelector