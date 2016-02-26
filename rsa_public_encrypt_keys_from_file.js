var crypto = require('crypto')
var fs = require('fs')

var alice_private = fs.readFileSync('./pkey.pem')
var alice_public = fs.readFileSync('./public.pem')

var message = Buffer('This needs to stay secret.')
var encrypted_message = crypto.publicEncrypt(alice_public, message)
var decrypted_message = crypto.privateDecrypt(alice_private, encrypted_message)

console.log(message.toString(), decrypted_message.toString())
