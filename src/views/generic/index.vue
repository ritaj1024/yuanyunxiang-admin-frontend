<template>
  <div v-if="page" class="page-shell">
    <el-card class="panel-card" shadow="never">

          <template v-if="isListPage">
            <el-form class="filter-form" inline label-width="92px">
              <el-form-item v-for="item in queryFields" :key="item.label" :label="item.label">
                <el-date-picker
                  v-if="item.type === 'date-range'"
                  v-model="searchModel[item.label]"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  unlink-panels
                />
                <el-select
                  v-else-if="item.type === 'select'"
                  v-model="searchModel[item.label]"
                  clearable
                  :placeholder="`请选择${item.label}`"
                >
                  <el-option
                    v-for="option in item.options || []"
                    :key="option"
                    :label="option"
                    :value="option"
                  />
                </el-select>
                <el-input
                  v-else
                  v-model="searchModel[item.label]"
                  clearable
                  :placeholder="item.placeholder || `请输入${item.label}`"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
                <el-button @click="handleReset">重置</el-button>
              </el-form-item>
            </el-form>

            <div class="list-toolbar">
              <div class="list-toolbar-left">
                <el-button
                  v-for="action in toolbarActions"
                  :key="action"
                  size="small"
                  :type="resolveActionType(action)"
                  plain
                  @click="handleToolbarAction(action)"
                >
                  {{ action }}
                </el-button>
              </div>
              <div class="list-toolbar-right">
                <el-button size="small" @click="refreshTable">刷新</el-button>
                <el-button size="small" @click="toggleColumnView">列显隐</el-button>
              </div>
            </div>
          </template>

          <template v-if="showConfigGroups">
            <div v-for="group in configFieldGroups" :key="group.title" class="preview-group">
              <h4>{{ group.title }}</h4>
              <div class="filter-grid">
                <div v-for="field in group.fields" :key="field.key" class="filter-item-box">
                  <label :class="{ required: field.required }">{{ field.label }}</label>
                  <div v-if="field.type === 'upload'" class="mock-upload-field">
                    <el-input
                      v-model="configModel[field.key]"
                      :placeholder="resolveFieldPlaceholder(field)"
                      :disabled="field.readonly"
                    />
                    <el-button type="primary" plain>上传</el-button>
                  </div>
                  <el-input
                    v-else-if="field.type === 'textarea'"
                    v-model="configModel[field.key]"
                    type="textarea"
                    :rows="field.rows || 3"
                    :maxlength="field.maxLength"
                    show-word-limit
                    :placeholder="resolveFieldPlaceholder(field)"
                    :disabled="field.readonly"
                  />
                  <el-input-number
                    v-else-if="field.type === 'number'"
                    v-model="configModel[field.key]"
                    :min="field.min"
                    :max="field.max"
                    controls-position="right"
                    class="field-number"
                    :disabled="field.readonly"
                  />
                  <el-select
                    v-else-if="field.type === 'select'"
                    v-model="configModel[field.key]"
                    :multiple="Boolean(field.multiple)"
                    :placeholder="resolveFieldPlaceholder(field)"
                    :disabled="field.readonly"
                  >
                    <el-option
                      v-for="option in field.options || []"
                      :key="option"
                      :label="option"
                      :value="option"
                    />
                  </el-select>
                  <el-switch v-else-if="field.type === 'switch'" v-model="configModel[field.key]" :disabled="field.readonly" />
                  <el-date-picker
                    v-else-if="field.type === 'datetime'"
                    v-model="configModel[field.key]"
                    type="datetime"
                    placeholder="请选择时间"
                    :disabled="field.readonly"
                  />
                  <el-input
                    v-else
                    v-model="configModel[field.key]"
                    :maxlength="field.maxLength"
                    show-word-limit
                    :placeholder="resolveFieldPlaceholder(field)"
                    :disabled="field.readonly"
                  />
                  <div class="field-meta-tags">
                    <el-tag v-if="field.required" size="small" type="danger" effect="plain">必填</el-tag>
                    <el-tag v-if="field.readonly" size="small" effect="plain">只读</el-tag>
                    <el-tag v-if="field.maxLength" size="small" type="info" effect="plain">≤{{ field.maxLength }}字符</el-tag>
                    <el-tag v-if="field.min != null || field.max != null" size="small" type="info" effect="plain">
                      {{ field.min ?? 0 }}~{{ field.max ?? '∞' }}
                    </el-tag>
                  </div>
                  <div v-if="field.description" class="field-description">{{ field.description }}</div>
                  <div v-if="field.example" class="field-example">样例：{{ field.example }}</div>
                </div>
              </div>
            </div>
            <div v-if="!isListPage" class="query-actions">
              <el-button
                v-for="action in page.actions || []"
                :key="action"
                :type="resolvePrimaryAction(action)"
                @click="handleConfigAction(action)"
              >
                {{ action }}
              </el-button>
            </div>
          </template>

          <template v-if="page.detailSections?.length">
            <div v-for="section in page.detailSections" :key="section.title" class="preview-group">
              <h4>{{ section.title }}</h4>
              <ul class="mini-list">
                <li v-for="item in section.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </template>

          <template v-if="page.tabs?.length">
            <el-tabs v-model="activeTabName" type="border-card" class="preview-tabs">
              <el-tab-pane v-for="tab in page.tabs" :key="tab.name" :label="tab.name" :name="tab.name">
                <template v-if="tab.columns?.length && tab.mockRows?.length">
                  <div v-if="tab.actions?.length" class="list-toolbar" style="padding-top:0">
                    <div class="list-toolbar-left">
                      <el-button
                        v-for="action in tab.actions"
                        :key="action"
                        size="small"
                        :type="resolveActionType(action)"
                        plain
                        @click="handleTabRowAction(action, null)"
                      >
                        {{ action }}
                      </el-button>
                    </div>
                  </div>
                  <el-table :data="tab.mockRows" border stripe size="small">
                    <el-table-column v-for="column in tab.columns" :key="column" :label="column" min-width="120">
                      <template #default="{ row }">
                        <template v-if="column === '操作'">
                          <div class="table-action-links">
                            <el-button
                              v-for="action in (tab.actions || ['详情'])"
                              :key="action"
                              link
                              size="small"
                              :type="resolveActionLinkType(action)"
                              @click="handleTabRowAction(action, row)"
                            >
                              {{ action }}
                            </el-button>
                          </div>
                        </template>
                        <template v-else-if="isStatusColumn(column) || column === '风险等级' || column === '异常标记' || column === '登录结果'">
                          <el-tag :type="resolveStatusTagType(row[column])" size="small">{{ row[column] }}</el-tag>
                        </template>
                        <template v-else>
                          {{ row[column] }}
                        </template>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
                <ul v-else class="mini-list">
                  <li v-for="point in tab.points" :key="point">{{ point }}</li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </template>

          <template v-if="page.type === 'workbench'">
            <div class="workbench-stats">
              <el-tag v-for="item in workbenchStatTags" :key="item.label" :type="item.type">
                {{ item.label }}：{{ item.value }}
              </el-tag>
            </div>
            <div class="workbench-grid">
              <div class="workbench-box">
                <h4>左侧帖子内容区</h4>
                <ul class="mini-list">
                  <li v-for="item in workbenchLeftSections" :key="item">
                    {{ item }}：{{ resolveWorkbenchValue(item) }}
                  </li>
                </ul>
                <p class="post-content">
                  {{ currentWorkbenchItem.content }}
                </p>
                <div class="mock-image-grid">
                  <span v-for="item in 3" :key="item">图片 {{ item }}</span>
                </div>
              </div>
              <div class="workbench-box">
                <h4>右侧操作区</h4>
                <ul class="mini-list">
                  <li v-for="item in workbenchRightSections" :key="item">
                    {{ item }}：{{ resolveWorkbenchValue(item) }}
                  </li>
                </ul>
                <div class="workbench-actions">
                  <el-button type="success" @click="handleWorkbenchAction('通过')">通过</el-button>
                  <el-button type="warning" @click="handleWorkbenchAction('驳回')">驳回</el-button>
                  <el-button type="danger" @click="handleWorkbenchAction('删除')">删除</el-button>
                  <el-button @click="handleWorkbenchAction('下一条')">下一条</el-button>
                </div>
              </div>
            </div>
          </template>

          <template v-if="page.preview">
            <div class="preview-group">
              <h4>{{ page.preview.title }}</h4>
              <p class="preview-caption">{{ page.preview.caption }}</p>
              <div class="share-preview-grid">
                <div v-for="mode in page.preview.modes" :key="mode" class="share-preview-card">
                  <strong>{{ mode }}</strong>
                  <p v-for="line in page.preview.lines" :key="line">{{ line }}</p>
                </div>
              </div>
            </div>
          </template>

          <template v-if="page.columns?.length">
            <el-table
              :data="pagedRows"
              border
              stripe
              @selection-change="handleSelectionChange"
            >
              <el-table-column v-if="isListPage" type="selection" width="50" align="center" />
              <el-table-column v-for="column in page.columns" :key="column" :label="column" min-width="120">
                <template #default="{ row }">
                  <template v-if="column === '操作'">
                    <div class="table-action-links">
                      <el-button
                        v-for="action in row.__actions"
                        :key="action"
                        link
                        size="small"
                        :type="resolveActionLinkType(action)"
                        @click="handleRowAction(action, row)"
                      >
                        {{ action }}
                      </el-button>
                    </div>
                  </template>
                  <template v-else-if="isStatusColumn(column)">
                    <el-tag :type="resolveStatusTagType(row[column])" size="small">{{ row[column] }}</el-tag>
                  </template>
                  <template v-else>
                    {{ row[column] }}
                  </template>
                </template>
              </el-table-column>
            </el-table>
            <div v-if="isListPage" class="list-pagination">
              <div class="list-pagination-total">共 {{ filteredRows.length }} 条</div>
              <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="filteredRows.length"
                :page-size="pagination.pageSize"
                :current-page="pagination.page"
                :page-sizes="[10, 20, 30]"
                @size-change="handlePageSizeChange"
                @current-change="handlePageChange"
              />
            </div>
          </template>

          <template v-if="page.charts?.length">
            <div class="chart-grid">
              <div v-for="chart in page.charts" :key="chart" class="chart-box">
                <h4>{{ chart }}</h4>
                <div class="chart-placeholder">图表占位 / ECharts 接入位</div>
              </div>
            </div>
          </template>

          <template v-if="page.type === 'security' && page.id === 'role-manage'">
            <div class="preview-group">
              <h4>树形权限配置</h4>
              <el-tree
                show-checkbox
                default-expand-all
                node-key="id"
                :data="permissionTree"
                :props="{ children: 'children', label: 'label' }"
              />
            </div>
          </template>
    </el-card>

    <el-dialog
      v-model="editorDialog.visible"
      :title="editorDialog.title"
      width="720px"
      destroy-on-close
    >
      <el-form label-width="110px">
        <div v-for="group in editorFieldGroups" :key="group.title || group.fields.map((field) => field.key).join('-')" class="preview-group">
          <h4 v-if="group.title">{{ group.title }}</h4>
          <div class="filter-grid">
            <div v-for="field in group.fields" :key="field.key" class="filter-item-box">
              <label :class="{ required: field.required }">{{ field.label }}</label>
              <div v-if="field.type === 'upload'" class="mock-upload-field">
                <el-input
                  v-model="editorForm[field.key]"
                  :placeholder="resolveFieldPlaceholder(field)"
                  :disabled="field.readonly"
                />
                <el-button type="primary" plain>上传</el-button>
              </div>
              <el-input
                v-else-if="field.type === 'textarea'"
                v-model="editorForm[field.key]"
                type="textarea"
                :rows="field.rows || 3"
                :maxlength="field.maxLength"
                show-word-limit
                :placeholder="resolveFieldPlaceholder(field)"
                :disabled="field.readonly"
              />
              <el-input-number
                v-else-if="field.type === 'number'"
                v-model="editorForm[field.key]"
                :min="field.min"
                :max="field.max"
                controls-position="right"
                class="field-number"
                :disabled="field.readonly"
              />
              <el-select
                v-else-if="field.type === 'select'"
                v-model="editorForm[field.key]"
                :multiple="Boolean(field.multiple)"
                :placeholder="resolveFieldPlaceholder(field)"
                :disabled="field.readonly"
              >
                <el-option
                  v-for="option in field.options || []"
                  :key="option"
                  :label="option"
                  :value="option"
                />
              </el-select>
              <el-switch v-else-if="field.type === 'switch'" v-model="editorForm[field.key]" :disabled="field.readonly" />
              <el-date-picker
                v-else-if="field.type === 'datetime'"
                v-model="editorForm[field.key]"
                type="datetime"
                placeholder="请选择时间"
                :disabled="field.readonly"
              />
              <el-input
                v-else
                v-model="editorForm[field.key]"
                :maxlength="field.maxLength"
                show-word-limit
                :placeholder="resolveFieldPlaceholder(field)"
                :disabled="field.readonly"
              />
              <div class="field-meta-tags">
                <el-tag v-if="field.required" size="small" type="danger" effect="plain">必填</el-tag>
                <el-tag v-if="field.readonly" size="small" effect="plain">只读</el-tag>
                <el-tag v-if="field.maxLength" size="small" type="info" effect="plain">≤{{ field.maxLength }}字符</el-tag>
                <el-tag v-if="field.min != null || field.max != null" size="small" type="info" effect="plain">
                  {{ field.min ?? 0 }}~{{ field.max ?? '∞' }}
                </el-tag>
              </div>
              <div v-if="field.description" class="field-description">{{ field.description }}</div>
              <div v-if="field.example" class="field-example">样例：{{ field.example }}</div>
            </div>
          </div>
        </div>
      </el-form>
      <template #footer>
        <el-button @click="editorDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="saveEditor">确定</el-button>
      </template>
    </el-dialog>

    <el-drawer
      v-model="detailDrawer.visible"
      :title="detailDrawer.title"
      size="40%"
      destroy-on-close
    >
      <el-descriptions :column="1" border>
        <el-descriptions-item v-for="(value, key) in detailDrawer.data" :key="key" :label="key">
          {{ value }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>

    <el-dialog
      v-model="messageDialog.visible"
      :title="messageDialog.title"
      width="560px"
      destroy-on-close
    >
      <el-input
        v-model="messageDialog.content"
        type="textarea"
        :rows="5"
        placeholder="请输入消息内容"
      />
      <template #footer>
        <el-button @click="messageDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="submitMessage">发送</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRoute } from 'vue-router';
import { pageMap } from '@/data/modules';
import { createTableRows } from '@/utils/preview';

const defaultPermissionTree = [
  {
    id: 'incense',
    label: '香室管理',
    children: [
      { id: 'incense-view', label: '查看' },
      { id: 'incense-type', label: '编辑香型 / 场景素材' },
      { id: 'incense-rule', label: '编辑规则' },
      { id: 'incense-prayer', label: '审核祈福语' }
    ]
  },
  {
    id: 'ranking',
    label: '排行榜管理',
    children: [
      { id: 'ranking-view', label: '查看' },
      { id: 'ranking-edit', label: '修正数据' },
      { id: 'ranking-lock', label: '封榜 / 解封' },
      { id: 'ranking-rule', label: '配置规则' }
    ]
  },
  {
    id: 'share',
    label: '分享管理',
    children: [
      { id: 'share-view', label: '查看' },
      { id: 'share-rule', label: '编辑规则' },
      { id: 'share-card', label: '编辑卡片模板' }
    ]
  },
  {
    id: 'forum',
    label: '论坛管理',
    children: [
      { id: 'forum-view', label: '查看' },
      { id: 'forum-post', label: '审核帖子' },
      { id: 'forum-comment', label: '管理评论' },
      { id: 'forum-report', label: '处理举报' },
      { id: 'forum-official', label: '发布官方帖' },
      { id: 'forum-top', label: '置顶 / 加精' },
      { id: 'forum-category', label: '管理分类' }
    ]
  },
  {
    id: 'user',
    label: '用户管理',
    children: [
      { id: 'user-view', label: '查看' },
      { id: 'user-edit', label: '编辑信息' },
      { id: 'user-ban', label: '禁言 / 封号' },
      { id: 'user-level', label: '调整等级' },
      { id: 'user-message', label: '发消息' }
    ]
  },
  {
    id: 'message',
    label: '消息中心',
    children: [
      { id: 'message-notice', label: '发布公告' },
      { id: 'message-push', label: '推送消息' },
      { id: 'message-feedback', label: '处理反馈' }
    ]
  },
  {
    id: 'statistics',
    label: '数据统计',
    children: [
      { id: 'statistics-view', label: '查看报表' },
      { id: 'statistics-export', label: '导出数据' }
    ]
  },
  {
    id: 'system',
    label: '系统管理',
    children: [
      { id: 'system-account', label: '管理账号' },
      { id: 'system-role', label: '管理角色' },
      { id: 'system-log', label: '查看日志' },
      { id: 'system-config', label: '系统配置' }
    ]
  }
];

const route = useRoute();

const page = computed(() => pageMap[route.meta.pageId]);
const isListPage = computed(() => page.value?.type === 'list');
const configFieldGroups = computed(() => normalizeFieldGroups(page.value?.formGroups || []));
const showConfigGroups = computed(() => configFieldGroups.value.length && page.value.type !== 'list');
const activeTabName = ref('');
const searchModel = ref({});
const configModel = ref({});
const rows = ref([]);
const selectedRows = ref([]);
const pagination = reactive({
  page: 1,
  pageSize: 10
});

const editorDialog = reactive({
  visible: false,
  title: '',
  mode: 'create',
  action: '',
  rowId: null
});
const editorForm = reactive({});
const detailDrawer = reactive({
  visible: false,
  title: '',
  data: {}
});
const messageDialog = reactive({
  visible: false,
  title: '',
  row: null,
  content: ''
});

const workbenchQueue = ref([]);
const currentWorkbenchIndex = ref(0);

const toolbarActions = computed(() => {
  const actions = page.value?.actions || [];
  const rowActions = ['详情', '编辑', '查看', '通过', '驳回', '删除', '置顶', '加精', '禁言', '封号', '发消息', '处理', '上线', '下线', '解封', '编辑模板'];
  return actions.filter((action) => !rowActions.includes(normalizeAction(action)));
});

const filteredRows = computed(() => {
  if (!isListPage.value) return rows.value;
  return rows.value.filter((row) =>
    queryFields.value.every((field) => {
      const value = searchModel.value[field.label];
      if (value === '' || value == null || (Array.isArray(value) && value.length === 0)) {
        return true;
      }
      if (value === '全部') {
        return true;
      }
      if (field.type === 'date-range') {
        return true;
      }
      const haystack = Object.values(row).join(' ');
      return haystack.includes(String(value));
    })
  );
});

const pagedRows = computed(() => {
  if (!isListPage.value) return rows.value;
  const start = (pagination.page - 1) * pagination.pageSize;
  return filteredRows.value.slice(start, start + pagination.pageSize);
});

const queryFields = computed(() => {
  if (page.value?.queryDefinitions?.length) {
    return page.value.queryDefinitions;
  }
  return (page.value?.query || []).map((label) => ({
    label,
    type: isQueryDate(label) ? 'date-range' : isQuerySelect(label) ? 'select' : 'text',
    options: isQuerySelect(label) ? getSelectOptions(label) : undefined
  }));
});

const editableFields = computed(() => {
  if (page.value?.editorGroups?.length) {
    return flattenGroups(page.value.editorGroups);
  }
  if (page.value?.formGroups?.length) {
    return flattenGroups(page.value.formGroups).filter((field) => !field.includes('看板') && !field.includes('图'));
  }
  return (page.value?.columns || []).filter((column) => !['操作', '状态', '处理状态'].includes(column)).slice(0, 8);
});

const editorFieldGroups = computed(() => {
  const actionForm = findActionForm(editorDialog.action);
  if (actionForm?.groups?.length) {
    return normalizeFieldGroups(actionForm.groups);
  }
  if (page.value?.editorGroups?.length) {
    return normalizeFieldGroups(page.value.editorGroups);
  }
  if (page.value?.formGroups?.length) {
    return configFieldGroups.value;
  }
  return [{ title: '基础信息', fields: normalizeFields(editableFields.value) }];
});

const currentWorkbenchItem = computed(() => workbenchQueue.value[currentWorkbenchIndex.value] || workbenchQueue.value[0] || {
  risk: '中',
  content: '当前没有待审核内容',
  violationCount: 0,
  similarity: 0,
  author: '善信·用户',
  type: '自由发帖',
  registerTime: '2026-03-01',
  recentViolation: '2026-03-20'
});

const permissionTree = computed(() => page.value?.permissionTree || defaultPermissionTree);
const workbenchStats = computed(() => page.value?.workbench?.stats || ['待审核数量', '今日已审数量', '平均处理时长']);
const workbenchLeftSections = computed(() => page.value?.workbench?.leftSections || ['帖子类型', '帖子内容', '帖子图片', '作者信息']);
const workbenchRightSections = computed(() => page.value?.workbench?.rightSections || ['用户历史违规', '相似内容检测', '驳回原因', '补充说明']);
const workbenchStatTags = computed(() => workbenchStats.value.map((label, index) => ({
  label,
  value: resolveWorkbenchValue(label),
  type: ['danger', 'info', 'warning'][index % 3]
})));

watch(
  () => page.value?.id,
  () => {
    if (!page.value) return;
    initializePageState();
  },
  { immediate: true }
);

function initializePageState() {
  activeTabName.value = page.value?.tabs?.[0]?.name || '';
  searchModel.value = Object.fromEntries(
    queryFields.value.map((field) => [field.label, field.type === 'date-range' ? [] : ''])
  );
  configModel.value = Object.fromEntries(
    configFieldGroups.value.flatMap((group) =>
      group.fields.map((field) => [field.key, getFieldInitialValue(field)])
    )
  );
  rows.value = createMockRows(page.value);
  selectedRows.value = [];
  pagination.page = 1;
  pagination.pageSize = 10;
  editorDialog.visible = false;
  editorDialog.action = '';
  detailDrawer.visible = false;
  messageDialog.visible = false;
  messageDialog.content = '';
  workbenchQueue.value = createWorkbenchQueue();
  currentWorkbenchIndex.value = 0;
}

function createMockRows(currentPage) {
  if (!currentPage?.columns) return [];
  if (currentPage.mockRows?.length) {
    return currentPage.mockRows.map((row, index) => decorateRow(currentPage, row, index));
  }
  return createTableRows(currentPage.columns, 18).map((row, index) => {
    const record = Object.fromEntries(currentPage.columns.map((column, columnIndex) => [column, row[columnIndex]]));
    return decorateRow(currentPage, record, index);
  });
}

function decorateRow(currentPage, sourceRow, index) {
  const record = { ...sourceRow };
  currentPage.columns.forEach((column) => {
    if (!(column in record)) {
      record[column] = '';
    }
  });
    record.__id = `${currentPage.id}-${index + 1}`;
    record.__actions = resolveRowActions(currentPage);
    if (currentPage.columns.includes('状态')) {
      record['状态'] = record['状态'] || resolveStatusValue(currentPage, index);
    }
    if (currentPage.columns.includes('处理状态')) {
      record['处理状态'] = record['处理状态'] || ['待处理', '已处理-有效', '已处理-无效'][index % 3];
    }
    if (currentPage.columns.includes('封禁类型')) {
      record['封禁类型'] = record['封禁类型'] || ['禁言', '封号'][index % 2];
    }
    if (currentPage.columns.includes('操作')) {
      record['操作'] = '';
    }
    if (currentPage.columns.includes('用户头像/昵称')) {
      record['用户头像/昵称'] = record['用户头像/昵称'] || `善信·用户${index + 1}`;
    }
    if (currentPage.columns.includes('头像/昵称')) {
      record['头像/昵称'] = record['头像/昵称'] || `善信·用户${index + 1}`;
    }
    if (currentPage.columns.includes('作者')) {
      record['作者'] = record['作者'] || `善信·张三 Lv.${(index % 6) + 1}`;
    }
    if (currentPage.columns.includes('标题/内容摘要')) {
      record['标题/内容摘要'] = record['标题/内容摘要'] || `关于${currentPage.title}的示例内容 ${index + 1}`;
    }
    if (currentPage.columns.includes('登录邮箱')) {
      record['登录邮箱'] = record['登录邮箱'] || `admin${index + 1}@example.com`;
    }
    if (currentPage.columns.includes('IP地址')) {
      record['IP地址'] = record['IP地址'] || `192.168.1.${100 + index}`;
    }
    if (currentPage.columns.includes('文件大小')) {
      record['文件大小'] = record['文件大小'] || `${12 + index}MB`;
    }
    if (currentPage.columns.includes('下载链接')) {
      record['下载链接'] = record['下载链接'] || `https://download.example.com/task-${index + 1}.xlsx`;
    }
    if (currentPage.columns.includes('展示时段')) {
      record['展示时段'] = record['展示时段'] || '2026-04-01 10:00 至 2026-04-07 10:00';
    }
    if (currentPage.columns.includes('跳转类型')) {
      record['跳转类型'] = record['跳转类型'] || (index % 2 === 0 ? '小程序页面' : '外部H5');
    }
    if (currentPage.columns.includes('跳转目标')) {
      record['跳转目标'] = record['跳转目标'] || (index % 2 === 0 ? '/pages/incense/detail' : 'https://example.com/activity');
    }
    if (currentPage.columns.includes('默认播放')) {
      record['默认播放'] = record['默认播放'] || (index % 3 === 0 ? '是' : '否');
    }
    if (currentPage.columns.includes('公告类型')) {
      record['公告类型'] = record['公告类型'] || ['弹窗', '横幅', '消息'][index % 3];
    }
    return record;
}

function createWorkbenchQueue() {
  return [
    {
      id: 1,
      risk: '中',
      content: '今天在缘·云香为家人祈福，顺便想找同修一起交流，欢迎加 VX 细聊……',
      violationCount: 2,
      similarity: 86,
      author: '善信·张三 Lv.3',
      type: '自由发帖',
      registerTime: '2026-01-15',
      recentViolation: '2026-03-20'
    },
    {
      id: 2,
      risk: '高',
      content: '加群领资料，扫码进群获取祈福秘籍和排行榜加成。',
      violationCount: 4,
      similarity: 92,
      author: '善信·李四 Lv.2',
      type: '问答',
      registerTime: '2026-02-01',
      recentViolation: '2026-03-26'
    },
    {
      id: 3,
      risk: '低',
      content: '愿家人平安，愿生活顺遂，也愿诸位善信皆得自在。',
      violationCount: 0,
      similarity: 12,
      author: '善信·王五 Lv.5',
      type: '善愿',
      registerTime: '2026-01-22',
      recentViolation: '无'
    }
  ];
}

function handleSearch() {
  pagination.page = 1;
  ElMessage.success('已按当前条件筛选');
}

function handleReset() {
  searchModel.value = Object.fromEntries(
    queryFields.value.map((field) => [field.label, field.type === 'date-range' ? [] : ''])
  );
  pagination.page = 1;
  ElMessage.success('筛选条件已重置');
}

function refreshTable() {
  rows.value = createMockRows(page.value);
  selectedRows.value = [];
  ElMessage.success('列表已刷新');
}

function toggleColumnView() {
  ElMessage.info('列显隐面板可在下一步拆分为独立组件');
}

function handleSelectionChange(selection) {
  selectedRows.value = selection;
}

function handlePageChange(value) {
  pagination.page = value;
}

function handlePageSizeChange(value) {
  pagination.pageSize = value;
  pagination.page = 1;
}

function handleToolbarAction(action) {
  const normalized = normalizeAction(action);
  const actionForm = findActionForm(normalized);

  switch (normalized) {
    case '新增':
      openEditor('create');
      break;
    case '新建推送':
      openEditor('action', null, action);
      break;
    case '批量删除':
      handleBatchDelete();
      break;
    case '批量通过':
      updateSelectedStatus('已发布', '已批量通过');
      break;
    case '批量驳回':
      updateSelectedStatus('已驳回', '已批量驳回');
      break;
    case '批量解封':
      updateSelectedStatus('正常', '已批量解封');
      break;
    case '导出':
      if (actionForm) {
        openEditor('action', null, action);
      } else {
        ElMessage.success('已生成导出任务（示意）');
      }
      break;
    default:
      if (actionForm) {
        openEditor('action', null, action);
      } else if (normalized === '发布' || normalized.includes('保存')) {
        ElMessage.success(`${action}成功`);
      } else {
        ElMessage.info(`已触发${action}操作`);
      }
  }
}

async function handleBatchDelete() {
  if (!selectedRows.value.length) {
    ElMessage.warning('请先勾选需要删除的数据');
    return;
  }
  await ElMessageBox.confirm(`确认删除选中的 ${selectedRows.value.length} 条记录吗？`, '提示', {
    type: 'warning'
  });
  const ids = new Set(selectedRows.value.map((item) => item.__id));
  rows.value = rows.value.filter((row) => !ids.has(row.__id));
  selectedRows.value = [];
  ElMessage.success('批量删除成功');
}

function updateSelectedStatus(status, message) {
  if (!selectedRows.value.length) {
    ElMessage.warning('请先勾选数据');
    return;
  }
  const ids = new Set(selectedRows.value.map((item) => item.__id));
  rows.value = rows.value.map((row) => (ids.has(row.__id) ? updateRowStatus(row, status) : row));
  ElMessage.success(message);
}

function handleRowAction(action, row) {
  const normalized = normalizeAction(action);
  const actionForm = findActionForm(normalized);

  if (actionForm && !['详情', '查看', '编辑', '编辑模板', '权限配置'].includes(normalized)) {
    openEditor('action', row, action);
    return;
  }

  switch (normalized) {
    case '详情':
    case '查看':
      openDetail(row);
      break;
    case '编辑':
    case '编辑模板':
    case '权限配置':
    case '修正数据':
      openEditor('edit', row, action);
      break;
    case '删除':
    case '删除模板':
      confirmDelete(row);
      break;
    case '通过':
      mutateRow(row, '已发布', '已通过审核');
      break;
    case '禁言':
      mutateRow(row, '禁言中', '已设置禁言');
      break;
    case '封号':
      mutateRow(row, '已封号', '已执行封号');
      break;
    case '发消息':
    case '发送':
      openMessage(row);
      break;
    case '启用':
      mutateRow(row, '启用', '已启用');
      break;
    case '禁用':
    case '停用':
      mutateRow(row, normalized === '停用' ? '停用' : '禁用', `已${normalized}`);
      break;
    case '发布':
      mutateRow(row, '已发布', '已发布');
      break;
    case '试听':
    case '预览':
    case '重置密码':
    case '重置头像':
    case '重置昵称':
    case '清空签名':
    case '解绑手机':
      ElMessage.success(`${normalized}操作已执行`);
      break;
    case '关闭':
      mutateRow(row, '已关闭', '已关闭当前记录');
      break;
    case '封榜':
      mutateRow(row, '封榜中', '已封榜');
      break;
    case '上线':
      mutateRow(row, '上线', '已上线');
      break;
    case '下线':
      mutateRow(row, '下线', '已下线');
      break;
    case '解封':
      mutateRow(row, '正常', '已解除封禁');
      break;
    case '置顶':
    case '加精':
      ElMessage.success(`${action}操作已执行`);
      break;
    case '处理':
      openDetail(row, '举报处理详情');
      break;
    default:
      ElMessage.info(`已触发${action}`);
  }
}

function openEditor(mode, row = null, action = '') {
  const normalizedAction = normalizeAction(action);
  const actionForm = findActionForm(normalizedAction);
  const groups = actionForm?.groups?.length
    ? normalizeFieldGroups(actionForm.groups)
    : page.value?.editorGroups?.length
      ? normalizeFieldGroups(page.value.editorGroups)
      : page.value?.formGroups?.length
        ? configFieldGroups.value
        : [{ title: '基础信息', fields: normalizeFields(editableFields.value) }];

  editorDialog.mode = mode;
  editorDialog.action = normalizedAction;
  editorDialog.rowId = row?.__id || null;
  editorDialog.title = actionForm?.title || (mode === 'create' ? `新增${page.value.title}` : `编辑${page.value.title}`);

  Object.keys(editorForm).forEach((key) => {
    delete editorForm[key];
  });

  flattenGroups(groups).forEach((field) => {
    const meta = normalizeField(field);
    editorForm[meta.key] = row?.[meta.key] || getFieldInitialValue(meta);
  });

  editorDialog.visible = true;
}

function saveEditor() {
  const actionForm = findActionForm(editorDialog.action);

  if (editorDialog.mode === 'create') {
    const record = Object.fromEntries((page.value.columns || []).map((column) => [column, '']));
    editableFields.value.forEach((field) => {
      const meta = normalizeField(field);
      if (meta.key in record || !page.value.columns?.length) {
        record[meta.key] = editorForm[meta.key];
      }
    });
    record.__id = `${page.value.id}-${Date.now()}`;
    record.__actions = resolveRowActions(page.value);
    if (page.value.columns?.includes('状态')) {
      record['状态'] = resolveStatusValue(page.value, 0);
    }
    rows.value.unshift(record);
    ElMessage.success('新增成功');
  } else if (editorDialog.mode === 'edit') {
    rows.value = rows.value.map((row) => {
      if (row.__id !== editorDialog.rowId) return row;
      return {
        ...row,
        ...editorForm
      };
    });
    ElMessage.success('编辑成功');
  } else {
    if (editorDialog.rowId) {
      rows.value = rows.value.map((row) => {
        if (row.__id !== editorDialog.rowId) return row;
        const next = {
          ...row,
          ...editorForm
        };
        return actionForm?.effectStatus ? updateRowStatus(next, actionForm.effectStatus) : next;
      });
    }
    ElMessage.success(`${editorDialog.title}已提交`);
  }
  editorDialog.visible = false;
}

function openDetail(row, title = `${page.value.title}详情`) {
  detailDrawer.title = title;
  detailDrawer.data = Object.fromEntries(
    Object.entries(row).filter(([key]) => !key.startsWith('__'))
  );
  detailDrawer.visible = true;
}

function openMessage(row) {
  messageDialog.row = row;
  messageDialog.title = `发送消息 - ${row['头像/昵称'] || row['用户头像/昵称'] || row['用户昵称'] || '目标用户'}`;
  messageDialog.content = '';
  messageDialog.visible = true;
}

function submitMessage() {
  if (!messageDialog.content.trim()) {
    ElMessage.warning('请输入消息内容');
    return;
  }
  messageDialog.visible = false;
  ElMessage.success('消息已发送');
}

async function confirmDelete(row) {
  await ElMessageBox.confirm('确认删除当前记录吗？', '提示', {
    type: 'warning'
  });
  rows.value = rows.value.filter((item) => item.__id !== row.__id);
  ElMessage.success('删除成功');
}

function mutateRow(row, status, message) {
  rows.value = rows.value.map((item) => (item.__id === row.__id ? updateRowStatus(item, status) : item));
  ElMessage.success(message);
}

function updateRowStatus(row, status) {
  const next = { ...row };
  if ('状态' in next) {
    next['状态'] = status;
  }
  if ('处理状态' in next) {
    next['处理状态'] = status;
  }
  if ('封禁类型' in next && status === '正常') {
    next['封禁类型'] = '已解除';
  }
  return next;
}

function handleTabRowAction(action, row) {
  const normalized = normalizeAction(action);
  const actionForm = findActionForm(normalized);
  if (actionForm) {
    openEditor('action', row ? { __id: `tab-${Date.now()}`, ...row } : null, action);
    return;
  }
  if (['通过', '启用', '发布'].includes(normalized)) {
    ElMessage.success(`已${normalized}`);
  } else if (['驳回', '删除', '禁言', '封号', '禁用', '停用'].includes(normalized)) {
    ElMessage.success(`已${normalized}`);
  } else if (['详情', '查看'].includes(normalized)) {
    if (row) {
      detailDrawer.title = `${page.value.title}详情`;
      detailDrawer.data = { ...row };
      detailDrawer.visible = true;
    }
  } else if (['编辑', '编辑模板', '修正数据'].includes(normalized)) {
    openEditor('edit', row ? { __id: `tab-${Date.now()}`, ...row } : null, action);
  } else if (['新增'].includes(normalized)) {
    openEditor('create', null, action);
  } else if (['删除模板'].includes(normalized)) {
    ElMessage.success('模板已删除');
  } else {
    ElMessage.info(`已触发${action}`);
  }
}

function handleConfigAction(action) {
  const normalizedAction = normalizeAction(action);
  const actionForm = findActionForm(normalizedAction);
  if (actionForm) {
    openEditor('action', null, action);
    return;
  }
  if (normalizedAction.includes('保存') || normalizedAction === '发布' || normalizedAction === '导出') {
    ElMessage.success(`${action}成功`);
    return;
  }
  if (normalizedAction.includes('重置')) {
    initializePageState();
    ElMessage.success('已恢复默认值');
    return;
  }
  ElMessage.info(`已触发${action}`);
}

function handleWorkbenchAction(action) {
  const normalized = normalizeAction(action);
  const actionForm = findActionForm(normalized);
  if (actionForm) {
    openEditor('action', { __id: `workbench-${currentWorkbenchItem.value.id}`, 帖子内容: currentWorkbenchItem.value.content }, action);
    return;
  }
  if (normalized === '下一条') {
    currentWorkbenchIndex.value = Math.min(currentWorkbenchIndex.value + 1, workbenchQueue.value.length - 1);
    ElMessage.info('已切换到下一条');
    return;
  }
  ElMessage.success(`已${normalized}当前帖子`);
  if (currentWorkbenchIndex.value < workbenchQueue.value.length - 1) {
    currentWorkbenchIndex.value += 1;
  }
}

function normalizeAction(action) {
  return String(action).replace(/（.*?）|\(.*?\)/g, '').trim();
}

function flattenGroups(groups = []) {
  return groups.flatMap((group) => group.fields);
}

function findActionForm(action) {
  return (page.value?.actionForms || []).find((item) => normalizeAction(item.action) === normalizeAction(action));
}

function normalizeField(field) {
  if (typeof field === 'string') {
    return {
      key: field,
      label: field,
      type: inferFieldType(field)
    };
  }
  return {
    key: field.key || field.label,
    label: field.label || field.key,
    type: field.type || inferFieldType(field.label || field.key),
    ...field
  };
}

function normalizeFields(fields = []) {
  return fields.map((field) => normalizeField(field));
}

function normalizeFieldGroups(groups = []) {
  return groups.map((group) => ({
    ...group,
    fields: normalizeFields(group.fields || [])
  }));
}

function getFieldInitialValue(field) {
  if (field.multiple) return [];
  if (field.type === 'switch') return field.defaultValue ?? false;
  if (field.type === 'number') return field.defaultValue ?? null;
  return field.defaultValue ?? '';
}

function inferFieldType(label) {
  if (label.includes('图片') || label.includes('文件')) return 'upload';
  if (label.includes('开关')) return 'switch';
  if (label.includes('时间') || label.includes('日期')) return 'datetime';
  if (label.includes('次数') || label.includes('排序') || label.includes('时长') || label.includes('间隔') || label.includes('阈值') || label.includes('数量')) return 'number';
  if (label.includes('内容') || label.includes('说明') || label.includes('原因') || label.includes('文案')) return 'textarea';
  return 'text';
}

function resolveFieldPlaceholder(field) {
  const meta = normalizeField(field);
  if (meta.placeholder) return meta.placeholder;
  if (meta.type === 'upload') return '请上传文件';
  if (meta.type === 'select') return `请选择${meta.label}`;
  if (meta.type === 'datetime') return '请选择时间';
  if (meta.type === 'textarea') return `请输入${meta.label}`;
  return '输入 / 下拉 / 多选占位';
}

function isPlainInputField(field) {
  const type = normalizeField(field).type;
  return ['text'].includes(type);
}

function isSwitchField(field) {
  return normalizeField(field).type === 'switch';
}

function isDateField(field) {
  return normalizeField(field).type === 'datetime';
}

function isQueryDate(field) {
  return field.includes('日期') || field.includes('时间');
}

function isQuerySelect(field) {
  return field.includes('状态')
    || field.includes('类型')
    || field.includes('等级')
    || field.includes('来源')
    || field.includes('分类')
    || field.includes('渠道')
    || field.includes('是否');
}

function getSelectOptions(field) {
  if (field.includes('状态')) return ['全部', '正常', '启用', '停用', '上线', '下线', '待审核', '已发布', '已驳回', '已删除'];
  if (field.includes('等级')) return ['Lv.1初见', 'Lv.2入门', 'Lv.3游方', 'Lv.4研经', 'Lv.5造像', 'Lv.6圆满'];
  if (field.includes('来源')) return ['全部', '官方帖', '用户帖', '免费', '分享获得', '广告获得'];
  if (field.includes('类型')) return ['全部', '帖子', '评论', '弹窗', '横幅', '消息'];
  if (field.includes('分类')) return ['全部', '自由发帖', '问答互助', '善愿墙', '还愿分享'];
  if (field.includes('渠道')) return ['全部', '自然', '分享', '活动', '好友', '朋友圈'];
  if (field.includes('是否')) return ['全部', '是', '否'];
  return ['全部', '选项一', '选项二'];
}

function resolveActionType(action) {
  const normalizedAction = normalizeAction(action);
  if (['新增', '发布', '保存草稿', '新建推送'].includes(normalizedAction)) return 'primary';
  if (['删除', '批量删除'].includes(normalizedAction)) return 'danger';
  if (['导出', '导入', '导入敏感词'].includes(normalizedAction)) return 'warning';
  return 'default';
}

function resolvePrimaryAction(action) {
  return ['保存', '发布', '导出'].includes(normalizeAction(action)) ? 'primary' : 'default';
}

function resolveActionLinkType(action) {
  const normalizedAction = normalizeAction(action);
  if (['删除', '封号'].includes(normalizedAction)) return 'danger';
  if (['驳回', '禁言', '下线', '停用', '禁用'].includes(normalizedAction)) return 'warning';
  if (['通过', '编辑', '详情', '查看', '处理', '启用', '发布', '解封', '权限配置', '修正数据'].includes(normalizedAction)) return 'primary';
  return 'default';
}

function resolveRowActions(currentPage) {
  const list = (currentPage.actions || []).map((item) => normalizeAction(item));
  const preferred = ['详情', '查看', '编辑', '通过', '驳回', '删除', '处理', '禁言', '封号', '发消息', '回复', '发布', '启用', '禁用', '停用', '置顶', '加精', '上线', '下线', '解封', '权限配置', '修正数据'];
  const matched = preferred.filter((item) => list.includes(item));
  if (currentPage.type === 'list' && !matched.includes('详情') && !matched.includes('查看')) {
    matched.unshift('详情');
  }
  if (currentPage.type === 'list' && list.includes('编辑') && !matched.includes('编辑')) {
    matched.splice(1, 0, '编辑');
  }
  if (matched.length) {
    return matched;
  }
  return currentPage.type === 'list' ? ['详情', '编辑'] : ['详情'];
}

function resolveStatusValue(currentPage, index) {
  if (currentPage.id === 'user-list') return ['正常', '禁言中（剩余3天）', '已封号'][index % 3];
  if (currentPage.id === 'blacklist-manage') return ['禁言', '封号'][index % 2];
  if (currentPage.id === 'post-manage') return ['已发布', '待审核', '已驳回', '已删除'][index % 4];
  if (currentPage.id === 'report-manage') return ['待处理', '已处理-有效', '已处理-无效'][index % 3];
  if (currentPage.id === 'notice-manage') return ['草稿', '已发布', '已过期'][index % 3];
  if (currentPage.id === 'incense-list') return ['上线', '下线'][index % 2];
  if (currentPage.id === 'banner-manage') return ['启用', '禁用'][index % 2];
  if (currentPage.id === 'account-manage') return ['启用', '停用'][index % 2];
  return ['正常', '启用', '待审核'][index % 3];
}

function isStatusColumn(column) {
  return ['状态', '处理状态', '封禁类型'].includes(column);
}

function resolveStatusTagType(value) {
  const text = String(value);
  if (text.includes('已发布') || text.includes('正常') || text.includes('启用') || text.includes('上线') || text.includes('已处理-有效') || text === '成功' || text === '低') return 'success';
  if (text.includes('待') || text.includes('禁言') || text.includes('草稿') || text === '中' || text.includes('疑似')) return 'warning';
  if (text.includes('删除') || text.includes('封号') || text.includes('驳回') || text.includes('无效') || text.includes('下线') || text.includes('停用') || text === '高' || text === '失败' || text === '锁定') return 'danger';
  return 'info';
}

function resolveWorkbenchValue(label) {
  if (label.includes('待审核数量')) return `${workbenchQueue.value.length - currentWorkbenchIndex.value}`;
  if (label.includes('今日已审数量')) return '126';
  if (label.includes('平均处理时长')) return '18s';
  if (label.includes('帖子类型')) return currentWorkbenchItem.value.type;
  if (label.includes('帖子内容')) return '完整文本已展开，敏感词高亮';
  if (label.includes('帖子图片')) return '最多9张，支持放大预览';
  if (label.includes('作者信息')) return `${currentWorkbenchItem.value.author} / 注册于${currentWorkbenchItem.value.registerTime}`;
  if (label.includes('用户历史违规')) return `${currentWorkbenchItem.value.violationCount}次，最近：${currentWorkbenchItem.value.recentViolation}`;
  if (label.includes('相似内容检测')) return `${currentWorkbenchItem.value.similarity}%`;
  if (label.includes('驳回原因')) return '涉政 / 色情 / 广告 / 宗教违规 / 人身攻击 / 其他';
  if (label.includes('补充说明')) return '支持填写不超过200字';
  return '示意数据';
}
</script>
