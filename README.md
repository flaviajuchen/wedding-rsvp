# Wedding RSVP — Jéssica & Matheus

Site de casamento com confirmação de presença e painel de organização, desenvolvido por **Flavia Juchen** como presente de casamento e projeto de portfólio.

[Visitar o site em produção](https://jessicaematheus.vercel.app/)

## Funcionalidades

- Layout responsivo em preto e branco, identidade visual do casal e galeria adaptada ao celular.
- Formulário de presença ou ausência e acompanhantes.
- Bloqueio de respostas repetidas com normalização de nomes: maiúsculas, acentos e espaços extras.
- Índice único no banco para impedir duplicatas em envios simultâneos.
- Painel de organização protegido por senha e exportação CSV.
- Localização do evento com acesso ao Google Maps.

## Tecnologias

TypeScript, React 19, CSS, Vinext, Vite, Cloudflare Workers, Cloudflare D1 (SQLite) e Drizzle ORM. A Vercel atua como entrada pública/reverse proxy para a aplicação em Cloudflare.

## Estrutura

| Diretório | Conteúdo |
| --- | --- |
| `app/` | Página principal, painel e rotas HTTP |
| `db/` | Conexão D1 e esquema Drizzle |
| `lib/rsvp-name.ts` | Normalização dos nomes |
| `drizzle/` | Migrações do banco |
| `public/` | Identidade visual e imagens demonstrativas |
| `worker/` | Entrada do Cloudflare Worker |
| `scripts/` | Build e desenvolvimento do projeto |

## Desenvolvimento local

Requisitos: Node.js 22.13+ e pnpm 11.

```sh
corepack enable
pnpm install
cp dev.vars.example .dev.vars
pnpm build
```

Defina uma senha própria em `.dev.vars`. No Windows, faça a cópia com `Copy-Item dev.vars.example .dev.vars` no PowerShell.

Após o build, aplique as migrações **somente ao banco local**, em ordem:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_mute_jean_grey.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_parallel_leopardon.sql
pnpm dev
```

Acesse a URL exibida pelo servidor. O painel fica em `/gestao`.

## Publicação e dados

O repositório é uma cópia pública do código, independente do site em produção. Ele não contém senhas, respostas de convidados, bancos de dados, credenciais nem o histórico da hospedagem original. As fotografias do casal foram substituídas por ilustrações SVG de demonstração; o site publicado mantém suas fotos.

O backend requer um Cloudflare Worker com binding D1 chamado `DB` e a variável secreta `ADMIN_PASSWORD`. Para uma instalação própria, configure seu banco e hospedagem e ajuste as origens permitidas em `app/api/rsvp/route.ts`. Este projeto não é um frontend estático independente: publicar apenas os arquivos na Vercel não cria o banco nem as rotas do Worker.

## Observações de funcionamento

A verificação considera o nome de quem responde ao formulário, e não o texto livre de acompanhantes. Pessoas com o mesmo nome precisam procurar a organização. Registros antigos não são excluídos automaticamente. O painel usa uma senha de organização, não contas individuais.

## Autoria

Projeto de portfólio de **Flavia Juchen**, desenvolvido com assistência de IA. Fotografias e identidade visual do casamento não possuem autorização de reutilização concedida por este repositório. Nenhuma licença de reutilização do código foi adicionada.
