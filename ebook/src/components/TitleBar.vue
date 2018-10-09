<template>
    <transition name="slide-down">
        <div class="title-wrapper" v-show="this.ifTitleAndMenuShow">
            <div class="left">
                <span class="icon-back icon"></span>
            </div>
            <div class="right">
                <div class="icon-wrapper">
                    <span class="icon-cart icon"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-person icon"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-more icon"></span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import {mapState} from 'vuex';
    export default {
        computed:{
            //这里的三点叫做 : 扩展运算符
            ...mapState({
                ifTitleAndMenuShow: state => state.ebook.ifTitleAndMenuShow
            })
        }
    }
</script>

<style lang='scss' scoped>
@import '../assets/styles/global';
.title-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 101;
        display: flex;
        width: 100%;
        height: px2rem(48);
        background-color: #fff;
        box-shadow: 0 px2rem(4) px2rem(8) rgba(0, 0, 0, .15);
        .left {
            flex: 0 0 px2rem(60);
            @include center;
        }
        .right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            .icon-wrapper {
                flex: 0 0 px2rem(40);
                @include center;
                .icon-cart {
                    font-size: px2rem(22);
                }
            }
        }
    }
</style>