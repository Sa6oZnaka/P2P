let Peer = require('simple-peer')
let peer1 = new Peer({ initiator: location.hash === '#1', trickle: false })

document.getElementById('status').textContent = 'NOT CONNCECTED'

peer1.on('error', err => console.log('error', err))

peer1.on('signal', data => {
  console.log('SIGNAL', JSON.stringify(data))
  document.querySelector('#outgoing').textContent = JSON.stringify(data)
})

document.querySelector('form').addEventListener('submit', ev => {
  ev.preventDefault()
  peer1.signal(JSON.parse(document.querySelector('#incoming').value))
})

peer1.on('connect', () => {
  console.log('CONNECT')
  document.getElementById('status').textContent = 'CONNCECTED'
  peer1.send('whatever' + Math.random())
})

peer1.on('data', data => {
  console.log('data: ' + data)
  document.getElementById('messages').textContent += '[PEER1]' + data + '\n';
})


document.getElementById('send').addEventListener('click', function(){
	let message = document.getElementById('message').value;
	peer1.send(message);

	document.getElementById('messages').textContent += '[ME]' + message + '\n';
});