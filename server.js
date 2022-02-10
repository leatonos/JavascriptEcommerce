const http = require('http');
const fs = require('fs')
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.writeHead(200,{'Context-Type':'text/html'})
  fs.readFile('account.html',(err,data)=>{
      if(err){
          res.writeHead(404)
          res.write('Error file not found')
      }else{
          res.write(data)
      }
  res.end();
  })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});