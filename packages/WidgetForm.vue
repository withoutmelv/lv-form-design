<template>
    <div class="widget-form-container">
        <el-form :label-position="data.labelPosition || 'left'"
                 :label-width="data.labelWidth ? `${data.labelWidth}px` : '100px'"
                 :label-suffix="data.labelSuffix"
                 :model="form"
                 ref="widgetForm"
                 size="small">
            <el-row :gutter="data.gutter">
                <draggable class="widget-form-list"
                           :list="data.column"
                           :group="{name: 'form'}"
                           ghost-class="ghost"
                           :animation="300"
                           @add="handleWidgetAdd"
                           @end="$emit('change')">
                    <template v-for="(column, index) in data.column">
                        <div class="widget-form-table"
                             v-if="column.type == 'dynamic'"
                             :key="index"
                             :class="{active: selectWidget.prop == column.prop}"
                             @click="handleSelectWidget(index)">
                            <widget-form-table :data="data"
                                               :column="column"
                                               :index="index"
                                               :select.sync="selectWidget"
                                               @change="$emit('change')">
                            </widget-form-table>
                        </div>
                        <div class="widget-form-group"
                             v-else-if="column.type == 'group'"
                             :key="index"
                             :class="{active: selectWidget.prop == column.prop}"
                             @click="handleSelectWidget(index)">
                            <widget-form-group  :data="data"
                                                :column="column"
                                                :index="index"
                                                :select.sync="selectWidget"
                                                @change="$emit('change')">
                            </widget-form-group>
                        </div>
                        <el-col v-else>
                            <el-form-item class="widget-form-item"></el-form-item>
                        </el-col>
                    </template>
                </draggable>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import Draggable from 'vuedraggable';


export default {
    name: "widget-form",
    props: ["data", "select"],
    components: { Draggable }
}
</script>