import {Controller, Get, Render, Req, Request} from '@nestjs/common';
import {FormConfiguration, HeaderConfiguration, HomeProps} from '@src/views/pages/Home';
import {FindPlacesHeaderViewObject, IconFilenames, FindPlacesViewObject} from '@snoutyfriend/storybook';
import {CitiesRepository} from '@server/services/CitiesRepository';
import {Query} from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('')
export class PagesController {

    constructor(private citiesRepositories: CitiesRepository) {}

    @Render('pages/Home')
    @Get('/')
    public getHome(): HomeProps {
        const headerConfiguration: HeaderConfiguration = {
            viewObject: new FindPlacesHeaderViewObject({
                share: 'SHARE',
                socialLinks: [
                    {
                        link: {
                            href: 'www.facebook.com',
                            value: '',
                        },
                        alt: 'Facebook',
                        iconName: IconFilenames.FACEBOOK,
                    },
                    {
                        link: {
                            href: 'www.instagram.com',
                            value: '',
                        },
                        alt: 'Instagram',
                        iconName: IconFilenames.INSTAGRAM,
                    },
                ],
            }),
        };

        const formConfiguration: FormConfiguration = {
            viewObject: new FindPlacesViewObject({
                description: 'Odaberite grad i pronadjite kafice i restorane u kojima su dopustene zivotinje!',
                title: 'Find Pet-Friendly Places',
                ctaSearch: 'Find',
            }),
            cities: this.citiesRepositories.findAll(),
        };

        return {
            headerConfiguration,
            formConfiguration,
        };
    }

    @Render('pages/FindLocation')
    @Get('/locations')
    public getFindLocations(@Query() query: any) {
        const city = query.city;
        return {
            location: {
                city,
            },
        };
    }
}
