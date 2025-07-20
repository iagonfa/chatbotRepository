// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil

client.on('message', async msg => {

    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola|queria|Queria|gostaria|Gostaria|agendar|quanto|Quanto)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(2000); //delay de 2 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá! '+ name.split(" ")[0] + 
            ' Sou um assistente virtual e estou aqui para te atender. Como posso ajudá-lo hoje? Por favor, digite uma das opções abaixo:'+
            '\n\n1 - Agendar um Horario'+
            '\n2 - Serviços & Preços'+
            '\n3 - Nossos Combos'+
            '\n4 - Endereço'
        ); //Primeira mensagem de texto 
        
    } 

    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await chat.sendStateTyping(); // Simulando Digitação
        await delay(2000);
        await client.sendMessage(msg.from, 
            '*Horario de funcionamento \n*'+
            '*SEG a SAB: 8hrs - 12hrs & 15hrs - 19hrs*'+
            '*DOM: 8hrs - 12hrs* \n\n'+
            'Tem preferência por algum horário ? Se sim, por favor me informe'
        );

        await delay(2000);
        await chat.sendStateTyping(); // Simulando Digitação
        await client.sendMessage(msg.from, 'Seu pedido de reserva foi enviado ao barbeiro, aguarde a confirmação do horário!');

    }

    if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000);
        await client.sendMessage(msg.from, MessageMedia.fromFilePath('SERVICO_CABELO.jpeg'));
        await client.sendMessage(msg.from, MessageMedia.fromFilePath('SERVICO_BARBA.jpeg'));
        await client.sendMessage(msg.from, MessageMedia.fromFilePath('SERVICO_PELE.jpeg'));

        await delay(2000);
        await chat.sendStateTyping(); // Simulando Digitação
        await client.sendMessage(msg.from, 'Posso te ajudar em algo mais ?');
    }

    if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000);
        await client.sendMessage(msg.from, MessageMedia.fromFilePath('COMBO_CORTE_E_BARBA.jpeg'));
        await client.sendMessage(msg.from, MessageMedia.fromFilePath('COMBO_PAI_E_FILHO.jpeg'));
        await client.sendMessage(msg.from, MessageMedia.fromFilePath('COMBO_SOBRANCELHA.jpeg'));

        await delay(2000);
        await chat.sendStateTyping(); // Simulando Digitação
        await client.sendMessage(msg.from, 'Posso te ajudar em algo mais ?');
    }

    if (msg.body !== null && msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await chat.sendStateTyping(); // Simulando Digitação
        await delay(1000);
        await client.sendMessage(msg.from, MessageMedia.fromFilePath('ENDERECO.jpeg'));

        await delay(2000); //delay de 2 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await client.sendMessage(msg.from, 'Posso te ajudar em algo mais ?');

    }
});