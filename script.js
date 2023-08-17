async function buscarEndereco(cep) {
  
    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        var consultaJson = await consultaCep.json();
        if (consultaJson.erro) {
          throw Error('Cep não Existe');
        }
        //console.log(consultaJson);
        return consultaJson;
    } catch(erro) {
        console.log(erro);
    }
    
  } 
  
  let ceps = [86400000, 86430000]
  let conjuntoCeps = ceps.map(valores => buscarEndereco(valores));
  //console.log(conjuntoCeps);
  Promise.all(conjuntoCeps).then(respostas => console.log(respostas));