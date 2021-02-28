<template>
  <div class="sideBarContainer">
      <div style="display: flex; flex-direction: column">
        <img height="400px" width="400px" :src="property.img" />
        <div>
            <div>
                <p>Checkout form</p>
                <p>{{property.name}}</p>
                <p>Available shares: {{this.property.availableShares}}</p>
                <p>Price per share: {{this.sharePrice}}</p>
                <div>
                  <input @input="inputHandler" placeholder="shares to buy" type="number" > = {{purchaseValue}}€
                </div>
                <button v-if="this.property.availableShares > 0" @click="invest">Invest</button>
            </div>
        </div>
      </div>
    <button @click="goBack">Go back</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from '../router/index';
import store from '../store/index';
import properties from '@/store/modules/properties';


@Component({
  components: {},
    data() {
      return {
        purchaseValue: 0,
        numberOfSharesToBuy: 0
      }
    },
  computed: {
    property() {
      const propertyId = this.$route.params.id
      const properties = this.$store.state.propertiesData.properties

      const property = properties.find(p => p.id == propertyId)

      return property;
    },
    sharePrice() {
      const sharePrice = this.property.totalValue / this.property.totalShares
      return sharePrice
    },
    availableShares() {
      return this.property.availableShares
    }
  },
  methods: {
    goBack: () => {
        router.push('/')
    },
    inputHandler(e) {
      const inputValue = e.target.value
      this.$data.numberOfSharesToBuy = inputValue
      this.$data.purchaseValue = this.numberOfSharesToBuy * this.sharePrice;
    },
    invest(){
      const payload = {
        propertyId: this.property.id,
        purchaseAmount: this.$data.numberOfSharesToBuy
      }
      properties.investInProperty(payload)
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
