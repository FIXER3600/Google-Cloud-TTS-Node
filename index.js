
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');

// Crie um cliente TextToSpeech
const client = new textToSpeech.TextToSpeechClient(
  {
    keyFilename: 'serviceaccount.json',
  }
);

// Configure a solicitação de conversão
const request = {
  input: { text: 'Olá, tudo bem?' },
  voice: { languageCode: 'pt-BR', name: 'pt-BR-Neural2-C', ssmlGender: 'FEMALE' },
  audioConfig: { audioEncoding: 'MP3' },
};

// Faça a solicitação para a API de Text-to-Speech
client.synthesizeSpeech(request, (err, response) => {
  if (err) {
    console.error('Erro ao converter texto em fala:', err);
    return;
  }
  
  // Salve o áudio gerado em um arquivo
  fs.writeFileSync('output.mp3', response.audioContent, 'binary');
  console.log('Áudio salvo com sucesso em output.mp3');
});
