import { VuexModule, Module, getModule, MutationAction, Mutation } from 'vuex-module-decorators';
import store from '@/store';
import { PropertiesLocation, Property } from '../models';
import { getProperties, investInProperty } from '../api';

@Module({
    namespaced: true,
    dynamic: true,
    name: 'propertiesData',
    store
})
class PropertiesModule extends VuexModule {
    properties: Property[] = []
    propertiesLocations: PropertiesLocation[] = []
    selectedLocations = []
    showOnlyAvailableProperties = false

    @MutationAction({ mutate: ['properties', 'propertiesLocations']})
    async getProperties(){
        const properties = await getProperties()
        properties.forEach(property => {
            property.isSelected = true
        });
        const propertiesLocations = properties?.map(p => {
            return {
                title: p.location
            }
        })
        return { 
            properties: properties,
            propertiesLocations: propertiesLocations 
        }
    }

    @MutationAction({ mutate: ['properties']})
    async investInProperty(payload){
        const propertyToUpdate = await investInProperty(payload)
        if(propertyToUpdate) {
            const propertyToUpdateIndex = this.state.properties.findIndex(p => p.id == propertyToUpdate.id)
            this.state.properties[propertyToUpdateIndex].availableShares = propertyToUpdate.availableShares;
        }
        return { 
            properties: this.state.properties,
        }
    }

    @MutationAction({ mutate: ['properties']})
    async selectLocation(payload){
        const { location, isSelected } = payload;

        if(isSelected){
            this.state.selectedLocations.push(location)
        } else {
            this.state.selectedLocations = this.state.selectedLocations.filter(sl => sl != location);
        }
   
        if(this.state.selectedLocations.length > 0) {     

            this.state.properties.forEach(p => {
                if(this.state.selectedLocations.includes(p.location)){
                    p.isSelected = true;
                } else {
                    p.isSelected = false
                }
            });
        } else {
            this.state.properties.forEach( p => {
                p.isSelected = true;
            });
        }
        return {
            properties: this.state.properties
        }
    }

    @MutationAction({ mutate: [ 'showOnlyAvailableProperties']})
    async toggleAvailability(payload){
        const { isSelected } = payload;

        return {
            showOnlyAvailableProperties: isSelected
        }
    }
}

export default getModule(PropertiesModule)