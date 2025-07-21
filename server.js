const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const VERIFY_TOKEN = "ngbr";

app.use(bodyParser.json());

// Rota do webhook
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verificado com sucesso!');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.post('/webhook', (req, res) => {
  const body = req.body;

  console.log('Mensagem recebida:', JSON.stringify(body, null, 2));

  // Aqui você pode adicionar lógica para tratar a mensagem recebida

  res.sendStatus(200);
});

// Inicia o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
