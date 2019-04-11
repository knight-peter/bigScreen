<template>
<div class="tree_select">
    <div class="tree_select_input" v-on:click.stop="showDown">
        <el-input :placeholder="placeholder" v-model="currentNode[selectProps.label]" :disabled="disabled" :readonly="true">
            <el-button slot="append" :icon="icon" @click.stop="clickIconBtn" @mouseover.native="hoverIconBtn(true)" @mouseout.native="hoverIconBtn(false)"></el-button>
        </el-input>
    </div>
    <!-- <div class="tree_select_down" v-if="isShowDown">
        <el-tree :data="selectData" :props="selectProps" :node-key="selectProps.value" @node-click="handleNodeClick"></el-tree>
    </div> -->
    <el-dialog class="panel_station_tree" title="请选择" :visible.sync="isShowDown" :top="'10%'" style="auto" :close-on-click-modal="false">
        <div style="height: 300px;margin: 0 30px;overflow: auto;" v-if="isShowDown">
            <el-tree :data="selectData" :props="selectProps" @node-click="handleNodeClick"></el-tree> 
        </div>
    </el-dialog>
</div>
</template>
<script>
export default {
    props: {
        selectData: {
            type: Array,
            required: true,
            default: function(){
                return [];
            }
        },
        selectProps: {
            type: Object,
            default: function() {
                return {
                    label: 'name',
                    value: 'code',
                    children: 'children'
                }
            }
        },
        clickCheck: {
            type: Object,
            default: function(){ // key: someKey value: someValue 满足条件的node才能被选中
                return {
                    key: '',
                    value: ''
                }
            }
        },
        placeholder: String,
        disabled: {
            type: Boolean,
            default: false
        },
        value: null,
    },
    data() {
        return {
            isShowDown: false,
            icon: 'el-icon-search',
        }
    },
    computed: {
        currentNode(){
            return this.value;
        }
    },
    methods: {
        showDown() {
            if(!this.disabled) {
                this.isShowDown = !this.isShowDown;
            }
        },
        hoverIconBtn(boolean) {
            if(!this.disabled && boolean && this.currentNode[this.selectProps.label]) {
                this.icon = 'close';
            }else {
                this.icon = 'search';
            }
        },
        clickIconBtn() {
            if(this.disabled) {
                return
            }
            if(this.icon == 'close') {
                this.currentNode[this.selectProps.label] = '';
                this.currentNode[this.selectProps.value] = '';
                this.isShowDown = false;
                this.$emit("input", this.currentNode);
            }else {
                this.showDown();
            }
        },
        handleNodeClick(node) {
            if(this.clickCheck && this.clickCheck.key) {
                if(node[this.clickCheck.key] == this.clickCheck.value) {
                    this.currentNode[this.selectProps.label] = node[this.selectProps.label];
                    this.currentNode[this.selectProps.value] = node[this.selectProps.value];
                    this.isShowDown = false;
                    this.$emit("input", this.currentNode);
                }
            }else {
                this.$emit("nodeClick", node);
            }
        }
    },
    watch: {
    },
    mounted() {
    },
    created() {
    },
    beforeDestroy() {
    },
}
</script>
<style lang="less">
.tree_select {
    position: relative;
    .tree_select_input {
        height: 100%;
        .el-input__inner {
            height: 28px
        }
    }
    .tree_select_down {
        min-height: 200px;
        max-height: 400px;
        width: 100%;
        z-index: 100;
        position: absolute;
        top: 100%;
        left: 0px;
        border: 1px solid #d1dbe5;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
        box-sizing: border-box;
        margin: 5px 0;
        overflow: auto;
        .el-tree {
            border-width: 0px;
        }
    }
}
</style>