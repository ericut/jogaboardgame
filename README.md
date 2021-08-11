## Joga BG <3 Mobile friendly

![Joga BG <3](https://github.com/ericut/jogaboardgame/blob/main/.doc/imgs/00-logo.svg)

https://www.jogabg.com.br/

Com esta aplicação é possível criar o famoso desafio 10x10 no universo dos jogos de tabuleiro. O desafio consiste em selecionar 10 jogos e jogar 10 partidas de cada um deles.
Além disso é possivel criar e organizar placares (torneios/campeonatos) de sessões de jogos, com gerenciamento de jogadores e partidas, indicando o jogador vitorioso daquela partida.

| ![Tela Desafio10x10](https://github.com/ericut/jogaboardgame/blob/main/.doc/imgs/01-tela-inicial.png) | ![Tela Adicionar Jogo Desafio10x10](https://github.com/ericut/jogaboardgame/blob/main/.doc/imgs/02-tela-adicao.png) | ![Tela Configurações do Desafio10x10](https://github.com/ericut/jogaboardgame/blob/main/.doc/imgs/03-tela-configuracoes.png) |
| ![Tela Placar](https://github.com/ericut/jogaboardgame/blob/main/.doc/imgs/04-tela-placares.png) | ![Tela Partidas do Placar Ativo](https://github.com/ericut/jogaboardgame/blob/main/.doc/imgs/05-tela-partidas.png) | ![Tela Adicionar Partida](https://github.com/ericut/jogaboardgame/blob/main/.doc/imgs/06-tela-adicionarpartida.png) |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |

### Recursos

#### Página Desafio10x10

- Possibilidade de configurar o desafio para qualquer quantidade de jogos e partidas entre 1 a 10.
- Cadastro do jogo com categorias para o usuário ter uma visão geral dos tipos de jogos selecionados.
- Andamento do desafio com controles de adição de partida e subtração para eventual correção.

#### Página Placar

- Gerenciamento de placares, campeonatos ou torneios. Ativando e finalizando os controles do placar.
- Cadastro de placar com o nome do jogo e jogadores participantes.
- Gerenciamento de partidas do placar ativo.
- Adição e remoção de partidas indicando um jogador vitorioso.

#### Global

- Ordenação e paginação das tabelas
- Tema escuro e claro conforme o usuário preferir.

### Termos de uso

Esta aplicação utiliza "localStorage" do navegador para armezenar os dados cadastrados, estes dados podem ser perdidos caso seja feito uma limpeza no cache ou no armazenamento local do navegador utilizado.
Pode ser utilizada no celular normalmente, pois os navegadores mobile tem "localStorage" implementados.

### Ficha Técnica

- TypeScript
- NextJS
- ChakraUI
- Context API

### Implementações previstas para o projeto

#### Página: Desafio 10x10

- [✔] Controle de estado por Context API
- [❓] Selecionar período para o desafio, com um contador
- [❓] Adicionar dados referente à partida: jogadores e a data [em avaliação]

#### Página: Placar

- [✔] Quadro de ranking de partidas
- [✔] Controle da sessão de partidas
- [✔] Quadro de líderes (jogos vencidos, perdidos, total de jogos jogados)

#### Página: Calculadora Pontuações [em avaliação]

- [❓] Quadro de pontuação de partida, com calculadora simplificada para auxiliar na contagem de pontuação

#### Global

- [✔] Ordenação de tabela
- [✔] Paginação de tabela
- [❓] Seletor de temas

### Link do Projeto

[Versão Retail] https://www.jogabg.com.br/

[Versão Teste] https://jogabg.vercel.app/
