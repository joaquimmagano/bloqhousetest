<template>
  <div class="home">
    <div style="display: flex; flex-direction: row;">
      <SideBar />
      <div style="display: flex; flex-direction: row; flex-wrap: wrap;" v-if="properties">
        <PropertyCard v-for="property in properties" :key="property.id" :property="property" />
      </div>
    </div>
  </div>
</template> 

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideBar from "@/components/SideBar.vue"; // @ is an alias to /src
import PropertyCard from "@/components/PropertyCard.vue"; // @ is an alias to /src

@Component({
  components: {
    SideBar,
    PropertyCard
  },
  computed: {
    properties() {
      let properties = this.$store.state.propertiesData.properties.properties;
      if(properties){
        properties = properties.filter(p => p.isSelected)
      }
      return properties;
    }
  }
})
export default class Home extends Vue {}
</script>