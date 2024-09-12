document.addEventListener('DOMContentLoaded', function () {
  const formAgendamento = document.getElementById('formAgendamento');
  const resultadoDiv = document.getElementById('resultado');

  // Quando o formulário for enviado
  formAgendamento.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Formulário enviado, preventDefault chamado!');

    const data = document.getElementById('data').value;
    const refeicao = document.getElementById('refeicao').value;

    if (!data || !refeicao) {
      resultadoDiv.innerHTML =
        "<p class='text-danger'>Por favor, preencha todos os campos!</p>";
      return;
    }

    // Enviar a requisição POST para o backend
    fetch('http://localhost:3000/api/refeicoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuario_id: 1, // user estatico
        data: data,
        refeicao: refeicao,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          resultadoDiv.innerHTML = `<p class='text-danger'>Erro: ${data.error}</p>`;
        } else {
          resultadoDiv.innerHTML = `<p class='text-success'>Refeição agendada com sucesso! ID: ${data.id}</p>`;
          formAgendamento.reset();
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
        resultadoDiv.innerHTML =
          "<p class='text-danger'>Ocorreu um erro ao tentar agendar a refeição.</p>";
      });
  });
});
