exports.pesquisaMorte = function(req, res){
  console.log(req.body.nomep);
      console.log(req.params);
};
exports.pesquisaMorte2 = function(req, res){
  console.log(req.body.nomep);
  res.end('{"success" : "Updated Successfully", "status" : 200}');
//RES.END É PRA RETORNAR UM BAGULHO NO RESPONSE
//se eu quiser chamar aquela variavel aqui, eu so faço :
req.body.teste
  //AQUELE CODIGO CHAMA ESSA FUNCAO.

};
