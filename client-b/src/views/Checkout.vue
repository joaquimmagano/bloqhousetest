<template>
  <div class="sideBarContainer">
      <div style="display: flex; flex-direction: column">
        <!-- <img height="400px" width="400px" :src="project.img" /> -->
        <div>
          <h3>Project Description</h3>
          <p>{{project.description}}</p>
        </div>
        <div>
            <div>
                <p>Checkout form</p>
                <p>{{project.name}}</p>
                <p>Available slots: {{this.project.availableSlots}}</p>
                <p>Price per slot: {{this.slotPrice}}</p>
                <div>
                  <input @input="inputHandler" placeholder="slots to buy" type="number" > = {{purchaseValue}}€
                </div>
                <button v-if="this.project.availableSlots > 0" @click="invest">Fund</button>
            </div>
        </div>
      </div>
    <button @click="goBack">Go back</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from '../router/index';
import projects from '@/store/modules/projects';


@Component({
  components: {},
    data() {
      return {
        purchaseValue: 0,
        numberOfSlotsToBuy: 0
      }
    },
  computed: {
    project() {
      const projectId = this.$route.params.id
      const projects = this.$store.state.projectsData.projects.projects
      const project = projects.find(p => p.id == projectId)
      return project;
    },
    slotPrice() {
      const slotPrice = this.project.projectGoal / this.project.totalSlots
      return slotPrice
    },
    availableSlots() {
      return this.project.availableSlots
    }
  },
  methods: {
    goBack: () => {
        router.push('/')
    },
    inputHandler(e) {
      const inputValue = e.target.value
      this.$data.numberOfSlotsToBuy = inputValue
      this.$data.purchaseValue = this.numberOfSlotsToBuy * this.slotPrice;
    },
    invest(){
      const payload = {
        projectId: this.project.id,
        purchaseAmount: this.$data.numberOfSlotsToBuy
      }
      projects.investInProject(payload)
    }
  }
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
