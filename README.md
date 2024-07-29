# Framework - Power Rangers da Shopee

## Descrição
Este projeto é um framework desenvolvido para a realização de testes em APIs externas em um ambiente de produção. O objetivo principal é garantir a integridade e a funcionalidade das APIs da Wrike, proporcionando uma ferramenta robusta e eficiente para a validação contínua dos serviços.

## Estrutura e Arquitetura

#### Diagrama de Arquitetura Three-Lyered
- Test: Contém todos os casos de teste para a API, garantindo que cada funcionalidade seja testada de acordo com os requisitos especificados.
- Business: Lida diretamente com a API externa da Wrike, atuando como uma ponte entre o núcleo do sistema e as APIs externas.
- Core: Esta é a camada central do sistema, onde reside a lógica de negócio. Nesta camada, os dados recebidos da camada de apresentação são processados, a lógica de negócio é aplicada, e, se necessário, dados adicionais são solicitados da camada de acesso a dados. O objetivo é manter a lógica de negócio independente das outras camadas para permitir sua reutilização e testes isolados.

#### Estrutura de Pastas
- logs: Contém os logs gerados automaticamente durante a execução dos testes.
- tests: Armazena os casos de teste necessários implementados.
- utils: Este diretório representa o core do sistema, contendo as utilidades e funções centrais.

## Configuração do Ambiente
Para configurar o ambiente de desenvolvimento, siga os passos abaixo:

- Instale as dependências do projeto:

```bash
npm install
```

- Configure o arquivo .env com os dados necessários, como a URL da API, versão e access_token.

- Para executar os testes, utilize o comando:

```bash
npm test
```

#### Arquivos de Configuração
- .env: Contém as variáveis de ambiente necessárias para a configuração do projeto.
- jest.config.js: Configurações específicas do Jest para a execução dos testes.
- package.json: Contém as dependências e scripts necessários para o projeto.

## Instalação
O npm (Node Package Manager) é utilizado como o gerenciador de pacotes do projeto. Para instalar todas as dependências, execute o comando:

```bash
npm install
```

## Uso
Os testes podem ser executados através do comando de teste configurado no package.json. Para rodar os testes, utilize:

```bash
npm test
```

## Convenções de Código

