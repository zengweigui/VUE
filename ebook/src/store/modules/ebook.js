export default {
    state:{
        ifTitleAndMenuShow: false,
        ifSettingShow: false,
        ifContentShow: false
    },
    mutations:{
        toggleTitleAndMenu(state) {
            state.ifTitleAndMenuShow = !state.ifTitleAndMenuShow;
            if (!state.ifTitleAndMenuShow) {
                state.ifSettingShow = false
            }
        },
        hideTitleAndMenu(state) {
            state.ifTitleAndMenuShow = false
            if (!state.ifTitleAndMenuShow) {
                state.ifSettingShow = false
            }
        },
        showSetting(state, tag) {
            if (tag === 3) {
                state.ifSettingShow = false
                state.ifContentShow = true
            } else {
                state.ifSettingShow = true
            }
        },
        hideSetting(state) {
            state.ifSettingShow = false
        },
        hideContent(state) {
            state.ifContentShow = false
        }
    }
}