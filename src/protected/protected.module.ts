import {Module} from '@nestjs/common';
import { ProtectedController } from './protechted.controller';

@Module({
    controllers :[ProtectedController],

})
export class ProtectedModule {}