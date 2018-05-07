const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

// setTimeout(() => foo(), 100);

app.listen(8000);
