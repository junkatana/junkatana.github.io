# Como publicar e atualizar o site

O site fica em `https://junkatana.github.io` quando o repositório se chama
exatamente **junkatana.github.io**.

## Publicar pela primeira vez

1. Entre no GitHub com a conta **junkatana** e abra https://github.com/new
2. Em *Repository name* escreva `junkatana.github.io`, deixe **Public** e
   clique em **Create repository** (sem marcar README).
3. No terminal, dentro desta pasta:

   ```bash
   cd ~/Games/junkatana.github.io
   git init -b main
   git add .
   git commit -m "Primeira versão do site"
   git remote add origin https://github.com/junkatana/junkatana.github.io.git
   git push -u origin main
   ```

   Na hora do push o GitHub pede login. Use `gh auth login` antes (escolha a
   conta junkatana) ou crie um token em https://github.com/settings/tokens e
   cole no lugar da senha.
4. No repositório, vá em **Settings → Pages**, em *Source* escolha
   **Deploy from a branch**, branch **main**, pasta **/ (root)** e salve.
5. Em 1–2 minutos o site aparece em https://junkatana.github.io

## Atualizar

- **Projetos:** tudo fica em `projetos.js`. Cada bloco `{ ... }` vira um cartão na
  página inicial e uma página própria em `projeto.html?id=<id>`.
- **Duas línguas:** todo texto é escrito assim: `{ pt: "Olá", en: "Hello" }`. Quem está no Brasil (pelo fuso horário) vê em português; o resto, em inglês.
- **História:** o texto da página `historia.html` fica em `historia.js`.
  Os textos fixos do site (menus, botões) ficam em `comum.js`.
- **Imagens:** coloque em `img/<projeto>/` e adicione na `galeria`
  (`{ img: "img/...", legenda: { pt: "...", en: "..." } }`). O campo `capa` é a
  imagem do cartão e do topo da página.
- **Vídeo:** campo `video` com um `.mp4` pequeno (até uns 10 MB).
- **Downloads:** no repositório do projeto, crie uma *Release* e anexe o patch
  `.ips`/`.bps`; depois cole o link em `links`:
  `{ texto: { pt: "Baixar patch", en: "Download patch" }, url: "https://..." }`

Depois de editar:

```bash
git add .
git commit -m "Atualiza projetos"
git push
```

Para ver antes de publicar, abra `index.html` no navegador.

## Importante

Não publique ROMs (são protegidas por direitos autorais e o GitHub pode
remover o repositório). Publique só os patches.
