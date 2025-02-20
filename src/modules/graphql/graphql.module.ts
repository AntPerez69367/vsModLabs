import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Request, Response } from 'express';

const GraphQLModule = NestGraphQLModule.forRoot<ApolloDriverConfig>({
  include: [],
  driver: ApolloDriver,
  context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
  typePaths: ['./**/*.graphql'],
});

export default GraphQLModule;
