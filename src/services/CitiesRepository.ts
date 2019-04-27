import {
    DropdownItemDetails,
} from '@snoutyfriend/storybook';
import {RepositoryGetter} from '@server/services/RepositoryGetter';
import {Injectable} from '@nestjs/common';

@Injectable()
export class CitiesRepository implements RepositoryGetter<DropdownItemDetails> {
    private cities = [
        {
            key: '1',
            name: 'Zagreb',
        },
        {
            key: '2',
            name: 'Split',
        },
        {
            key: '3',
            name: 'Rijeka',
        },
    ];

    findAll(): DropdownItemDetails[] {
        return this.cities;
    }

    get(id: string): DropdownItemDetails[] {
        return this.cities.filter((city) => {
            return id === city.key;
        });
    }

}
