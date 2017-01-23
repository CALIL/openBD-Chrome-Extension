/*
 openBD API
 Copyright (c) 2017 CALIL Inc.
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
*/

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
