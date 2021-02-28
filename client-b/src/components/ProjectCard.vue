<template>
  <div class="projectCardContainer">
    <img height="200px" width="300px" :src="project.img" />
    <h3>{{project.name}}</h3>
    <p>Project goal: {{project.projectGoal}}€</p>
    <p v-if="availableToPurchase">Remaining funding: {{remainingFunding}}€</p>
    <p v-if="availableToPurchase">Price per slot: {{slotPrice}}€</p>
    <p>Category: {{project.category}}</p>

    <button v-if="availableToPurchase" @click="goInvest">Fund</button>
    <p v-else>Project funded</p>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import router from '../router/index';
  // import SideBarListItem from "@/components/SideBarListItem.vue"; // @ is an alias to /src

  @Component({
    data() {
      const project = this.$props.project;
      const slotPrice = project.projectGoal / project.totalSlots;
      const remainingFunding = project.projectGoal - (slotPrice * project.availableSlots);
      const availableToPurchase = project.availableSlots > 0;

      return {
        slotPrice,
        remainingFunding,
        availableToPurchase
      }
    },
    methods: {
      goInvest() {
        router.push(`/checkout/${this.$props.project.id}`)
      },
    }
  })

  export default class ProjectCard extends Vue {
    @Prop()
    project!: object;
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
