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
} from '@snoutyfriend/storybook';
import {NextContext} from 'next';
const style = require('@snoutyfriend/storybook/scss/all.scss');

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

        return <div>
            <FindPlacesHeader viewObject={viewObject} type={type} imagesRepository={imagesRepository}/>
        </div>;
    }
}
