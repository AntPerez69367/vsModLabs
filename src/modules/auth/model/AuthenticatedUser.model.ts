import { Role } from 'src/graphql.schema';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class AuthenticatedUser extends UserEntity {
  token: string;
  roles: Role[];
}
