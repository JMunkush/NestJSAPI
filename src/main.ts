import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {JwtAuthGuard} from "./guard/jwt.auth.guard";
import {ValidationPipe} from "./pipe/validation.pipe";

(async () => {
  await NestFactory.create(AppModule).then(app =>  {

    const config = new DocumentBuilder()
        .setTitle("MY-API-DOC")
        .setDescription("MY_DESC")
        .setVersion("1.0")
        .addTag("MUNKUSH")
        .build();

    SwaggerModule.createDocument(app, config,{})
    const document = SwaggerModule.createDocument(app, config,{});
    SwaggerModule.setup("/api/v1", app, document);


    app.setGlobalPrefix("/api/v1/");
    app.listen(8080);

  });


})();
