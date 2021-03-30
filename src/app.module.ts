import { HttpModule, Module } from '@nestjs/common';
import { AccessService } from 'src/access.service';
import { AppController } from './app.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AccessService],
})
export class AppModule {}
