var crypto = require('crypto')

var alice = crypto.getDiffieHellman('modp14')  // 2048 bit
var bob = crypto.getDiffieHellman('modp14')

alice.generateKeys()
bob.generateKeys()

var message = Buffer('This needs to stay secret.')

var shared_secret = bob.computeSecret(alice.getPublicKey())
// var shared_secret = alice.computeSecret(bob.getPublicKey())

var password = crypto.createHash('sha256').update(shared_secret).digest()

// encrypt
var cipher = crypto.createCipher('aes256', password)
var cipher_text = Buffer.concat([cipher.update(message), cipher.final()])

// decrypt
var decipher = crypto.createDecipher('aes256', password)
var plain_text = Buffer.concat([decipher.update(cipher_text), decipher.final()])

console.log(message.toString(), plain_text.toString())
