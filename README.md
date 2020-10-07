# Análise de Repositórios

### GitHub API (v4) | GraphQL

#### Comparativo entre os 100 repositórios Java e Python mais populares.

Os dados são coletados da API do GitHub, em seguida são processados (para formatações e cálculos) e finalmente salvos em um arquivo `.csv` na pasta `files`.

- Há um arquivo `repos.csv` dentro da pasta com os resultados da mineração.

Em um segundo momento, a lista de repositórios é carregada do arquivo anterior e é realizada uma análise sobre cada repositório. São coletados mais dados da API sobre os repositórios, eles são copiados localmente para que uma ferramenta colete métricas do código, a cópia do repositório é excluída e todos os dados coletados são processados e salvos em um arquivo `analysis.csv`.

- Há um arquivo `analysis.csv` dentro da pasta `files` com os resultados das análises.

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

#### Para iniciar a mineração e análise dos repositórios utilize o comando:

```bash
$ yarn start
```

ou

```bash
$ npm start
```

### Execução manual

Executando separadamente os comandos de mineração (mine) e análise (analyze) é possível passar alguns parâmetros para cada um deles.

#### Obrigatórios:

- Nome da linguagem primária dos repositórios que serão coletados (name) `only mine`
- Quantidade de repositórios que serão coletados pela linguagem (amount) `only mine`

#### Opcionais:

- Nome do arquivo `.csv` que será criado (filename) `both`
- Quantidade de registros por página (limit) `only mine`
- Nome do arquivo que contém a lista de repositórios a serem analisados (storage) `only analyze`
- Linha da lista de onde as análises irão começar (initial) `only analyze`

#### Valores padrões:

```js
name = 'Java' && 'Python'
amount = 100

filename = 'repos' && 'analysis'
limit = 100
storage = 'repos'
initial = 2
```
