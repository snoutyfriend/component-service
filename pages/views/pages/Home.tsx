import * as React from 'react';
import {
    FindPlacesForm,
    FindPlacesViewObjectProps,
    FindPlacesViewObject,
    FindPlacesFormProps,

    ObservableForm,

    FindPlacesHeader,
    FindPlacesHeaderType,
    FindPlacesHeaderViewObject,
    IconFilenames,
    StaticRepositoryConfiguration,
    DefaultImagesRepository,

    SearchableDropdownObservable,
    SearchableDropdown,
    DropdownItemDetails,

    SocialImages,
    SocialImagesViewObject,
    SocialImagesProps,
} from '@snoutyfriend/storybook';
import {NextContext} from 'next';
import Router from 'next/router';

const style = require('@snoutyfriend/storybook/scss/all.scss');
const homeStyle = require('../../../scss/pages/home/home.scss');

export interface HeaderConfiguration {
    viewObject: FindPlacesHeaderViewObject;
}

export interface FormConfiguration {
    viewObject: FindPlacesViewObject;
    cities: DropdownItemDetails[];
}

export interface HomeProps {
    headerConfiguration: HeaderConfiguration;
    formConfiguration: FormConfiguration;
}
export default class Home extends React.Component<HomeProps, {}> {
    private dropdownActiveItem: DropdownItemDetails | undefined;

    static async getInitialProps(context: NextContext) {
        const {query} = context;
        return query;
    }

    public render() {
        const {formConfiguration, headerConfiguration} = this.props;
        const type = FindPlacesHeaderType.DEFAULT;
        const viewObject = headerConfiguration.viewObject;

        const staticUrl = '/static';
        const staticUrlConfiguration = new StaticRepositoryConfiguration(staticUrl);
        const imagesRepository = new DefaultImagesRepository(staticUrlConfiguration);
        const searchableDropdownObservable = new SearchableDropdownObservable(formConfiguration.cities);
        const findPlacesViewObject = formConfiguration.viewObject;
        const observableForm: ObservableForm = new ObservableForm([]);

        this.dropdownActiveItem = searchableDropdownObservable.getActiveItem();

        searchableDropdownObservable.getObservableActiveItem().subscribe((activeItem: DropdownItemDetails) => {
            this.dropdownActiveItem = activeItem;
        });

        observableForm.getSubmittedObservable().subscribe(() => {
            if (this.dropdownActiveItem === undefined) {
                return;
            }

            Router.push({ pathname: '/locations', query: {
                    city: this.dropdownActiveItem.name,
                },
            });
        });

        const socialImagesViewObject: SocialImagesViewObject = {
            title: 'Pridruzite se Snoutyfriend zajednici na',
            links: [
                {
                    href: '',
                    value: 'Facebooku',
                },
                {
                    href: '',
                    value: 'Instagramu',
                },
            ],
            andSeparator: 'i',
            images: [
                'https://scontent-lht6-1.cdninstagram.com/vp/7c60c7669f848fffcb3a0da8847a4812/5D5703B7/t51.2885-15/sh0.08/e35/s640x640/56962154_2269904143268101_3706237357547553237_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com',
                'https://scontent-lht6-1.cdninstagram.com/vp/ba2bf9063bd537326dc2cacef449972c/5D5AB71C/t51.2885-15/e35/54513663_585604535283742_4348662001913804805_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com',
                'https://scontent-lht6-1.cdninstagram.com/vp/7c60c7669f848fffcb3a0da8847a4812/5D5703B7/t51.2885-15/sh0.08/e35/s640x640/56962154_2269904143268101_3706237357547553237_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com',
                'https://scontent-lht6-1.cdninstagram.com/vp/7c60c7669f848fffcb3a0da8847a4812/5D5703B7/t51.2885-15/sh0.08/e35/s640x640/56962154_2269904143268101_3706237357547553237_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com',
                'https://scontent-lht6-1.cdninstagram.com/vp/7c60c7669f848fffcb3a0da8847a4812/5D5703B7/t51.2885-15/sh0.08/e35/s640x640/56962154_2269904143268101_3706237357547553237_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com',
                'https://scontent-lht6-1.cdninstagram.com/vp/ba2bf9063bd537326dc2cacef449972c/5D5AB71C/t51.2885-15/e35/54513663_585604535283742_4348662001913804805_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com',
                'https://scontent-lht6-1.cdninstagram.com/vp/7c60c7669f848fffcb3a0da8847a4812/5D5703B7/t51.2885-15/sh0.08/e35/s640x640/56962154_2269904143268101_3706237357547553237_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com',
            ],
        };

        return (
            <div>
                <FindPlacesHeader viewObject={viewObject} type={type} imagesRepository={imagesRepository}/>
                <div className='col'>
                    <div className='home-search-form'>
                        <FindPlacesForm
                            observableForm={observableForm}
                            viewObject={findPlacesViewObject}
                            searchableDropdownObservable={searchableDropdownObservable}
                            imagesRepository={imagesRepository} />
                    </div>
                </div>
                <div className='col'>
                    <div className='home-social-images'>
                        <SocialImages viewObject={socialImagesViewObject} />
                    </div>
                </div>
            </div>
        );
    }
}
