var crypto = require('crypto')
var keypair = require('keypair')

var keys = keypair()

var alice_public = keys.public
var alice_private = keys.private

var message = Buffer('This needs to stay secret.')
var encrypted_message = crypto.publicEncrypt(alice_public, message)
var decrypted_message = crypto.privateDecrypt(alice_private, encrypted_message)

console.log(message.toString(), decrypted_message.toString())
