async function buscarEndereco(cep) {
  let mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";
  try {
      let consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json`);
      let consultaJson = await consultaCep.json();
      if (consultaJson.erro) {
          throw Error('Cep não Existe');
      }

      let cidade = document.getElementById("cidade");
      let logradouro = document.getElementById("endereco");
      let estado = document.getElementById("estado");
      let bairro = document.getElementById("bairro");

      cidade.value = consultaJson.localidade;
      logradouro.value = consultaJson.logradouro;
      estado.value = consultaJson.uf;
      bairro.value = consultaJson.bairro;

      console.log(consultaJson);
      return consultaJson;
  } catch (erro) {
      mensagemErro.innerHTML = `<p>CEP Inválido, tente novamente</p>`;
      console.log(erro);
  }

}

//let ceps = [86400000, 86430000]
//let conjuntoCeps = ceps.map(valores => buscarEndereco(valores));
//console.log(conjuntoCeps);
//Promise.all(conjuntoCeps).then(respostas => console.log(respostas));

let cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscarEndereco(cep.value));