<template>
    <div class="widget-config">
        <el-form v-if="data && Object.keys(data).length > 0"
                 label-suffix="："
                 labelPosition="left"
                 labelWidth="90px"
                 size="small">
            <el-collapse v-model="collapse">
                <el-collapse-item name="1"
                                  title="基本属性">

                </el-collapse-item>
                <el-collapse-item name="2"
                                  title="组件属性">
                    <component :is="getComponent"
                     :data="data"
                     :default-values="defaultValues"></component>
                </el-collapse-item>
                <el-collapse-item name="3"
                                  title="事件属性"
                                  v-if="!['group'].includes(data.type)">
                    <config-event :data="data"></config-event>
                </el-collapse-item>
            </el-collapse>
        </el-form>
        <template v-else>
            <avue-empty v-if="avueVersion('2.9.4')"
                        desc="拖拽字段进行配置"
                        style="margin-top: 100%"></avue-empty>
            <el-empty v-else
                      description="拖拽字段进行配置"
                      style="margin-top: 100%"></el-empty>
        </template>
    </div>
</template>
  
<script>
import fields from './fieldsConfig.js'
const dateArr = [
    'year', 'month', 'week', 'date', 'datetime', 'time', 'daterange', 'timerange', 'datetimerange', 'dates'
]
  
export default {
    name: 'widget-config',
    props: ['data', 'defaultValues'],
    computed: {
        getComponent() {
            const prefix = 'config-'
            const {type, component} = this.data
            if ((!type || component) && type !== 'ueditor') return prefix + 'custom'
            let result = 'input'

            if ([undefined, 'input', 'password', 'url'].includes(type)) result = 'input'
            else if (dateArr.includes(type)) result = 'date'
            else if (['array', 'img'].includes(type)) result = 'array'
            else if (['tree', 'cascader'].includes(type)) result = 'tree'
            else if (['radio', 'checkbox', 'select'].includes(type)) result = 'select'
            else result = type

            return prefix + result
        }
    },
    watch: {
        'data.required'(val) {
            if (val) this.validator.required = {required: true, message: `${this.data.label}必须填写`}
            else this.validator.required = null
            this.generateRule()
        },
        'data.pattern'(val) {
            if (val) this.validator.pattern = {pattern: new RegExp(val), message: `${this.data.label}格式不匹配`}
            else this.validator.pattern = null
            this.generateRule()
        }
    },
    data() {
      return {
        fields,
        collapse: ['1', '2', '3'],
        validator: {
            type: null,
            required: null,
            pattern: null,
            length: null
        }
      }
    },
    methods: {
        generateRule() {
            const rules = [];
            Object.keys(this.validator).forEach(key => {
                if (this.validator[key]) rules.push(this.validator[key])
            })
            if (rules.length === 0) delete this.data.rules
            else this.data.rules = rules
        },
    }
}
</script>
  