import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {CategoryModule} from "./modules/category.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./entity/category";
import {Product} from "./entity/product";
import {ProductModule} from "./modules/product.module";
import {LoggerMiddleware} from "./middleware/log.middleware";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {AuthModule} from "./modules/auth.module";
import {RoleModule} from "./modules/role.module";
import {UserModule} from "./modules/user.module";
import {Role} from "./entity/role";
import {User} from "./entity/user";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    CategoryModule,
    ProductModule,
    AuthModule,
    RoleModule,
    UserModule,
    ConfigModule.forRoot({isGlobal: true}),
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, '..', 'static'),
    //   serveRoot: '/static',
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [Category, Product, Role, User],
      synchronize: true
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes("/");
  }

}
