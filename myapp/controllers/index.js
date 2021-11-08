exports.get_data = function(req, res, next) {
    res.render('index', { title: 'Express' });
  }

exports.submit_data =  function(req, res, next) {
    console.log("Your Email",req.body.email);
    res.redirect('/');
  }