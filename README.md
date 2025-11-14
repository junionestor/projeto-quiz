# ⚡ Energia em Jogo!

### 🎓 Universidade FUMEC
**Curso:** Sistemas de Informação<br/>
**Disciplina:** Projeto Integrador II - Meio Ambiente e Sustentabilidade<br/>
**Professor:** Renata Felipe Silvino<br/>
**Ano:** 2025<br/>
**Alunos:** <br/>
1. Ana Paula Alves Ritschel<br/>
2. Charles Thales Santos<br/>
3. Gedielson Jose Sanches<br/>
4. Nestor Júnio Almeida Rodrigues<br/>
5. Thiago André Silva Amorim<br/>
6. Winnie Dandara Rocha Ferreira


---

## 🌐 Acesse o Jogo Online

👉 **Jogue agora:** [https://energia-em-jogo.netlify.app/](https://energia-em-jogo.netlify.app/)

---

## 🧩 Sobre o Projeto

**Energia em Jogo!** é um quiz interativo desenvolvido como parte de um projeto acadêmico da **Universidade FUMEC**, com o objetivo de **promover a conscientização sobre o uso racional de energia elétrica** de forma lúdica e educativa.

O jogador responde a perguntas sobre consumo, sustentabilidade e boas práticas de economia de energia — tudo de maneira dinâmica, divertida e com feedback visual imediato!

---

## 🎯 Objetivos do Projeto

- Incentivar o aprendizado sobre **eficiência energética**.  
- Demonstrar a aplicação de **tecnologias web interativas**.  
- Desenvolver habilidades práticas em **HTML, CSS e JavaScript**.  
- Criar uma experiência **educativa e envolvente** para o usuário.  

---

## 🕹️ Como Jogar

1. Acesse o jogo pelo link: [https://energia-em-jogo.netlify.app/](https://energia-em-jogo.netlify.app/)  
2. Leia atentamente cada pergunta e selecione a alternativa correta.  
3. Receba feedback visual (animações de acerto ou erro).  
4. Acompanhe seu progresso e tente acertar todas as 12 perguntas!  
5. Ao final, veja sua pontuação e tente bater seu recorde!

---

## 💻 Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|------------|
| **HTML5** | Estrutura do jogo |
| **CSS3** | Estilização e design responsivo |
| **JavaScript (ES6)** | Lógica do quiz, controle de pontuação e interatividade |
| **Node.js** | Backend para armazenamento de pontuações |
| **Express** | Framework web para API REST |
| **DOM Manipulation** | Atualização dinâmica do conteúdo da página |

---

## 📁 Estrutura do Projeto

```
projeto-quiz/
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos CSS
├── app.js              # Lógica do quiz (frontend)
├── questions.js        # Dados das perguntas
├── server.js           # Servidor Node.js (backend)
├── package.json        # Dependências do projeto
├── scores.json         # Arquivo de armazenamento de pontuações (gerado automaticamente)
└── README.md           # Documentação
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js instalado (versão 14 ou superior)
- npm (geralmente vem com Node.js)

### Passos para instalação e execução:

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor backend:**
   ```bash
   npm start
   ```
   O servidor estará rodando em `http://localhost:3000`

3. **Abrir o jogo:**
   - Abra o arquivo `index.html` no navegador, ou
   - Acesse `http://localhost:3000` no navegador

---

## 🧠 Funcionalidades

- Perguntas aleatórias a cada rodada.  
- Sistema de pontuação automática baseado em rapidez e acerto.  
- Barra de progresso visual (ex: "Pergunta 5 de 12").  
- Animações de **acerto** ✅ e **erro** ❌.  
- Design responsivo para uso em desktop e dispositivos móveis.  
- **Ranking global** armazenado no backend.  
- **API REST** para gerenciamento de pontuações.  

---

## 🔌 API Endpoints

O backend fornece os seguintes endpoints:

- `GET /api/scores` - Retorna o ranking global de todos os participantes
- `POST /api/scores` - Salva uma nova pontuação
  ```json
  {
    "name": "Nome do Jogador",
    "score": 15000,
    "time": 120,
    "date": "2025-01-20T10:30:00.000Z"
  }
  ```
- `DELETE /api/scores` - Limpa todo o ranking

---

## 📝 Notas de Desenvolvimento

- As pontuações são armazenadas em `scores.json` no servidor
- O ranking é ordenado por: maior pontuação primeiro, em caso de empate, menor tempo ganha
- O frontend se comunica com o backend através de requisições HTTP (fetch API)
- CORS está habilitado para permitir requisições do frontend

---
