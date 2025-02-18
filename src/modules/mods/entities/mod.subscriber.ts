import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { ModEntity } from './mod.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class ModSubscriber implements EntitySubscriberInterface<ModEntity> {
  private readonly logger = new Logger(ModSubscriber.name);

  listenTo() {
    return ModEntity;
  }

  beforeInsert(event: InsertEvent<ModEntity>): Promise<any> | void {
    const entityid = event.entity.modId;
    this.logger.log(`Inserting modId ${entityid} into the database`);
  }

  beforeUpdate(event: UpdateEvent<ModEntity>): Promise<any> | void {
    const entityId = event.databaseEntity.modId;
    this.logger.log(`Updating database entry for ${entityId}`);
  }

  beforeTransactionRollback() {
    this.logger.log(`Rolling back transactions`);
  }

  afterTransactionRollback() {
    this.logger.log(`Transactions Rolled back`);
  }
}
