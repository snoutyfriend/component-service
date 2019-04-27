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
} from '@snoutyfriend/storybook';
import {NextContext} from 'next';
import Router from 'next/router';
// import Router from 'next-server/router';

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
        const type = FindPlacesHeaderType.FIXED;
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

        return (
            <div>
                <FindPlacesHeader viewObject={viewObject} type={type} imagesRepository={imagesRepository}/>
                <div className='search-form'>
                    <FindPlacesForm
                        observableForm={observableForm}
                        viewObject={findPlacesViewObject}
                        searchableDropdownObservable={searchableDropdownObservable}
                        imagesRepository={imagesRepository} />
                </div>
            </div>
        );
    }
}
