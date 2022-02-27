# USERS

**Requisitos funcionais**

- [] Deve ser possível criar um usuário;
- [] Deve ser possível recuperar a senha;
- [] Deve ser possível escolher em qual loja se conectar;
- [] Deve ser possível alterar o cargo, nome, senha;

**Requisitos não funcionais**

- [] Usuários desativados não podem efetuar login no site

**Regra de negócio**

- [] Não deve ser possível CPD, coordenador ou outro cargo além de gerência criar metas ou pedidos
- [] Não deve ser possível coordenador ou outro cargo além do CPD editar notas, produtos ou conferência do CPD
- [] Não deve ser possível cadastrar um usuário com númeração já existente
- [] Não deve ser possível fazer login usuários desativados

---

# MANAGEMENT

**Requisitos funcionais**

- []

**Requisitos não funcionais**

- []

**Regra de negócio**

- []

---

# CPD

**Requisitos funcionais**

- _Notas_
- [] Deve ser possível **lançar entradas de notas por planilha** (.xlsx);
- [] Deve ser possível **inserir novas notas por planilha** (.xlsx);
- [] Deve ser possível **cadastrar novas notas**;
- [] Deve ser possível **listar todas as notas fiscais**;
- [] Deve ser possível **consultar por**: **nota fiscal e fornecedor**;
- [] Deve ser possível fazer **edições nos seguintes campos** de cada nota fiscal: **Recebimento, Etiqueta, Chegou, Entrada, Frete, Situação, Observações**;
- _Produtos_
- [] Deve ser possível **capturar produtos** das notas fiscais por planilha (.csv) ou (.xlsx);
- [] Deve ser possível **listar** todos os produtos por nota fiscal;
- [] Deve ser possível **conferir o cadastro** de todos os itens de uma nota fiscal;
- _Pedidos_
- [] Deve ser possível **inserir pedidos a parte por planilha** (.xlsx);
- _Conferência_
- [] Deve ser possível **inserir pedidos na hora de fazer uma conferência**;
- [] Deve ser possível **remover a conferência de uma nota fiscal** do banco de dados;
- [] Deve ser possível **remover uma conferência** do banco de dados;
- _Faltantes_
- [] Deve ser possível **inserir manualmente produtos em faltantes**;
- [] Deve ser possível **remover as faltantes de uma nota fiscal** do banco de dados;
- [] Deve ser possível **remover as faltantes** do banco de dados;
- _Divergências_
- [] Deve ser possível **listar divergências junto com listagem dos produtos** na mesma linha;
- _Relatórios_
- [] Deve ser possível gerar um **relatório de todas as notas fiscais**;
- [] Deve ser possível gerar um **relatório de todos os produtos** de uma nota fiscal;
- [] Deve ser possível gerar um **relatório de todas as divergências** de uma nota fiscal;

**Requisitos não funcionais**

- _Notas_
- _Produtos_
- _Pedidos_
- [] Os pedidos com **mais de três meses** deverão ser **excluídos** do banco de dados;
- _Conferência_
- [] Conferência dos **produtos por código de barras**, comparando quantidade de cada código com quantidade da nota fiscal;
- [] Conferência dos **produtos por nome** caso o código não seja encontrado, comparando quantidade de cada código com quantidade da nota fiscal;
- [] Produtos **a mais** devem ser consultados no banco de dados na tabela de **faltantes e abatidos**;
- [] Produtos **a mais** devem ser classificados como "divergência" caso não seja encontrado em nenhuma das opções acima;
- [] Produtos **a menos** devem ser classificados como "faltante" caso não seja encontrado na nota fiscal;
- [] Produtos **não encontrados** no pedido devem ser classificaos como "sem pedido";
- _Faltantes_
- _Divergências_
- _Relatórios_

**Regra de negócio**

- _Notas_
- [] Não deve ser possível **lançar entradas de númerações que ja estejam preenchidas**;
- [] Não deve ser possível **inserir novas notas com mesma númeração e mesmo fornecedor** através de planilha;
- [] Não deve ser possível **cadastrar notas com mesma númeração e mesmo fornecedor** através se inserção manual;
- [] Não deve ser possível **outros cargos além de: ADMIN, GERENTE, COORDENADOR E CPD**. Inserir novas notas;
- _Produtos_
- [] Não deve ser possível **capturar e inserir produtos de notas fiscais** que ja estejam salvos no banco de dados;
- [] Não deve ser possível **outros cargos além de: ADMIN, GERENTE, COORDENADOR E CPD**. Inserir novos produtos;
- _Pedidos_
- [] Não deve ser possível **inserir pedidos com mais de três meses**;
- [] Não deve ser possível **inserir pedidos de editoras que já foram inseridos**;
- [] Não deve ser possível **outros cargos além de: ADMIN, GERENTE, COORDENADOR E CPD**. Inserir novos pedidos;
- _Conferência_
- []
- [] Não deve ser possível **outros cargos além de: ADMIN, GERENTE, COORDENADOR E CPD**. Fazer conferênia;
- _Faltantes_
- []
- [] Não deve ser possível **outros cargos além de: ADMIN, GERENTE, COORDENADOR E CPD**. Inserir faltantes;
- _Divergências_
- []
- _Relatórios_
- []

---

# BOOKSTORE

**Requisitos funcionais**

- []

**Requisitos não funcionais**

- []

**Regra de negócio**

- []

---

```JS
const dates = {
  date_one: { year: "2022", month: "02", day: "01" },
  date_two: { year: "2022", month: "02", day: "02" }
}

async function filterByDate(field, { date_one, date_two }) {
  const data = await database("notes")
    .where(database.raw(`${field} like '${date_one.year}${ !date_one.month ? "" : `-${date_one.month}` }${ !date_one.day ? "" : `-${date_one.day}` }%'`))
    .orWhere(database.raw(`${field} like '${date_two.year}${ !date_two.month ? "" : `-${date_two.month}` }${ !date_two.day ? "" : `-${date_two.day}` }%'`))
    .orderBy(field, "DESC")

  return JSON.stringify(data, null, 2)
}

console.log(await filterByDate("issue", dates))
```

# AUTORES

**Requisitos funcionais**

- [] Listagem dos autores
  - [] CPF; NOME; DATA;
- [] Listagem dos títulos relacionados a cada autor
  **CADASTRO DO AUTOR SEPARADO DOS TITULOS**
  - [] CODIGO; NOME; QNT ESTOQUE; QNT CONSIG; QNT ACERTADA; QNT DEVOLVIDA;
- [] Listagem das notas relacionadas a cada título
  - [] NF; NATUREZA; QNT; DATA;

**Requisitos não funcionais**

- []

**Regra de negócio**

- []
