import {CacheModule, Module} from '@nestjs/common';
import {PagesController} from '@server/modules/reactNext/controllers/PagesController';
import {CitiesRepository} from '@server/services/CitiesRepository';

@Module({
    imports: [CacheModule.register()],
    controllers: [PagesController],
    providers: [
        CitiesRepository,
    ],
})
export class ReactNextModule {}
