import { client, twilioPhoneNumber } from './Config/twilioConfig.js'; 

const testNumber = '+52 646 113 7227'; 
//solo se puede este numero, si se quiere mandar un mensaje a otro numero 
//debe de ser registrado en twilio

client.messages.create({
  body: '✅ ¡Prueba exitosa!',
  from: twilioPhoneNumber,
  to: testNumber
})
.then(message => console.log(`
  🎉 ¡SMS enviado con éxito!
  SID: ${message.sid}
  Destino: ${testNumber}
`))
.catch(error => console.error(`
  Error al enviar:
  ${error.message}
  Verifica: 
  1. Tus credenciales en twilioConfig.js
  2. Que el número destino esté verificado
  3. Saldo en tu cuenta Twilio
`));


