#!/usr/bin/env node
var request = require('request'),
    program = require('commander'),
    chalk = require('chalk')

var c = console.log.bind(console)

function _url(url, data){
  var r = {
    url: url,
    auth: {
      user: process.env.BASECAMP_LOGIN,
      pass: process.env.BASECAMP_PASSWORD
    },
    headers: {
        'User-Agent': 'Node.js Basecamp commenter (zendzirou@gmail.com)'
    }
  }
  if(data)
    r.json = data
  return r
}



program
  .version('0.0.1')


program
  .command('comment')
  .option('-a, --account <n>', 'Basecamp account', parseInt)
  .option('-p, --project <n>', 'project id', parseInt)
  .option('-t, --todo <n>', 'todo item id', parseInt)
  .description('Comment todo item')
  .action(function(what, obj){
    var u = 'https://basecamp.com/'+obj.account+'/api/v1/projects/'+obj.project+'/todos/'+obj.todo+'/comments.json'
    request.post(_url(u,
                      { "content": what}),
                function(e, r, body){
                  if(e){
                    console.log(e)
                    console.log(body)
                  }else{
                    console.log(chalk.green('Commented'))
                  }
               })
  })

program.parse(process.argv);
