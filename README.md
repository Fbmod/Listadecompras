<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

🛒 Lista de Compras Inteligente Bem-vindo ao projeto da Lista de Compras Inteligente! Esta é uma aplicação web progressiva (PWA) desenvolvida para simplificar a sua ida ao supermercado. Crie e gira múltiplas listas, adicione itens de forma inteligente e obtenha sugestões de receitas com base nos seus produtos.

Acesse à aplicação aqui: (https://listas-de-compras-alpha.vercel.app/)

![Imagem da aplicação de lista de compras]

✨ Funcionalidades Principais Autenticação de Utilizadores: Sistema de login e registo seguro para proteger as suas listas.

Múltiplas Listas: Crie, edite e apague quantas listas de compras precisar (Ex: "Compras da Semana", "Churrasco", "Aniversário").

Adição Inteligente de Itens:

Por Texto: Digite vários itens de uma vez (ex: "1kg de arroz e 1L de leite") e a IA irá separá-los e categorizá-los automaticamente.

Por Foto: Tire uma foto de uma lista de compras manuscrita ou de um talão e a IA irá extrair todos os itens para si.

Categorização Automática: Os itens são organizados por categorias (Hortifruti, Laticínios, Limpeza, etc.) para facilitar as compras no supermercado.

Sugestão de Receitas: Com base nos itens que tem na sua lista, a IA pode sugerir receitas criativas para o ajudar a planear as suas refeições.

Resumo da Lista: Veja um resumo rápido com o total de itens, quantos já foram comprados e a distribuição por categoria.

Design Responsivo e PWA: A aplicação é totalmente funcional em telemóveis, tablets e computadores, e pode ser "instalada" no ecrã principal do seu dispositivo para acesso rápido.

🛠️ Tecnologias Utilizadas Este projeto foi construído com as seguintes tecnologias:

Frontend: HTML5, CSS3 com Tailwind CSS e JavaScript (ES6+).

Base de Dados: Cloud Firestore do Firebase para armazenamento de dados em tempo real.

Autenticação: Firebase Authentication para a gestão de utilizadores.

Inteligência Artificial: API Google Gemini para o processamento de linguagem natural (texto e imagens).

Hospedagem: GitHub Pages.

🚀 Como Usar Acesse o link da aplicação: ](https://listas-de-compras-alpha.vercel.app/)

Crie uma conta gratuita ou faça login se já tiver uma.

Crie a sua primeira lista e comece a adicionar itens!

Este projeto foi desenvolvido com o apoio da IA Google.

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
