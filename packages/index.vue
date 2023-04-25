<template>
    <div class="form-designer">
        <el-button>hello world!!!</el-button>
        <el-container>
            <!-- 左侧字段 -->
            <el-aside width="300">
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
            </el-container>

            <!-- 右侧配置 -->
            <el-aside class="widget-config-container" width="300">
                <div></div>
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
import Draggable from 'vuedraggable';
export default {
    name: "FormDesign",
    components: {
        Draggable
    },
    props: {
        options: {
            type: [Object, String],
            default: () => {
                return {
                column: []
                }
            }
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
    },
    data() {
        return{
            fields,
        }
    },
}
</script>

<style lang="scss">
@import './styles/index.scss';
</style>