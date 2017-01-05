exports.index		=	function(request, response){
    console.log(request.user);
    response.render('paginas/index',{	user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha });
};
exports.teste		=	function(request, response){
    response.render('paginas/teste');
};
exports.login 		=	function(request, response){
	response.render('paginas/login',	{ message: request.flash('MSGLogin') });
};
exports.cadastro	=	function(request, response){
    response.render('paginas/cadastro', { message: request.flash('MSGCad')	 });
};
exports.logOut		=	function(request, response){
	request.logout();
	response.redirect('/');
};
exports.ttt = function(req, res){
        console.log(req);

};
exports.calendario      =   function(request, response){
  response.render('paginas/calendario',{    user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha });

};
exports.cadastroQuest		=	function(request, response){

    response.render('paginas/cadastroQuest',{  message: request.flash('MSGCadQuest'),  user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha    });

};
exports.consultaProvas      =   function(request, response){
    response.render('paginas/consultaProvas',{  user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha     });
};
exports.cadastroProvas		=	function(request, response){
    response.render('paginas/cadastroProvas',{      user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha   });
};
exports.consultaQuest		=	function(request, response){
    response.render('paginas/consultaQuest',{   user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha     });
};
exports.consultaProf		=	function(request, response){
    response.render('paginas/consultaProf',{    user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha     });
};
exports.consultaTurma		=	function(request, response){
  response.render('paginas/consultaTurma',{     user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha     });

};
exports.consultaAluno		=	function(request, response){
    response.render('paginas/consultaAluno',{   user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha     });
};
exports.cadastroNotas		=	function(request, response){
    response.render('paginas/cadastroNotas',{   user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha   });
};
exports.diarioPresenca		=	function(request, response){
    response.render('paginas/diarioPresenca',{  user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha      });
};
exports.testePDF        =   function(request, response){
    response.render('paginas/testePDF',{ user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha       });
};
exports.calendario      =   function(request, response){
  response.render('paginas/calendario',{ user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha   });
};
exports.modalContent      =   function(request, response){
  response.render('paginas/modalContent',{ user: request.user.username,userMat: request.user.matricula, photoID: request.user.photoID, email: request.user.email, data_nasc: request.user.data_nasc, tel_cel: request.user.tel_cel,  senha: request.user.senha    });
};
