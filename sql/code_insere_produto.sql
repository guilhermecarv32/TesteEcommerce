INSERT INTO produtos (url, seletor_css, preco_alvo)
VALUES (
  '{{ $json["URL do Produto"] }}',
  '{{ $json["Seletor CSS"] }}',
  {{ $json["Preço Alvo"] }}
)
RETURNING *;