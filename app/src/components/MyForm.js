import { useState } from 'react';

const MyForm = ({ data, id, intervalo }) => {
  const [repeticoes, setRepeticoes] = useState('');
  const [carga, setCarga] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // enviar dados do formulário para o servidor ou fazer alguma ação com os dados do formulário
    console.log({ data: data, exercicio_id: id, repeticoes: repeticoes, carga: carga, obs: observacoes });


    const formData = {
      data: data,
      exercicio_id: id,
      repeticoes: repeticoes,
      carga: carga,
      cargaTotal: carga*repeticoes,
      obs: observacoes
    };

    fetch('http://localhost:4000/enviar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Dados enviados com sucesso!');
        } else {
          console.log('Ocorreu um erro ao enviar os dados.');
        }
      })
      .catch(error => {
        console.log(`Ocorreu um erro: ${error}`);
      });



    let tempoRestante = intervalo;
    const interval = setInterval(() => {
      tempoRestante = tempoRestante - 1;
      if (tempoRestante <= 0) {
        clearInterval(interval);
      }
      setTempoRestante(tempoRestante);
    }, 1000);
  };

  const [tempoRestante, setTempoRestante] = useState(intervalo);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Repetições:
          <input type="number" value={repeticoes} onChange={(event) => setRepeticoes(event.target.value)} />
        </label>
        <br />

        <label>
          Carga:
          <input type="number" value={carga} onChange={(event) => setCarga(event.target.value)} />
        </label>
        <br />

        <label>
          Observações:
          <textarea value={observacoes} onChange={(event) => setObservacoes(event.target.value)} />
        </label>
        <br />

        <button type="submit">Enviar</button>
      </form>
      {tempoRestante > 0 && <div>{`Tempo restante: ${tempoRestante}`}</div>}
    </div>
  );
};

export default MyForm;
