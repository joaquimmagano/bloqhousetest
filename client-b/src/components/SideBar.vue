<template>
  <div class="sideBarContainer">
    <SideBarList listTitle="Locations" :listItems="projectsCategories" />
    <AvailabilityChecker />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SideBarList from "@/components/SideBarList.vue"; // @ is an alias to /src
import AvailabilityChecker from "@/components/AvailibityChecker.vue";

@Component({
    components: {
        SideBarList,
        AvailabilityChecker
    },
    computed: {
        projectsCategories() {
          const projectsCategories = this.$store.state.projectsData.projectsCategories;
          const uniqueProjectsLocations = [...new Map(projectsCategories.map(item => [item['title'], item])).values()]
          return uniqueProjectsLocations;
        }
    },
})

export default class SideBar extends Vue {
    @Prop()
    listTitle!: string;
    @Prop()
    list!: object;
    @Prop()
    itemAction!: Function;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sideBarContainer {
  border: 1px solid red;
  height: 95vh;
  width: 300px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
