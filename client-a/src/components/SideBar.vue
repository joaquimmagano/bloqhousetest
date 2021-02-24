<template>
  <div class="sideBarContainer">
    <SideBarList listTitle="Locations" :listItems="propertiesLocations" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SideBarList from "@/components/SideBarList.vue"; // @ is an alias to /src

@Component({
    components: {
        SideBarList
    },
    computed: {
        propertiesLocations() {
          const propertiesLocations = this.$store.state.propertiesData.propertiesLocations;
          const uniquePropertiesLocations = [...new Map(propertiesLocations.map(item => [item['title'], item])).values()]
          return uniquePropertiesLocations;
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
