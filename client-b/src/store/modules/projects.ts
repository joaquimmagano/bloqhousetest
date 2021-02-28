import { VuexModule, Module, getModule, MutationAction, Mutation } from 'vuex-module-decorators';
import store from '@/store';
import { ProjectsCategories, Projects } from '../models';
import { getProjects, investInProject } from '../api';

@Module({
    namespaced: true,
    dynamic: true,
    name: 'projectsData',
    store
})
class ProjectsModule extends VuexModule {
    projects: Projects[] = []
    projectsCategories: ProjectsCategories[] = []
    selectedCategories = []
    showFundedProjects = false

    @MutationAction({ mutate: ['projects', 'projectsCategories']})
    async getProjects(){
        const projects = await getProjects()
        projects?.projects.forEach(project => {
            project.isSelected = true
        });
        const projectsCategories = projects?.projects?.map(p => {
            return {
                title: p.category
            }
        })
        return { 
            projects: projects,
            projectsCategories: projectsCategories 
        }
    }

    @MutationAction({ mutate: ['projects']})
    async investInProject(payload){
        const projectToUpdate = await investInProject(payload)
        if(projectToUpdate){
            const projectToUpdateIndex = this.state.projects.projects.findIndex(p => p.id == projectToUpdate.id)
            this.state.projects.projects[projectToUpdateIndex].availableSlots = projectToUpdate.availableSlots;
        }
        return { 
            projects: this.state.projects,
        }
    }

    @MutationAction({ mutate: ['projects']})
    async selectCategory(payload){
        const { category, isSelected } = payload;

        if(isSelected){
            this.state.selectedCategories.push(category)
        } else {
            this.state.selectedCategories = this.state.selectedCategories.filter(sl => sl != category);
        }
   
        if(this.state.selectedCategories.length > 0) {     

            this.state.projects.projects.forEach(p => {
                if(this.state.selectedCategories.includes(p.category)){
                    p.isSelected = true;
                } else {
                    p.isSelected = false
                }
            });
        } else {
            this.state.projects.projects.forEach( p => {
                p.isSelected = true;
            });
        }
        return {
            projects: this.state.projects
        }
    }

    @MutationAction({ mutate: [ 'showFundedProjects']})
    async toggleAvailability(payload){
        const { isSelected } = payload;

        return {
            showFundedProjects: isSelected
        }
    }
}

export default getModule(ProjectsModule)