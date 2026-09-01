UPDATE produtos
SET 
    nome = '{{ $json.nome }}',
    ultimo_preco = CASE 
        WHEN ultimo_preco IS NULL AND preco_atual IS NULL THEN {{ $json.preco_atual }}
        WHEN preco_atual IS NOT NULL THEN preco_atual 
        ELSE ultimo_preco 
    END,
    preco_atual = {{ $json.preco_atual }},
    data_ultima_verificacao = CURRENT_TIMESTAMP
WHERE id = {{ $json.id }}
RETURNING *;