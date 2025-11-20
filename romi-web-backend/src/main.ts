import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors(...);

  app.use((req: any, res: any, next: any) => {
    // Origin permitido: tu dominio de Vercel
    const origin = req.headers.origin;

    if (origin === 'https://romi-web.vercel.app') {
      res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Vary', 'Origin');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type,Authorization,X-Requested-With',
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }

    next();
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
