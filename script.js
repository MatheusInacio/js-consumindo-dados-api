async function buscarEndereco(cep) {
  var mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";
  try {
    var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json`);
    var consultaJson = await consultaCep.json();
    if (consultaJson.erro) {
      throw Error('Cep não Existe');
    }

    var cidade = document.getElementById("cidade");
    var logradouro = document.getElementById("logradouro");
    var estado = document.getElementById("estado");
    var bairro = document.getElementById("bairro");

    cidade.value = consultaJson.localidade;
    logradouro.value = consultaJson.logradouro;
    estado.value = consultaJson.uf;
    bairro.value = consultaJson.bairro;

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

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscarEndereco(cep.value));