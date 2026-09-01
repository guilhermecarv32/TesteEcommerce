const items = $input.all();
const results = [];

for (let i = 0; i < items.length; i++) {
  // Puxa os dados que vieram do banco no nó PostgreSQL
  const dbData = $('Consultar produtos').all()[i].json;
  
  // Limpa e converte o preço (ex: "3800.00" -> 3800.00)
  const precoExtraidoRaw = items[i].json.preco_extraido || '0';
  const precoAtual = parseFloat(precoExtraidoRaw.replace(/[^\d.,]/g, '').replace(',', '.'));
  const precoAlvo = parseFloat(dbData.preco_alvo);
  const ultimoPreco = dbData.preco_atual !== null ? parseFloat(dbData.preco_atual) : null;
  const nome = items[i].json.nome_extraido;

  let status = 'manteve';
  let atingiuAlvo = precoAtual <= precoAlvo;
  let mensagemAlerta = '';

  if (ultimoPreco === null) {
    status = 'primeira_leitura';
    mensagemAlerta = `Produto cadastrado: ${nome} está custando R$ ${precoAtual.toFixed(2)}.`;
  } else if (precoAtual < ultimoPreco) {
    status = 'diminuiu';
    if (atingiuAlvo) {
      mensagemAlerta = `🚨 META ATINGIDA! ${nome} caiu para R$ ${precoAtual.toFixed(2)} (Alvo: R$ ${precoAlvo.toFixed(2)})!`;
    } else {
      mensagemAlerta = `📉 Preço caiu! ${nome} baixou de R$ ${ultimoPreco.toFixed(2)} para R$ ${precoAtual.toFixed(2)}.`;
    }
  } else if (precoAtual > ultimoPreco) {
    status = 'aumentou';
    mensagemAlerta = `📈 Preço subiu: ${nome} aumentou de R$ ${ultimoPreco.toFixed(2)} para R$ ${precoAtual.toFixed(2)}.`;
  } else {
    status = 'manteve';
    mensagemAlerta = `Preço estável: ${nome} continua R$ ${precoAtual.toFixed(2)}.`;
  }

  results.push({
    json: {
      id: dbData.id,
      nome: nome,
      url: dbData.url,
      preco_atual: precoAtual,
      preco_alvo: precoAlvo,
      ultimo_preco: ultimoPreco,
      status: status,
      atingiu_alvo: atingiuAlvo,
      mensagem_alerta: mensagemAlerta
    }
  });
}

return results;