<template>
  <div>
    <!-- content -->
  </div>
</template>

<script lang="ts">
// -----------------------
//   请根据实际情况增删代码!!
// -----------------------

import {
  Component,
  Prop,
  Vue,
  Model,
  Watch,
  Inject,
  Provide,
  Emit,
  Ref
} from "vue-property-decorator";
import { Col, Row, Divider } from "vant";

@Component({
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Divider.name]: Divider
  }
})
export default class TabbarFix extends Vue {
  @Prop(Number) readonly propA: number | undefined;
  @Prop({ default: "default value" }) readonly propB!: string;
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined;
  @Model("change", { type: Boolean }) readonly checked!: boolean;
  @Ref("aButton") readonly button!: HTMLButtonElement;

  @Inject("bar") readonly bar!: string;
  @Provide() foo = "foo";

  count = 0;

  @Emit()
  addToCount(n: number) {
    this.count += n;
  }

  @Watch("person", { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) {}
}
</script>

<style scoped lang="stylus">
// css ....
</style>
