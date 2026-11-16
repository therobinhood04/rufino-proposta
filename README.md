# Rufino · Proposta comercial interativa

Site estático: não precisa de build. A Vercel publica estes arquivos como estão.

## Publicar
1. Crie um repositório vazio no GitHub.
2. No computador, pelo Chrome: **Add file → Upload files** e arraste **todos os itens desta pasta**
   (todos os arquivos ficam numa pasta só).
3. Na Vercel: **Add New → Project**, importe o repositório, Framework Preset **Other**, sem mudar mais nada, **Deploy**.

## Links
- Proposta de uma barbearia: `https://SEU-ENDERECO.vercel.app/?proposta=rocha-barbeiro`
- Versão geral: `https://SEU-ENDERECO.vercel.app/`

## Onde mudar cada coisa
- WhatsApp, cupom e validade, prazo, preços e planos, endereço do site modelo: `rufino.js`
- Barbearias (58 cadastradas): `propostas.js`
- Demonstração de agenda (serviços e equipe de exemplo): `tenant.js`

## Seção 4 (site modelo)
Mostra https://rufino-barber.vercel.app/. No `vercel.json` do projeto rufino-barber, o `frame-ancestors`
precisa incluir o endereço desta proposta, e o cabeçalho `X-Frame-Options` precisa ser removido.
