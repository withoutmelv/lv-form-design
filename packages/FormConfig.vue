<template>
    <div class="form-config-container">
        <el-form label-position="left"
                 label-suffix="："
                 label-width="130px"
                 size="small">
            <el-form-item label="标签对齐方式">
                <el-select v-model="data.labelPosition"
                           placeholder="标签对齐方式">
                    <el-option label="左对齐"
                               value="left"></el-option>
                    <el-option label="右对齐"
                               value="right"></el-option>       
                    <el-option label="顶部对齐"
                               value="top"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签宽度">
                <el-input-number v-model="data.labelWidth"
                                 :min="80"
                                 :max="200"
                                 :step="10"
                                 controls-position="right"
                                 placeholder="标签宽度"
                                 style="width: 100%"></el-input-number>
            </el-form-item>
            <el-form-item label="标签后缀">
                <el-input v-model="data.labelSuffix"
                          placeholder="标签后缀"></el-input>
            </el-form-item>
            <el-form-item label="项之间的间隔">
                <el-input-number v-model="data.gutter"
                                 :min="0"
                                 :max="60"
                                 :step="5"
                                 controls-position="right"
                                 placeholder="项之间的间隔"
                                 style="width: 100%"></el-input-number>
            </el-form-item>
            <el-form-item label="多分组转标签">
                <el-switch v-model="data.tabs"
                           active-color="#409EFF"></el-switch>
            </el-form-item>
            <el-form-item label="默认tab" v-if="data.tabs">
                <el-input-number v-model="data.tabsActive"
                                 :min="1"
                                 controls-position="right"
                                 placeholder="默认tab"
                                 style="width: 100%"></el-input-number>    
            </el-form-item>
            <el-form-item label="详情模式">
                <el-switch v-model="data.detail"></el-switch>
            </el-form-item>
            <el-form-item label="显示按钮">
                <el-switch v-model="data.menuBtn"
                           active-color="#409EFF"></el-switch>
            </el-form-item>
            <el-form-item label="显示提交按钮"
                          v-if="data.menuBtn">
                <el-switch v-model="data.submitBtn"
                           avtive-color="#409EFF"></el-switch>
            </el-form-item>
            <el-form-item label="提交按钮的文字"
                          v-if="data.menuBtn && data.submitBtn">
                <el-input v-model="data.submitText"
                          placeholder="提交按钮的文字"></el-input>
            </el-form-item>
            <el-form-item label="显示清空按钮"
                          v-if="data.menuBtn">
                <el-switch v-model="data.emptyBtn"
                           active-color="#409EFF"></el-switch>
            </el-form-item>
            <el-form-item label="清空按钮的文字"
                          v-if="data.menuBtn && data.emptyBtn">
                <el-input v-model="data.emptyText"
                          placeholder="清空按钮的文字"></el-input>
            </el-form-item>
            <el-form-item label="全局只读">
                <el-switch v-model="data.readonly"></el-switch>
            </el-form-item>
            <el-form-item label="全局禁用">
                <el-switch v-model="data.disabled"></el-switch>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
/* eslint-disable */
export default {
    name: 'form-config',
    props: ['data']
}
</script>
  