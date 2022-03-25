import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { join } from 'path';
import { config } from './utils';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_URI, {
      user: config.MONGO_INITDB_ROOT_USERNAME,
      pass: config.MONGO_INITDB_ROOT_PASSWORD,
      connectionFactory: (connection: Connection) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      installSubscriptionHandlers: true,
      path: '/api/v1/graphql',
      playground: true,
      cors: false,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
    UserModule,
    AuthModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
