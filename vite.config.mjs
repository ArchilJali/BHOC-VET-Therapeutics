export default {
  root: 'dist',
  server: {
    host: '0.0.0.0',
    allowedHosts: ['terminal.local']
  },
  plugins: [{
    name: 'local-layout-qa',
    configureServer(server) {
      server.middlewares.use('/__layout-qa', (_req, res) => {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(`<!doctype html><html lang="en"><meta charset="utf-8"><title>BHOC layout verification</title><style>body{margin:20px;font:16px Arial;background:#e8e8e8}iframe{display:block;border:1px solid #aaa;background:white;margin:15px 0 30px}h1,h2{font-size:18px;font-weight:400}</style><h1>Responsive layout verification</h1><h2>Phone, 390 px</h2><iframe title="Phone 390" src="/?qa=modular-a" width="390" height="844"></iframe><h2>Tablet, 768 px</h2><iframe title="Tablet 768" src="/?qa=modular-a" width="768" height="1000"></iframe><h2>Desktop, 1122 px</h2><iframe title="Desktop 1122" src="/?qa=modular-a" width="1122" height="1000"></iframe></html>`);
      });
      server.middlewares.use('/__initiative-layout-qa', (_req, res) => {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(`<!doctype html><html lang="en"><meta charset="utf-8"><title>BHOC Initiative layout verification</title><style>body{margin:20px;font:16px Arial;background:#e8e8e8}iframe{display:block;border:1px solid #aaa;background:white;margin:15px 0 30px}h1,h2{font-size:18px;font-weight:400}</style><h1>BHOC Initiative responsive layout verification</h1><h2>Phone, 390 px</h2><iframe title="Initiative phone 390" src="/initiative/?qa=responsive" width="390" height="844"></iframe><h2>Tablet, 768 px</h2><iframe title="Initiative tablet 768" src="/initiative/?qa=responsive" width="768" height="1000"></iframe><h2>Desktop, 1122 px</h2><iframe title="Initiative desktop 1122" src="/initiative/?qa=responsive" width="1122" height="1000"></iframe></html>`);
      });
      server.middlewares.use('/__initiative-phone-qa', (_req, res) => {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(`<!doctype html><html lang="en"><meta charset="utf-8"><title>BHOC Initiative phone verification</title><style>html,body{margin:0;background:#dfe8e2}iframe{display:block;width:390px;height:844px;margin:20px auto;border:1px solid #9bb3a5;background:white}</style><iframe title="Initiative phone preview" src="/initiative/?qa=phone" width="390" height="844"></iframe></html>`);
      });
    }
  }]
};
