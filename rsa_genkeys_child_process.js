var crypto = require('crypto')
var cp = require('child_process')
var assert = require('assert')

var alice_public, alice_private

var privateKey, publicKey;
publicKey = '';

cp.exec('openssl genrsa 2048', function(err, stdout, stderr) {
  assert.ok(!err);
  privateKey = stdout;
  makepub = cp.spawn('openssl', ['rsa', '-pubout']);
  makepub.stdout.on('data', function(data) {
    publicKey += data;
  });
  makepub.on('exit', function(code) {
    assert.equal(code, 0);

    var alice_private = privateKey
    var alice_public = publicKey
    var message = Buffer('This needs to stay secret.')
    var encrypted_message = crypto.publicEncrypt(alice_public, message)
    var decrypted_message = crypto.privateDecrypt(alice_private, encrypted_message)

    console.log(message.toString(), decrypted_message.toString())
  });
  makepub.stdout.setEncoding('ascii');
  makepub.stdin.write(privateKey);
  makepub.stdin.end();
});
