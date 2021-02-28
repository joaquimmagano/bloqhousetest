<template>
  <div class="home">
    <div style="display: flex; flex-direction: row;">
      <SideBar />
      <div style="display: flex; flex-direction: row; flex-wrap: wrap;" v-if="projects">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </div>
    </div>
  </div>
</template> 

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideBar from "@/components/SideBar.vue"; // @ is an alias to /src
import ProjectCard from "@/components/ProjectCard.vue"; // @ is an alias to /src

@Component({
  components: {
    SideBar,
    ProjectCard
  },
  computed: {
    projects() {
      let projects = this.$store.state.projectsData.projects.projects;
      if(projects){
        if(this.showFundedProjects){
          projects = projects.filter(p => p.isSelected);
        } else {
          projects = projects.filter(p => p.isSelected && p.availableSlots > 0);
        }
      }
      return projects;
    },
    showFundedProjects() {
      const showFundedProjects = this.$store.state.projectsData.showFundedProjects
      
      return showFundedProjects;
    }
  }
})
export default class Home extends Vue {}
</script>