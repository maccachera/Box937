# PersonalCar — landing page

Site estático (HTML, CSS e JavaScript, sem dependências). Basta hospedar a pasta.

```
personalcar/
├── index.html                    página principal
├── politica-de-privacidade.html  documento linkado no rodapé
├── css/styles.css
├── js/main.js                    bloco CONFIG no topo do arquivo
└── assets/img/                   fotos reais (criar)
```

## 1. Dados do negócio

Abra `js/main.js` e edite o objeto `CONFIG` no topo. Ele alimenta todos os
links de WhatsApp, o endereço, o horário, o mapa, a rota e o Instagram.

```js
whatsapp: "5511987654321",   // só números, com país (55) e DDD
whatsappTexto: "(11) 98765-4321",
telefone: "(11) 3333-4444",
instagram: "https://instagram.com/personalcar",
endereco: "Rua Exemplo, 123 — Centro, Cidade/UF",
horarios: "Seg a Sex, 8h às 18h · Sáb, 8h às 12h",
enderecoMapa: "Rua Exemplo, 123, Cidade, UF"
```

## 2. Textos com marcações

Procure por `[` no `index.html` e em `politica-de-privacidade.html` para achar
tudo o que ainda é espaço reservado:

- `[CIDADE]` — título, meta description, palavras-chave, JSON-LD e rodapé.
- `[NOME]`, `[SERVIÇO]` — depoimentos. Use apenas avaliações reais recebidas.
- `[Insira aqui as formas de pagamento…]` — última pergunta do FAQ.
- `[LINK DO PERFIL NO GOOGLE]` — botão da seção de avaliações.

## 3. Fotos

Crie a pasta `assets/img/` e substitua os blocos tracejados:

| Onde | O que entra |
|---|---|
| Hero | Carro sendo polido, pintado ou restaurado — 1600×1200 |
| Cards de serviço | Uma foto por serviço — 800×500 |
| Sobre | Oficina, equipe ou profissional trabalhando |
| CTA de destaque | Detalhe automotivo para fundo — 1920×1080 |

Exporte em JPG ou WebP com até ~250 KB. As trocas do hero, dos serviços, do
"sobre" e do CTA são feitas direto no HTML (troque a `div.ph` por uma `<img>`
com `alt` descritivo e `loading="lazy"`).

Para a galeria antes/depois, preencha os caminhos em `CONFIG.galeria`:

```js
{ titulo: "Correção de amassado na lateral", categoria: "lanternagem",
  antes: "assets/img/amassado-antes.jpg", depois: "assets/img/amassado-depois.jpg" }
```

Categorias válidas: `lanternagem`, `pintura`, `polimento`, `estetica`, `lavagem`.
Use o mesmo enquadramento nas duas fotos — é o que faz a comparação funcionar.

## 4. Antes de publicar

- [ ] `CONFIG` preenchido e um teste real de envio pelo WhatsApp.
- [ ] Nenhum `[` sobrando no HTML.
- [ ] Trocar a URL `https://www.personalcar.com.br/` (canonical e Open Graph) pelo domínio real.
- [ ] Gerar `assets/img/og-personalcar.jpg` (1200×630) para o compartilhamento em redes.
- [ ] Cadastrar o Google Meu Negócio e ligar o botão "Ver perfil no Google".

## Rodar localmente

```bash
python -m http.server 5175 --directory personalcar
```
