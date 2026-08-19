-- Criação da tabela de monitoramento de preços
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    url TEXT NOT NULL,
    seletor_css VARCHAR(100) DEFAULT '.product-price',
    preco_atual NUMERIC(10, 2),
    preco_alvo NUMERIC(10, 2) NOT NULL,
    ultimo_preco NUMERIC(10, 2),
    data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    data_ultima_verificacao TIMESTAMP WITH TIME ZONE
);