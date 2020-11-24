const server = require("./createServer");

const port = process.env.PORT || 3012; 

server.listen(port, () => console.log(`Express is running on port ${port}`))