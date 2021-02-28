<template>
  <div class="availabilityCheckerContainer">
    <div>
      <h3>Availability</h3>
      <div class="items">
        <input @click="checkBoxChange($event)" type="checkbox" name="availabilitySelected"><p>Show available only</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import properties from '@/store/modules/properties';

  @Component({
    methods: {
      checkBoxChange(e) {
        const isSelected = e.target.checked;
        const payload = {
          isSelected
        }
        properties.toggleAvailability(payload)
      }
    }
  })

  export default class AvailabilityChecker extends Vue {
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.items {
  display: flex;
  align-items: center;
  margin: 0 10px;
}
.availabilityCheckerContainer {
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
