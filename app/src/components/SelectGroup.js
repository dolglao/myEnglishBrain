import { useState, useEffect } from 'react';
import GroupSelector from './GroupSelector';
import ExerciseSelector from './ExerciseSelector';
import ExerciseInfo from './ExerciseInfo';
import MyForm from './MyForm';

const SelectGroup = () => {
    const [grupos, setGrupos] = useState([]);
    const [exercicios, setExercicios] = useState([]);
    const [exerciciosFiltrados, setExerciciosFiltrados] = useState([]);
    const [exercicioSelecionado, setExercicioSelecionado] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/exercicios')
            .then(response => response.json())
            .then(data => {
                const uniqueGrupos = [...new Set(data.exercicios.map(exercicio => exercicio.grupo))];
                setGrupos(uniqueGrupos);
                setExercicios(data.exercicios);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        // atualize o formulário sempre que exercicioSelecionado mudar
        if (exercicioSelecionado) {
            <MyForm data={new Date()} id={exercicioSelecionado._id} intervalo={exercicioSelecionado.intervalo} />
        }
    }, [exercicioSelecionado]);

    const handleGroupChange = (event) => {
        const grupoSelecionado = event.target.value;
        const exerciciosFiltrados = exercicios.filter(exercicio => exercicio.grupo === grupoSelecionado);
        setExerciciosFiltrados(exerciciosFiltrados);
        setExercicioSelecionado(null);
    };

    const handleExerciseChange = (event) => {
        const exercicioSelecionadoId = event.target.value;
        const exercicioSelecionado = exercicios.find(exercicio => exercicio._id === exercicioSelecionadoId);
        setExercicioSelecionado(exercicioSelecionado);
    };


    return (
        <div>
            <GroupSelector grupos={grupos} handleGroupChange={handleGroupChange} />

            {exerciciosFiltrados.length > 0 && (
                <ExerciseSelector exerciciosFiltrados={exerciciosFiltrados} handleExerciseChange={handleExerciseChange} />
            )}

            {exercicioSelecionado && (
                <ExerciseInfo exercicioSelecionado={exercicioSelecionado} />
            )}

            {exercicioSelecionado && (
                <MyForm data={Math.floor(Date.now() / 1000)} id={exercicioSelecionado._id} intervalo={exercicioSelecionado.intervalo} />
            )}
        </div>
    );
};

export default SelectGroup;
