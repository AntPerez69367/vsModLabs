import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

const GraphQLModule = NestGraphQLModule.forRoot<ApolloDriverConfig>({
  include: [],
  driver: ApolloDriver,
  typePaths: ['./**/*.graphql'],
});

export default GraphQLModule;
