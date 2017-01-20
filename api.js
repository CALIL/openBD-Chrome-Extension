class api {
  constructor(isbns, callback){
    superagent
      .get('https://api.openbd.jp/v1/get')
      .query({ isbn: isbns.join(',') })
      .end(function(err, res){
        if(!err){
          // console.log(res.body);
          callback(res.body)
        }
      });
  }
}
