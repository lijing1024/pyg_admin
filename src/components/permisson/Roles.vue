<template>
  <div class="roles_container">
    <!-- 面包屑导航 -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" plain @click="showAddDialog()">添加角色</el-button>
      <el-table
        :data="rolesList"
        highlight-current-row
        style="width: 100%">
        <!-- 权限列表展开项 -->
        <el-table-column type="expand" width="100">
          <template slot-scope="scope">
            <!-- 一级权限 -->
            <el-row
            style="border-bottom:1px solid #eee"
            :style="{'border-top': i===0?'1px solid #eee':'none'}"
            v-for="(item, i) in scope.row.child"
            :key="item.id">
              <el-col :span="4">
                <el-tag closable>{{item.authName}}</el-tag>
                <span class="el-icon-caret-right"></span>
              </el-col>
              <el-col :span="20">
              <!-- 二级权限 -->
                <el-row
                :style="{'border-top': i===0?'none':'1px solid #eee'}"
                v-for="(secondItem, i) in item.child"
                :key="secondItem.id">
                  <el-col :span="8">
                    <el-tag closable type="success">{{secondItem.authName}}</el-tag>
                    <span class="el-icon-caret-right"></span>
                  </el-col>
                  <el-col :span="16">
                  <!-- 三级权限 -->
                    <el-tag v-for="thirdItem in secondItem.child" :key="thirdItem.id" closable type="warning">{{thirdItem.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="roleName" label="角色名称"></el-table-column>
        <el-table-column property="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
            <el-button icon="el-icon-edit" round @click="showEditDialog(scope.row.id)"></el-button>
            <el-button icon="el-icon-delete"></el-button>
            <el-button icon="el-icon-setting" round></el-button>
          </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" width="400px" :visible.sync="addDialogVisible">
      <el-form :model="addForm" ref="addForm" :rules="addRules" label-width="80px"  autocomplete="off">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible=false">取 消</el-button>
        <el-button @click="addRole()" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog title="编辑角色" width="400px" :visible.sync="editDialogVisible">
      <el-form :model="editForm" ref="editForm" :rules="editRules" label-width="80px"  autocomplete="off">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible=false">取 消</el-button>
        <el-button @click="editRole()" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import mixin from './RolesMixin'
export default {
  mixins: [mixin]
}
</script>
<style>
/* 每级权限居中显示 */
.el-row{
  display: flex;
  align-items: center;
}
/* 设置每个权限标签的margin */
.el-tag{
  margin: 5px;
}
</style>
