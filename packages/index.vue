<template>
    <div class="form-designer">
        <el-container>
            <!-- 左侧字段 -->
            <el-aside :width="leftWidth">
                <div class="fields-list">
                    <template v-if="customFields && customFields.length > 0">
                        <template v-if="customFields[0].title && customFields[0].list && customFields[0].list.length > 0">
                            <template v-for="(field, index) in customFields">
                                <div class="field-title" :key="'f_' + index">{{ field.title }}</div>
                                <draggable tag="ul" :list="field.list" :group="{ name: 'form', pull: 'clone', put: false }"
                                    ghost-class="ghost" :sort="false" :key="'d_' + index">
                                    <template v-for="(item, cIndex) in field.list">
                                        <li class="field-label" :key="'c_' + cIndex">
                                            <a @click="handleFieldClick(item)">
                                                <i class="icon iconfont" :class="item.icon"></i>
                                                <span>{{ item.title || item.label }}</span>
                                            </a>
                                        </li>
                                    </template>
                                </draggable>
                            </template>
                        </template>
                    </template>
                    <div v-for="(field, index) in fields" :key="index">
                        <template v-if="field.list.find(f => includeFields.includes(f.type))">
                            <div class="field-title">{{ field.title }}</div>
                            <draggable tag="ul" :list="field.list" :group="{ name: 'form', pull: 'clone', put: false }"
                                ghost-class="ghost" :sort="false">
                                <template v-for="(item, cIndex) in field.list">
                                    <li class="field-label" v-if="includeFields.includes(item.type)" :key="'c_' + cIndex">
                                        <a @click="handleFieldClick(item)">
                                            <i class="icon iconfont" :class="item.icon"></i>
                                            <span>{{ item.title || item.label }}</span>
                                        </a>
                                    </li>
                                </template>
                            </draggable>
                        </template>
                    </div>
                </div>
            </el-aside>

            <!-- 中间主布局 -->
            <el-container class="widget-container" direction="vertical">
                <el-header class="widget-container-header">
                    <div>
                        <template v-if="undoRedo">
                            <el-button type="text"
                                       size="medium"
                                       icon="el-icon-refresh-left"
                                       :disabled="historySteps.index == 0"
                                       @click="widgetForm = handleUndo()">撤销</el-button>
                            <el-button type="text"
                                       size="medium"
                                       icon="el-icon-refresh-right"
                                       :disabled="historySteps.index == historySteps.steps.length - 1"
                                       @click="widgetForm = handleRedo()">重做</el-button>
                        </template>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <slot name="toolbar-left"></slot>
                        <el-button v-if="toolbar.includes('import')"
                                   type="text"
                                   size="medium"
                                   icon="el-icon-upload2"
                                   @click="importJsonVisible = true">导入JSON</el-button>
                        <el-button v-if="toolbar.includes('generate')"
                                   type="text"
                                   size="medium"
                                   icon="el-icon-download"
                                   @click="handleGenerateJson">导入JSON</el-button>
                        <el-button v-if="toolbar.includes('preview')"
                                    type="text"
                                    size="medium"
                                    icon="el-icon-view"
                                    @click="handlePreview">预览</el-button>
                        <el-button v-if="toolbar.includes('clear')"
                                   class="danger"
                                   type="text"
                                   size="medium"
                                   icon="el-icon-delete"
                                   @click="handleClear">清空</el-button>
                        <slot name="toolbar"></slot>
                    </div>
                </el-header>
                <el-main :style="{background: widgetForm.column.length == 0 ? `url(${widgetEmpty}) no-repeat 50%` : ''}">
                    <widget-form ref="widgetForm"
                                 :data="widgetForm"
                                 :select.sync="widgetFormSelect"
                                 @change="handleHistoryChange(widgetForm)"></widget-form>
                </el-main>
            </el-container>

            <!-- 右侧配置 -->
            <el-aside class="widget-config-container" :width="rightWidth">
                <el-tabs v-model="configTab"
                         stretch>
                    <el-tab-pane label="字段属性"
                                 name="widget"
                                 style="padding: 0 10px">
                        <widget-config></widget-config>
                    </el-tab-pane>
                    <el-tab-pane label="表单属性"
                                 name="form"
                                 lazy
                                 style="padding: 0 10px">
                        <form-config></form-config>
                    </el-tab-pane>
                </el-tabs>
            </el-aside>

            <!-- 弹窗 -->
            <!-- 导入JSON -->
            <el-drawer title="导入JSON">
            </el-drawer>
            <!-- 生成JSON -->
            <el-drawer title="生成JSON">
            </el-drawer>
            <!-- 预览 -->
            <el-drawer title="预览">
            </el-drawer>
        </el-container>
    </div>
</template>

<script>
import fields from './fieldsConfig.js'
import widgetEmpty from './assets/widget-empty.png'
import history from './mixins/history'

import Draggable from 'vuedraggable';

import WidgetForm from './WidgetForm'
export default {
    name: "FormDesign",
    components: {
        Draggable,
        WidgetForm
    },
    mixins: [history],
    props: {
        options: {
            type: [Object, String],
            default: () => {
                return {
                column: []
                }
            }
        },
        asideLeftWidth: {
            type: [String, Number],
            default: '270px'
        },
        asideRightWidth: {
            type: [String, Number],
            default: '380px'
        },
        includeFields: {
            type: Array,
            default: () => {
                const arr = []
                fields.forEach(f => {
                    f.list.forEach(c => {
                        arr.push(c.type)
                    })
                })
                return arr
            }
        },
        customFields: {
            type: Array,
        },
        toolbar: {
            type: Array,
            default: () => {
                return ['import', 'generate', 'preview', 'clear']
            }
        },
        undoRedo: {
            type: Boolean,
            default: true
        },
    },
    computed: {
        leftWidth() {
            if (typeof this.asideLeftWidth == 'string') {
                return this.asideLeftWidth
            } else {
                return `${this.asideLeftWidth}px`
            }
        },
        rightWidth() {
            if (typeof this.asideRightWidth == 'string') {
                return this.asideRightWidth
            } else {
                return `${this.asideRightWidth}px`
            }
        }
    },
    data() {
        return{
            fields,
            widgetEmpty,
            widgetForm: {
                column: [],
                labelPosition: 'left',
                labelSuffix: '：',
                labelWidth: 120,
                gutter: 0,
                menuBtn: true,
                submitBtn: true,
                submitText: '提交',
                emptyBtn: true,
                emptyText: '清空',
                menuPosition: 'center'
            },
            history: {
                index: 0, // 当前下标
                maxStep: 20, // 最大记录步数
                steps: [], // 历史步数
            }
        }
    },
    methods: {
        handleUndo() {
            
        }
    }
}
</script>

<style lang="scss">
@import './styles/index.scss';
</style>