#### Lint
O linting é implementado para adicionar uma camada extra de proteção ao projeto, garantindo que o código siga padrões e boas práticas.

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```


1. **env**: Define os ambientes que o código irá rodar. Isso ajuda o ESLint a reconhecer as variáveis globais desses ambientes.
   - "browser": true: Reconhece variáveis globais do navegador, como window e document.
   - "es2021": true: Habilita suporte para as funcionalidades do ECMAScript 2021.
   - "node": true: Reconhece variáveis globais do Node.js, como module e require.
<br>   

2. **extends**: Define as regras base que o ESLint deve usar. "eslint:recommended" é um conjunto de regras recomendadas pelo ESLint.
<br>

3. **parserOptions**: Define a versão do ECMAScript e o tipo de módulo.
   - "ecmaVersion": 12: Especifica a versão do ECMAScript a ser usada. A versão 12 corresponde ao ECMAScript 2021.
   - "sourceType": "module": Define que o código usa módulos ES6.
<br>

4. **rules**: Define regras específicas e seus níveis de severidade.
   - "indent": ["error", 2]: Enforce indentação de 2 espaços.
   - "linebreak-style": ["error", "unix"]: Enforce estilo de quebra de linha Unix (LF).
   - "quotes": ["error", "single"]: Enforce o uso de aspas simples para strings.
   - "semi": ["error", "always"]: Enforce o uso de ponto e vírgula no final das instruções.
<br>

#### Pull Requests
O processo de pull request é liberado por Diogines, garantindo que todas as alterações sejam revisadas antes de serem integradas ao código base.

## Implementações Técnicas

#### Singleton Design Pattern
Implementado na classe RequestManager para garantir que uma única instância gerencie todas as requisições.
<br>

#### Logger
Utilizado para registrar logs detalhados das operações, gerando arquivos de log automaticamente.
<br>

## Testes

#### Hooks de Pré/Pós-Condições

1. **Objetivo do Hook beforeAll:**
    - O hook beforeAll é usado para executar uma ação antes de todos os testes no bloco de testes serem executados. No caso desse código, ele é usado para fazer uma chamada API antes de começar os testes, e armazenar os dados da resposta para uso posterior.

2. **Estrutura da Chamada API:**
    - await requestManager.send(...):** Aqui, uma solicitação GET é enviada para a API externa. Os parâmetros usados são:
        - Método: "get"
        - URL: Baseada em process.env.BASE_URL e incluindo um parâmetro de query userIsMember=true.
        - Corpo da Requisição: {} (vazio, pois é uma requisição GET que não tem corpo).
        - Cabeçalhos: Inclui um cabeçalho de autorização com um token de acesso (Bearer ${process.env.ACCESS_TOKEN}), que é necessário para autenticação.

3. Tratamento de Resposta:
    - Resposta Bem-Sucedida: Se a requisição for bem-sucedida, o status, tipo de conteúdo e dados da resposta são armazenados em variáveis (responseStatus, responseContentType, responseData).
    - Tratamento de Erros: Se a requisição falhar, o código verifica se o erro tem uma resposta associada (error.response). Nesse caso, os detalhes da resposta de erro são armazenados nas mesmas variáveis. Se não houver resposta de erro, apenas o erro é registrado no console.

##### Por Que Usar Esse Hook

1. **Preparação dos Dados:** O beforeAll é útil para preparar dados e configurar o estado antes da execução dos testes. Nesse caso, ele garante que as informações necessárias da API (como o status e os dados da resposta) estejam disponíveis antes que qualquer teste seja executado.

2. **Consistência entre Testes:** Ao realizar a chamada API uma vez antes de todos os testes, você garante que todos os testes têm acesso aos mesmos dados e estado da API. Isso ajuda a manter a consistência e evita a necessidade de fazer chamadas repetidas durante cada teste.

3. **Manuseio de Erros:** O bloco try-catch assegura que erros na chamada API sejam tratados adequadamente e que informações úteis sejam registradas. Isso ajuda na depuração caso algo dê errado durante a configuração do ambiente de teste.

#### Refatoração de Testes
Os testes existentes foram atualizados para seguir as novas implementações e convenções estabelecidas.

#### Novos Testes
Foram adicionados novos testes, totalizando 20 para cada grupo, conforme necessário.

## Documentação Técnica

#### Diagrama de Classes
O Diagrama de Classes fornece uma visualização detalhada da estrutura de classes do framework, oferecendo uma representação gráfica das principais entidades e suas interações. Este diagrama ilustra:

- **Classes e Objetos:** Mostra as classes principais do framework e os objetos que representam.

- **Relacionamentos:** Inclui associações, heranças e composições entre classes, destacando como elas se comunicam e colaboram.

- **Atributos e Métodos:** Detalha os atributos e métodos de cada classe, fornecendo uma visão clara das responsabilidades e funcionalidades de cada componente.

- **Visibilidade e Modificadores:** Indica a visibilidade (público, privado, protegido) e os modificadores de acesso dos métodos e atributos, ajudando a entender o encapsulamento e a abstração.

Este diagrama é uma ferramenta crucial para desenvolvedores e mantenedores do framework, facilitando a compreensão da estrutura do código e ajudando na navegação e na extensão das funcionalidades.

#### Documentação Completa
A Documentação Completa abrange todas as informações necessárias para a compreensão e uso efetivo do framework. Ela inclui:

**Visão Geral do Framework:** Descrição do propósito do framework, suas principais características e benefícios, e como ele se integra no contexto de testes de API externa.

**Configuração e Instalação:** Orientações detalhadas sobre como configurar o ambiente de desenvolvimento e instalar o framework, incluindo requisitos de sistema, instalação de dependências e configuração de variáveis de ambiente.

**Guia de Uso:** Instruções sobre como utilizar o framework para realizar testes, incluindo exemplos de código e explicações sobre os principais comandos e opções.

**Arquitetura do Framework:** Explicação detalhada das camadas e componentes do framework, como a camada de Teste, Business e Core, e como eles interagem para fornecer a funcionalidade desejada.

**Convenções e Boas Práticas:** Diretrizes sobre as convenções de código seguidas pelo framework, práticas recomendadas para escrita de código e como contribuir para o projeto.

Esta documentação é essencial para garantir que todos os usuários do framework possam utilizá-lo de forma eficaz, entender sua estrutura e aproveitar ao máximo suas funcionalidades.

## Contribuição
O desenvolvimento deste framework contou com a participação ativa de diversos membros da equipe, cujas contribuições foram essenciais para o sucesso do projeto. Os principais colaboradores foram: Arthur Calciolari, Bruna Andrade, Diogines Augusto, Edenilson Junior, Elisa Drumond

Cada membro da equipe desempenhou um papel crucial em diferentes aspectos do projeto, desde o gerenciamento de tarefas até a implementação de funcionalidades. A equipe utilizou o Jira para gerenciar e acompanhar o progresso das tarefas, garantindo uma organização eficiente e a conclusão de metas no prazo. Além disso, os membros participaram ativamente das tutorias em aula, colaborando para resolver problemas e refinar o framework. O trabalho conjunto e a dedicação de cada membro foram fundamentais para alcançar os objetivos do projeto.