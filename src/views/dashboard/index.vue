<template>
  <div class="page-shell">

    <el-row :gutter="16" class="metric-row">
      <el-col v-for="card in metrics" :key="card.label" :xs="24" :sm="12" :lg="8" :xl="4">
        <el-card shadow="hover" class="metric-card">
          <div class="metric-label">{{ card.label }}</div>
          <div class="metric-value">{{ card.value }}</div>
          <div class="metric-foot">{{ card.foot }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :xs="24" :lg="16">
        <el-card class="panel-card" shadow="never">
          <template #header>
            <div class="panel-header">
              <span>趋势图表</span>
              <el-tag type="primary">近7天 / 30天</el-tag>
            </div>
          </template>
          <div class="chart-grid">
            <div class="chart-box">
              <h4>上香趋势图</h4>
              <div class="bar-grid">
                <span v-for="height in [45, 62, 71, 80, 66, 88, 76]" :key="height" class="bar" :style="{ height: `${height}%` }" />
              </div>
            </div>
            <div class="chart-box">
              <h4>用户活跃时段热力图</h4>
              <div class="heat-grid">
                <span v-for="item in 32" :key="item" class="heat" :class="`level-${(item % 4) + 1}`" />
              </div>
            </div>
            <div class="chart-box">
              <h4>香型偏好分布</h4>
              <ul class="mini-list">
                <li>平安香 26%</li>
                <li>青云香 18%</li>
                <li>芝兰香 15%</li>
                <li>连理香 13%</li>
              </ul>
            </div>
            <div class="chart-box">
              <h4>新增与留存</h4>
              <ul class="mini-list">
                <li>次日留存 38%</li>
                <li>7日留存 21%</li>
                <li>30日留存 11%</li>
              </ul>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="8">
        <el-card class="panel-card" shadow="never">
          <template #header>
            <div class="panel-header">
              <span>异常预警</span>
              <el-tag type="danger">实时监控</el-tag>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item v-for="item in alerts" :key="item.title" :type="item.type" :timestamp="item.tip">
              <strong>{{ item.title }}</strong>
              <div>{{ item.desc }}</div>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const metrics = [
  { label: '今日活跃用户（DAU）', value: '2,580', foot: '较昨日 +12%' },
  { label: '今日上香次数', value: '8,960', foot: '较昨日 +8%' },
  { label: '今日新增用户', value: '156', foot: '较昨日 -3%' },
  { label: '今日分享次数', value: '320', foot: '较昨日 +15%' },
  { label: '待审核帖子', value: '12', foot: '超过50红色预警' },
  { label: '今日发帖量', value: '45', foot: '较昨日 +5%' }
];

const alerts = [
  { title: '用户流失预警', desc: '连续3天DAU环比下降超30%，请检查近期活动或技术问题。', tip: '检查运营活动', type: 'warning' },
  { title: '刷榜预警', desc: '单用户单日上香次数超日均3倍，建议进入排行榜管理核查。', tip: '核查异常用户', type: 'danger' },
  { title: '内容积压预警', desc: '待审核帖子数超过50时，建议调整AI审核策略或增加审核人员。', tip: '审核队列监控', type: 'primary' }
];
</script>
