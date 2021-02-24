<template>
  <div class="propertyCardContainer">
    <img height="200px" width="300px" :src="property.img" />
    <h3>{{property.name}}</h3>
    <p>Total value: {{property.totalValue}}</p>
    <p>Remaining funding: {{remainingFunding}}</p>
    <p>Price per share: {{sharePrice}}</p>
    <p>Location: {{property.location}}</p>

    <button v-if="availableToPurchase" @click="goInvest">Invest</button>
    <p v-else>Sold Out</p>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import router from '../router/index';
  // import SideBarListItem from "@/components/SideBarListItem.vue"; // @ is an alias to /src

  @Component({
    components: {
      // SideBarListItem
    },
    data() {
      const property = this.$props.property;
      const sharePrice = property.totalValue / property.totalShares;
      const remainingFunding = property.totalValue - (sharePrice * property.availableShares);
      const availableToPurchase = property.availableShares > 0;

      return {
        sharePrice,
        remainingFunding,
        availableToPurchase
      }
    },
    methods: {
      goInvest() {
        router.push(`/checkout/${this.$props.property.id}`)
      },
    }
  })

  export default class PropertyCard extends Vue {
    @Prop()
    property!: object;
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
