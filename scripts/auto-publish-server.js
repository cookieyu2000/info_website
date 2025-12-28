const http = require('http');
const path = require('path');
const { execFile } = require('child_process');

const host = '127.0.0.1';
const port = Number(process.env.AUTO_PUBLISH_PORT || 8090);
const repoRoot = path.resolve(__dirname, '..');
const publishScript = path.join(repoRoot, 'scripts', 'publish.sh');

function sendResponse(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  });
  res.end(JSON.stringify(body));
}

function runPublish(message, res) {
  execFile('bash', [publishScript, message], { cwd: repoRoot }, (err, stdout, stderr) => {
    if (err) {
      sendResponse(res, 500, {
        ok: false,
        message: 'Publish failed',
        error: stderr || err.message,
      });
      return;
    }

    sendResponse(res, 200, { ok: true, output: stdout.trim() });
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    sendResponse(res, 204, {});
    return;
  }

  if (req.method !== 'POST' || req.url !== '/publish') {
    sendResponse(res, 404, { ok: false, message: 'Not Found' });
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    let payload = {};
    try {
      payload = body ? JSON.parse(body) : {};
    } catch (error) {
      sendResponse(res, 400, { ok: false, message: 'Invalid JSON' });
      return;
    }

    const collection = payload.collection || 'content';
    const slug = payload.slug || 'entry';
    const message = `Auto publish: ${collection}/${slug}`;
    runPublish(message, res);
  });
});

server.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`Auto publish server listening on http://${host}:${port}`);
});
