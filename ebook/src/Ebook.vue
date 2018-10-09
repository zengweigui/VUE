<template>
    <div class="ebook">
        <TitleBar></TitleBar>
        <div class="read-wrapper">
            <div id="read"></div>
            <v-touch class="mask"
            @swipeleft="nextPage"
            @swiperight="prevPage">
                <div class="left" @click="prevPage"></div>
                <div class="center" @click="$store.commit('toggleTitleAndMenu')"></div>
                <div class="right" @click="nextPage"></div>
            </v-touch>
        </div>
        <MenuBar
        :fontSizeList="fontSizeList"
        :defaultFontSize="defaultFontSize"
        @setFontSize="setFontSize"
        :themeList="themeList"
        :defaultTheme="defaultTheme"
        @setTheme="setTheme"
        :bookAvailable="bookAvailable"
        @onProgressChange="onProgressChange"
        :navigation="navigation"
        @jumpTo="jumpTo"
        :percentage="percentage"
        ref="menuBar"></MenuBar>
    </div>
</template>

<script>
import TitleBar from "@/components/TitleBar";
import MenuBar from "@/components/MenuBar";
import Epub from "epubjs";
const DOWNLOAD_URL = "/static/javascript权威指南中文第六版.epub";
global.ePub = Epub;
export default {
  data() {
    return {
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 }
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: "default",
          style: {
            body: {
              color: "#000",
              background: "#fff"
            }
          }
        },
        {
          name: "eye",
          style: {
            body: {
              color: "#000",
              background: "#ceeaba"
            }
          }
        },
        {
          name: "night",
          style: {
            body: {
              color: "#fff",
              background: "#000"
            }
          }
        },
        {
          name: "gold",
          style: {
            body: {
              color: "#000",
              background: "rgba(241, 236, 226)"
            }
          }
        }
      ],
      defaultTheme: 0,
      bookAvailable: false,
      navigation: {},
      percentage: '0',
      loadingIndex: ''
    };
  },
  components: {
    TitleBar,
    MenuBar
  },
  methods: {
    // 电子书的解析和渲染
    showEpub() {
      // loading动画
      this.loadingIndex = this.$layer.open({
        type: 2,
        content: '书籍加载中...',
        shade: true,
        shadeClose: false
      });
      // 生成Book
      this.book = new Epub(DOWNLOAD_URL, {
        restore: true
        // spreads: true // 两列
      });
      console.log(this.book);
      // 生成Rendition
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight
      });
      // 通过Rendition.display渲染电子书
      this.rendition.display()
      // 获取Theme对象
      this.themes = this.rendition.themes;
      // 设置默认字体
      this.setFontSize(this.defaultFontSize);
      // this.themes.register(name, sytles) 注册主题
      // this.themes.select(name) // 切换主题
      this.registerTheme()
      // 设置默认字体
      this.setTheme(this.defaultTheme)
      // 获取location对象
      // 通过epubjs的钩子函数来实现
      this.book.ready.then(() => {
          this.navigation = this.book.navigation
          return this.book.locations.generate()
      }).then(result => {
          this.locations = this.book.locations
          this.bookAvailable = true

          // 关闭加载
          this.$layer.close(this.loadingIndex)
      })
    },
    prevPage() {
      // rendition.prev
      if (this.rendition) {
        this.rendition.prev()
        this.$store.commit('hideTitleAndMenu')
      }
      this.getPercentage()
    },
    nextPage() {
      // rendition.next
      if (this.rendition) {
        this.rendition.next()
        this.$store.commit('hideTitleAndMenu')
      }
      this.getPercentage()
    },
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize;
      if (this.themes) {
        this.themes.fontSize(fontSize + "px");
      }
    },
    // 注册主题
    registerTheme() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style);
      });
    },
    // 设置主题
    setTheme(index) {
      this.themes.select(this.themeList[index].name);
      this.defaultTheme = index;
    },
    // 进度条改变
    onProgressChange(progress) {
      const percentage = progress / 100
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location)
    },
    // 根据链接跳转到指定位置
    jumpTo(href) {
      this.rendition.display(href).then(() => {
        // 执行完成调用、获取百分比
        this.getPercentage()
      })
      this.$store.commit('toggleTitleAndMenu')
      this.$store.commit('hideContent')
    },
    // 获取当前定位的百分比
    getPercentage() {
      // 获取当前定位
      let currentLocation = this.rendition.currentLocation()
      // 计算百分比
      let percentage = this.locations.percentageFromCfi(currentLocation.start.cfi).toString()
      if (percentage != 0) {
        percentage = (this.locations.percentageFromCfi(currentLocation.start.cfi) * 100).toFixed(1)
      }
      this.percentage = percentage
    }
  },
  mounted() {
    this.showEpub();
  }
};
</script>

<style lang='scss' scoped>
@import "assets/styles/global";
div.layui-m-layershade {
  background-color: rgba(0, 0, 0, .3);
}
.ebook {
  position: relative;
  background-color: #fff;

  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height: 100%;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
}
</style>