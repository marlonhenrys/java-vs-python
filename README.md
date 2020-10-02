# Análise de Repositórios

### GitHub API (v4) | GraphQL

Os dados são coletados da API do GitHub, em seguida são processados (para formatações e cálculos) e finalmente salvos em um arquivo `.csv` na pasta `files`.

Há um arquivo `repos.csv` dentro da pasta com os resultados da mineração.

## Instruções

#### Para baixar as dependências do projeto utilize o comando:

```bash
$ yarn
```

ou

```bash
$ npm install
```

#### Crie um arquivo `.env` na raiz do projeto e insira um valor para a variável `ACCESS_TOKEN`.

```bash
ACCESS_TOKEN=abc123token456example
```

> **OBS:** Este deve ser o seu token de acesso pessoal gerado pelo GitHub nas configurações de desenvolvedor.

#### Para iniciar a mineração de dados utilize o comando:

```bash
$ yarn start
```

ou

```bash
$ npm start
```

#### São aceitos alguns parâmetros como:

- Quantidade de registros por página (limit)
- Nome do arquivo `.csv` que será criado (filename)

#### Os valores padrões de cada parâmetro são:

```js
limit = 10
filename = 'repos' || 'analysis'
```

> **OBS:** Estes parâmetros são opcionais.

## Exemplos

#### Esta é a saída do terminal para cada requisição realizada com sucesso:

```bash
Buscando dados... Progresso: 1/100

Formatando dados...
Salvando no arquivo...

Dados coletados.
```

#### Esta é a saída do terminal para cada requisição que falhar:

```bash
Buscando dados... Progresso: 1/100
Request failed with status code 502

Tentando novamente...
```
