<template>
  <v-main class="grey lighten-2">
    <v-container class="py-8 px-6" fluid>
      <v-card class="image-card" ref="card" :height="`${maxTop}px`">
        <div class="image-box" v-for="(image, index) of images" :key="index">
          <a :href="image" target="_blank">
            <v-img
              max-width="250"
              min-width="250"
              min-height="250"
              transition="none"
              @load="resize"
              lazy-src="@/assets/loading.gif"
              :src="image"
            ></v-img>
          </a>
          <div class="image-title">{{ index }}</div>
        </div>
      </v-card>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  created() {
    window.addEventListener("resize", this.resize);
  },
  mounted() {
    this.resize();
    const boxs = document.querySelectorAll('.image-box');
    for (let i = 0; i < boxs.length; i++) {
      const box = boxs[i] as HTMLElement;
      box.addEventListener('transitionend', () => {
        this.resize();
      });
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  data() {
    const images = [];
    for (let i = 0; i < 30; i++) {
      images.push(`https://picsum.photos/100/300?${i}`);
      images.push(`https://picsum.photos/200/300?${i}`);
      images.push(`https://picsum.photos/300/300?${i}`);
      images.push(`https://picsum.photos/400/300?${i}`);
    }
    // for (let i = 0; i < 100; i++) {
    //   images.push(`https://picsum.photos/200/300?${i}`);
    // }
    const colOffset: [{ left: number; top: number }] = [{ left: 0, top: 0 }];
    return {
      images,
      colOffset,
      cardHeightOffset: 0,
      maxTop: 0,
      loadingCount: 1,
    };
  },
  methods: {
    /**
     * 窗口改变大小时触发
     */
    resize() {
      this.maxTop = 0;
      const card = document.querySelector(".image-card") as HTMLElement;
      // 每张图片 box 的占位宽度固定为 266px
      const cols = Math.floor(card.offsetWidth / 266);
      const colsWidth = 266 * cols;
      const offsetLeft = (card.offsetWidth - colsWidth) / (cols + 1);
      const colOffset: [{ left: number; top: number }] = [{ left: 0, top: 0 }];
      for (let i = 0; i < cols; i++) {
        colOffset[i] = {
          left: offsetLeft * (i + 1) + 266 * i,
          top: 0,
        };
        this.colOffset[i] = {
          left: offsetLeft * (i + 1) + 266 * i,
          top: 0,
        };
      }
      const boxs = card.querySelectorAll(".image-box");
      const nextPos = () => {
        let pos = 0,
          top = 2147483647;
        for (let i = 0; i < colOffset.length; i++) {
          const offset = colOffset[i];
          if (top > offset.top) {
            top = offset.top;
            pos = i;
          }
        }
        return pos;
      };
      for (let i = 0; i < boxs.length; i++) {
        const box = boxs[i] as HTMLElement;
        const offset = colOffset[nextPos()];
        box.style.left = `${offset.left}px`;
        box.style.top = `${offset.top}px`;
        const height = Math.round(box.offsetHeight / 10) * 10;
        offset.top += height;
        this.maxTop = offset.top > this.maxTop ? offset.top : this.maxTop;
      }
    },
  },
});
</script>

<style scoped>
.image-box {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 9px;
  position: absolute;
}
.v-image {
  border-radius: 9px;
}
.image-title {
  text-align: center;
  padding-top: 8px;
  font-size: 14px;
}
.image-card {
  position: relative;
  min-height: 290px;
}
</style>