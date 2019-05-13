import * as React from 'react';
import {
    FindPlacesForm,
    FindPlacesViewObjectProps,
    FindPlacesViewObject,
    FindPlacesFormProps,

    FindPlacesHeader,
    FindPlacesHeaderType,
    FindPlacesHeaderViewObject,
    IconFilenames,
    StaticRepositoryConfiguration,
    DefaultImagesRepository,

    SearchableDropdownObservable,
    SearchableDropdown,

    DropdownFilterModel,
    SimpleDropdownObservable,
    DropdownFilterSize,
    FiltersSection,
    FilterSectionViewObject,
} from '@snoutyfriend/storybook';
import {NextContext} from 'next';
const style = require('@snoutyfriend/storybook/scss/all.scss');
const findLocation = require('../../../scss/pages/find-location/find-location.scss');

export default class FindLocation extends React.Component<{}, {}> {
    static async getInitialProps(context: NextContext) {
        const {query} = context;
        return query;
    }

    public render() {
        console.log('props', this.props);
        const type = FindPlacesHeaderType.FIXED;
        const viewObject = new FindPlacesHeaderViewObject({
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
        });

        const staticUrl = '/static';
        const staticUrlConfiguration = new StaticRepositoryConfiguration(staticUrl);
        const imagesRepository = new DefaultImagesRepository(staticUrlConfiguration);

        const filterSectionViewObject = new FilterSectionViewObject({
            header: 'FILTERI',
            description: 'Ovdje upravljate sadrzajem koji se prikazuje s lijeve strane. Isprobajte kako rade filteri pretrazivanja: \n' +
                '\n',
            filters: [
                new DropdownFilterModel({
                    label: 'Grad:',
                    dropdownObservable: new SimpleDropdownObservable([
                        {
                            key: '1',
                            name: 'Zagreb',
                        },
                        {
                            key: '2',
                            name: 'Split',
                        },
                    ]),
                }),
                new DropdownFilterModel({
                    label: 'Tip:',
                    dropdownObservable: new SimpleDropdownObservable([
                        {
                            key: '1',
                            name: 'Kafic',
                        },
                        {
                            key: '2',
                            name: 'Restoran',
                        },
                    ]),
                }),
                new DropdownFilterModel({
                    label: 'Dozvoljeni kucni ljubimci:',
                    size: DropdownFilterSize.SMALL,
                    dropdownObservable: new SimpleDropdownObservable([
                        {
                            key: '1',
                            name: 'Da',
                        },
                        {
                            key: '2',
                            name: 'Ne',
                        },
                    ]),
                }),
            ],
        });

        return <div>
            <FindPlacesHeader viewObject={viewObject} type={type} imagesRepository={imagesRepository}/>
            <div className='filter-section'>
                <FiltersSection imagesRepository={imagesRepository} viewObject={filterSectionViewObject} />
            </div>
        </div>;
    }
}
