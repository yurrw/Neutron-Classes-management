var HomeController = require('./controllers/HomeController');
var CadController = require('./controllers/CadController');

var ConsultCtrl = require('./controllers/ConsultCtrl');
var TestCTRL = require('./controllers/TestCTRL');
var bodyParser = require('body-parser').json();
var multer              =   require('multer');
var matrs     = "";
var connDB    = require('./models/mysqlmodule.js');

module.exports = function(app,passport) {







// var upload2 = upload;





app.post('/api/photo/',function(req,res){
   var archName ="";

     var fs = require('fs');



      var guardar =   multer.diskStorage({
                            destination: function (req, file, callback) {
                              callback(null, './uploads');
                            },
                            filename: function (req, file, callback) {



                          console.log("------------------------------------------");

                          var matriculando=    req.body.matriculaSend;
                          var fileName    =    file.originalname;
                          var ext         =    fileName.split(".");

                          var date = new Date();
                          var data = Date.now();
                          archName =  '-' + file.fieldname + '-' + data +'.'+ext[1];
                          console.log(archName);
                          console.log("------------------------------------------");

                              // archName =  matrs + '-' + file.fieldname + '-' + data +'.'+ext[1];

                              callback(null, archName);
                          /*
                          var d = new Date(year, month, day, hour, minute, second, millisecond);
                          */
                        }
                    });

    var upload = multer({ storage : guardar}).any();

         upload(req,res,function(err) {
                                        if(err) {
                                            console.log(err);
                                            return res.end("Error uploading file.");
                                        } else {

                                          // console.log(req.body);

                                           matrs = req.body.matriculaSend;
                                        var archName_Copy= './uploads/'+matrs+archName;
                                        var upcurl= '/uploads/'+matrs+archName;

                                            fs.rename('./uploads/'+archName , archName_Copy, function(err) {
                                                if ( err ) console.log('ERROR NA COPIA : ' + err);
                                            });



                      var qry= "INSERT INTO `user_photo` (`matricula`, `photoID`) VALUES ('"+matrs+"','"+upcurl+"')" ;
                      console.log(qry);
                      connDB.query(qry,function(err,rows){
                        if (err)
                          console.log(err);


                          console.log("UPOU NAS CARALHA");

                    });
                                                              res.end("File has been uploaded");
                                                            }
              });
});




var fs = require('fs');







        //Pagninas Principais
            app.get('/index',isLogged,HomeController.index);
            app.get('/teste',isLogged,HomeController.teste);
            app.post('/ttt',isLogged,HomeController.ttt)
            app.get('/cadastro',HomeController.cadastro);
            app.get('/', HomeController.login);
            app.get('/logout', HomeController.logOut);
            app.get('/cadastroQuest',isLogged, HomeController.cadastroQuest);
            app.get('/cadastroProvas',isLogged, HomeController.cadastroProvas);
            app.get('/cadastroNotas',isLogged, HomeController.cadastroNotas);
            app.get('/diario',isLogged, HomeController.diarioPresenca);
            app.get('/consultaQuest',isLogged, HomeController.consultaQuest);
            app.get('/consultaProf',isLogged, HomeController.consultaProf);
            app.get('/consultaTurma',isLogged, HomeController.consultaTurma);
            app.get('/consultaAluno',isLogged, HomeController.consultaAluno);
            app.get('/calendario', isLogged, HomeController.calendario);
            app.get('/testePDF',isLogged, HomeController.testePDF);
            app.get('/consultaProvas',isLogged, HomeController.consultaProvas);




                app.post('/cadastro', passport.authenticate('cadastro', {
                        successRedirect : '/',
                        failureRedirect : '/cadastro',
                        failureFlash : true
                         }));

                app.post('/', passport.authenticate('login', {
                successRedirect : '/index',
                failureRedirect : '/',
                failureFlash : true,
            }));
            app.post('/notas', ConsultCtrl.GetNotas);
            app.post('/SaveNotes', ConsultCtrl.SaveNts);
            app.post('/delNTS',ConsultCtrl.DelNts);
            app.post('/LoadNotes', ConsultCtrl.LoadNts);
            app.post('/attPass',CadController.attPass);
            app.post('/cadastroQuest', CadController.cadastroQuest);
            app.post('/cadastroProva', CadController.cadastroProva);
            app.post('/cadastroDiario', CadController.cadastroDiario);
            app.post('/deletarQuest', ConsultCtrl.removerQuest);
            app.post('/pesqMat', CadController.pesquisaMat);
            app.post('/pesqDisc', CadController.pesquisaDisc);
            app.post('/pesqQuest', CadController.pesquisaQuest);
            app.post('/pesca/:disciplina', TestCTRL.pesquisaMorte);
            app.post('/pesca', TestCTRL.pesquisaMorte2);
            app.post('/pescaconsul', ConsultCtrl.pesquisateste);

            app.post('/mostraturma', ConsultCtrl.pesquisaturma);
            
            app.post('/pesqDiscProf', ConsultCtrl.pesquisaDiscProf);
            app.post('/pegaaluno', ConsultCtrl.listalunos);
            app.post('/pegaaula', ConsultCtrl.pegaPresenca);
            app.post('/consultandoProva', ConsultCtrl.consulProva);
            app.post('/UpPerfil', CadController.UpdatePerfil);
            app.post('/UpFoto', CadController.UpFoto);





       
      /*-----------Calendario---------------------------------*/
        app.post('/pesquisaEvento', ConsultCtrl.pesquisaEvento);
        app.post('/cadastroEvento', CadController.cadastroEvento);  
        app.post('/editEvento', CadController.editEvento);  
        

        //app.post('/editEvento', CadController.editEvento);           
        
        /*-------------ADM-------------------------------------*/
        /*-------------ADM__Consulta-------------------------- */
        app.post('/ADMpesquisaDisc'   , ConsultCtrl.ADMpesquisaDisc);   
        app.post('/ADMpesquisaMateria', ConsultCtrl.ADMpesquisaMateria);
        app.post('/ADMpesquisaturma'  , ConsultCtrl.ADMpesquisaturma);
        app.post('/ADMpesquisaProf'   , ConsultCtrl.ADMpesquisaProf);
        /*-------------ADM__Cadastro-------------------------- */
        app.post('/ADMCadDisc'   , ConsultCtrl.ADMCadDisc);   
        app.post('/ADMCadMateria', ConsultCtrl.ADMCadMateria);
        app.post('/ADMCadturma'  , ConsultCtrl.ADMCadturma);
        app.post('/ADMCadProf'   , ConsultCtrl.ADMCadProf);


};
function isLogged(request, response, next) {
    if (request.isAuthenticated())
      return next();

    response.redirect('/');
}
