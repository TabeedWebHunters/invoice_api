import { AppResolver } from './app.resolver';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceResolver } from './invoice/invoice.resolver';
import { UserResolver } from './user/user.resolver';
import { ItemModule } from './item/item.module';
import { ItemResolver } from './item/item.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      //typePaths: ['./**/*.graphql'],
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts')
      },
    }),

    TypeOrmModule.forRoot(
      {
        type:'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'invoice_db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }
    ),

    UserModule,

    AuthModule,

    InvoiceModule,

    ItemModule,

  ],
  controllers: [],
  providers: [AppResolver, InvoiceResolver, UserResolver, ItemResolver],
})
export class AppModule {}