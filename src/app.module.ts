import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  //code first and schema first 
  imports: [GraphQLModule.forRoot({
    driver: ApolloDriver,
    playground: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    //autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    typePaths: ['./**/*.graphql'],
    definitions: {
      path: join(process.cwd(), 'src/schema.ts'),
      outputAs: 'class',
    }
  }), PrismaModule, ProductsModule],
  providers: [PrismaService],
})
export class AppModule {}
