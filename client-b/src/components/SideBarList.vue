<template>
  <div class="sideBarListContainer">
    <div class="sideBarContainer">
      <h3>{{listTitle}}</h3>
      <ul id="v-for-object">
        <li class="itemsList" v-for="(item, i) in listItems" v-bind:key="i">
          <input @click="checkBoxChange(item, $event)" type="checkbox" name="categorySelected"><p>{{ item.title }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import projects from '@/store/modules/projects';
  // import SideBarListItem from "@/components/SideBarListItem.vue"; // @ is an alias to /src

  @Component({
    components: {
      // SideBarListItem
    },
    methods: {
      checkBoxChange(item, e) {
        const category = item.title;
        const isSelected = e.target.checked;
        projects.selectCategory({category, isSelected})
      }
    }
  })

  export default class SideBarList extends Vue {
    @Prop()
    listTitle!: string;
    @Prop()
    listItems!: object;
    @Prop()
    itemAction!: Function;
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.itemsList {
  display: flex;
  align-items: center;
}
.sideBarListContainer {
  margin-top: 30px;
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
