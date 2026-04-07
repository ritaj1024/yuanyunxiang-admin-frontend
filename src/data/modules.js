import { extraPagesByModule, pageEnhancements } from './moduleEnhancements.js';

const baseMenuModules = [
  {
    id: 'statistics',
    title: '数据统计',
    icon: 'DataAnalysis',
    pages: [
      {
        id: 'dashboard',
        path: '/index',
        title: '仪表盘',
        type: 'dashboard',
        priority: 'P0',
        roles: ['数据分析师', '运营专员', '超级管理员'],
        summary: '登录默认首页，展示核心业务指标、趋势图表和异常预警。',
        charts: ['上香趋势图', '用户活跃时段热力图', '香型偏好分布', '新增与留存', '排行榜TOP10变动'],
        coverage: [
          '今日活跃用户、今日上香次数、今日新增用户、今日分享次数、待审核帖子、今日发帖量卡片',
          '趋势图区支持近7天/30天与香型堆叠',
          '异常预警覆盖流失、刷榜、内容积压、敏感词高频、服务器性能'
        ],
        rules: [
          '待审核帖子大于50显示红色预警',
          '连续3天DAU环比下降超30%触发流失预警',
          '接口响应超2秒或错误率超1%触发性能预警'
        ]
      },
      {
        id: 'user-analysis',
        path: '/statistics/user',
        title: '用户分析',
        type: 'analysis',
        priority: 'P2',
        roles: ['数据分析师', '运营专员', '超级管理员'],
        summary: '用户增长、留存、画像、等级分布和活跃分析。',
        charts: ['用户增长', '用户留存', '用户画像', '等级分布', '活跃分析'],
        actions: ['导出'],
        coverage: [
          '支持自然/分享/活动渠道拆分',
          '留存覆盖次日、3日、7日、30日',
          '画像包含性别、地域、设备分布'
        ],
        rules: ['导出按日期范围执行', '数据口径需与用户列表一致']
      },
      {
        id: 'incense-analysis',
        path: '/statistics/incense',
        title: '上香分析',
        type: 'analysis',
        priority: 'P2',
        roles: ['数据分析师', '运营专员', '超级管理员'],
        summary: '上香总量、趋势、香型偏好、词云和来源分布。',
        charts: ['上香总量卡片', '上香趋势', '香型偏好', '时段分布热力图', '祈福语词云', '上香来源分布'],
        actions: ['导出'],
        coverage: ['累计/日均/人均上香次数', '按时间/地区/等级拆分香型偏好', '免费/分享/广告来源分布'],
        rules: ['词云需过滤敏感词', '导出口径与上香记录查询一致']
      },
      {
        id: 'forum-analysis',
        path: '/statistics/forum',
        title: '论坛分析',
        type: 'analysis',
        priority: 'P2',
        roles: ['数据分析师', '运营专员', '超级管理员'],
        summary: '论坛内容产出、互动率、热帖排行和审核统计。',
        charts: ['内容产出', '互动率趋势', '帖子分类分布', '热帖排行', '审核统计'],
        actions: ['导出'],
        coverage: ['日发帖量/评论量', '互动率=(点赞+评论)/浏览量', '审核量、通过率、驳回原因分布'],
        rules: ['热帖排行支持跳转帖子详情', '审核数据与审核工作台一致']
      },
      {
        id: 'share-analysis',
        path: '/statistics/share',
        title: '分享分析',
        type: 'analysis',
        priority: 'P2',
        roles: ['数据分析师', '运营专员', '超级管理员'],
        summary: '分享趋势、渠道对比、裂变效果、转化漏斗和邀请排行。',
        charts: ['分享趋势', '渠道对比', '裂变系数', '转化漏斗', '邀请排行TOP20'],
        actions: ['导出'],
        coverage: ['好友 vs 朋友圈渠道对比', '裂变系数=新增用户/分享次数', '分享到首次上香的完整漏斗'],
        rules: ['分享渠道定义与规则配置一致']
      },
      {
        id: 'export-center',
        path: '/statistics/export',
        title: '数据导出',
        type: 'config',
        priority: 'P2',
        roles: ['数据分析师', '超级管理员'],
        summary: '按业务类型和日期范围提交导出任务，并查看历史导出记录。',
        formGroups: [
          { title: '导出任务', fields: ['数据类型', '日期范围', '导出字段', '文件格式'] },
          { title: '导出记录', fields: ['导出ID', '数据类型', '日期范围', '操作人', '导出时间', '文件大小', '状态', '下载链接'] }
        ],
        actions: ['导出'],
        coverage: ['用户数据、上香记录、帖子、评论、分享、排行榜导出', '支持xlsx/csv', '大于10000条时异步导出'],
        rules: ['所有导出记录操作日志', '异步导出完成后通知下载']
      }
    ]
  },
  {
    id: 'incense',
    title: '香室管理',
    icon: 'MagicStick',
    pages: [
      {
        id: 'incense-list',
        path: '/incense/types',
        title: '香型管理',
        type: 'list',
        priority: 'P0',
        roles: ['运营专员', '超级管理员'],
        summary: '管理香型名称、文案、场景、解锁等级、排序和上下线。',
        query: ['香型名称', '状态'],
        columns: ['香型ID', '显示名称', '原命名', '文案意境', '场景画面', '解锁等级', '展示排序', '状态', '累计使用次数', '操作'],
        actions: ['新增', '编辑', '上线', '下线', '导出'],
        coverage: ['香型CRUD与排序', '上线前校验完整性', '支持导出xlsx'],
        rules: ['新增默认下线', '下线后二次确认']
      },
      {
        id: 'incense-edit',
        path: '/incense/types/edit',
        title: '香型新增/编辑',
        hidden: true,
        activeMenu: '/incense/types',
        type: 'config',
        priority: 'P0',
        roles: ['运营专员', '超级管理员'],
        summary: '基本信息 + 场景配置双分组表单。',
        formGroups: [
          { title: '基本信息', fields: ['香型ID', '显示名称', '原命名', '文案意境', '解锁等级', '展示排序'] },
          { title: '场景配置', fields: ['场景背景图', '晨间背景图', '昼间背景图', '昏间背景图', '夜间背景图', '雨天背景图', '雪天背景图'] }
        ],
        actions: ['保存', '取消'],
        coverage: ['750x1334场景图上传', '保存字段校验', '取消未保存提示'],
        rules: ['保存后仍为下线状态']
      },
      {
        id: 'material-manage',
        path: '/incense/materials',
        title: '香炉材质管理',
        type: 'list',
        priority: 'P1',
        roles: ['运营专员', '超级管理员'],
        summary: '材质名称、PNG素材、解锁等级和启停管理。',
        query: ['材质名称', '解锁等级', '状态'],
        columns: ['材质ID', '材质名称', '材质图片', '解锁等级', '状态', '操作'],
        actions: ['新增', '编辑', '启用', '禁用'],
        coverage: ['透明底PNG素材', '等级联动', '启用/禁用切换'],
        rules: ['材质图片不超过1MB']
      },
      {
        id: 'music-manage',
        path: '/incense/music',
        title: '背景音乐管理',
        type: 'list',
        priority: 'P1',
        roles: ['运营专员', '超级管理员'],
        summary: '管理背景音乐素材、默认播放、排序和状态。',
        query: ['音频名称', '默认播放', '状态'],
        columns: ['音频ID', '音频名称', '音频文件', '默认播放', '排序', '状态', '操作'],
        actions: ['新增', '编辑', '试听', '启用', '禁用'],
        coverage: ['MP3上传与试听', '默认播放控制', '启停状态切换'],
        rules: ['单文件不超过3MB']
      },
      {
        id: 'incense-rules',
        path: '/incense/rules',
        title: '上香规则配置',
        type: 'config',
        priority: 'P0',
        roles: ['运营专员', '超级管理员'],
        summary: '上香次数、上限、动画、冷却间隔等全局规则配置。',
        formGroups: [
          { title: '业务参数', fields: ['每日免费上香次数', '每日上香总上限', '祈福语字数上限', '上香动画时长', '上香成功页展示时长', '上香冷却间隔'] }
        ],
        actions: ['保存', '重置为默认值'],
        coverage: ['实时调整参数无需发版', '字段范围校验', '重置出厂默认值'],
        rules: ['保存后即时生效']
      },
      {
        id: 'prayer-manage',
        path: '/incense/prayers',
        title: '祈福语管理',
        type: 'tabs',
        priority: 'P0',
        roles: ['运营专员', '内容审核员', '超级管理员'],
        summary: '系统推荐祈福语库 + 用户祈福语人工审核双Tab。',
        tabs: [
          { name: '系统推荐祈福语', points: ['祈福语ID', '祈福语内容', '关联香型', '每日精选', '使用次数', '状态'] },
          { name: '用户祈福语审核', points: ['祈福语内容', '提交用户', '关联香型', '提交时间', '风险等级', '通过/驳回'] }
        ],
        actions: ['新增', '编辑', '删除', '通过', '驳回'],
        coverage: ['敏感词检测', '可疑内容人工复审', '驳回后替换默认文案并通知用户'],
        rules: ['敏感词红色高亮']
      },
      {
        id: 'incense-records',
        path: '/incense/records',
        title: '上香记录查询',
        type: 'list',
        priority: 'P0',
        roles: ['运营专员', '客服专员', '超级管理员'],
        summary: '全平台上香记录只读查询与导出。',
        query: ['用户昵称', '用户ID', '香型', '上香日期', '祈福语关键词', '上香来源'],
        columns: ['记录ID', '用户头像/昵称', '香型', '祈福语', '上香时间', '当时排名', '上香来源', '操作'],
        actions: ['导出'],
        coverage: ['多维度筛选', '同步/异步导出', '操作日志追踪'],
        rules: ['记录不可删改']
      }
    ]
  },
  {
    id: 'ranking',
    title: '排行榜管理',
    icon: 'Trophy',
    pages: [
      {
        id: 'ranking-data',
        path: '/ranking/data',
        title: '排行榜数据',
        type: 'tabs',
        priority: 'P0',
        roles: ['运营专员', '超级管理员'],
        summary: '全国排行榜 + 好友排行榜查询双视图。',
        tabs: [
          { name: '全国排行榜', points: ['排名', '昵称', '地区', '累计上香次数', '连续上香天数', '最近上香时间', '异常标记'] },
          { name: '好友排行榜查询', points: ['OpenID/昵称查询', '好友榜视角', '客诉排查'] }
        ],
        actions: ['修正数据', '封榜', '解封'],
        coverage: ['TOP500数据', '异常刷榜标记', '修正后自动重算排名'],
        rules: ['封榜期间上香正常但排名不更新']
      },
      {
        id: 'ranking-rules',
        path: '/ranking/rules',
        title: '排行规则配置',
        type: 'config',
        priority: 'P0',
        roles: ['运营专员', '超级管理员'],
        summary: '维护更新时间、重置日、展示数量和刷榜阈值。',
        formGroups: [
          { title: '排行策略', fields: ['排名更新时间', '月度重置日', '排序规则', '好友榜展示数量', '全国榜展示数量', '刷榜异常阈值'] }
        ],
        actions: ['保存', '手动重置排行榜'],
        coverage: ['按周期生效', '支持手动重置并归档历史月榜'],
        rules: ['手动重置前需二次确认']
      }
    ]
  },
  {
    id: 'share',
    title: '分享管理',
    icon: 'Share',
    pages: [
      {
        id: 'share-rules',
        path: '/share/rules',
        title: '分享规则配置',
        type: 'config',
        priority: 'P0',
        roles: ['运营专员', '超级管理员'],
        summary: '管理分享增次机制的奖励参数和总开关。',
        formGroups: [
          { title: '奖励参数', fields: ['分享给好友奖励', '分享到朋友圈奖励', '好友点击邀请奖励', '好友点击每日上限', '新用户注册额外奖励', '分享奖励总开关'] }
        ],
        actions: ['保存'],
        coverage: ['分享奖励参数全量可配', '支持紧急关闭奖励'],
        rules: ['保存后即时生效']
      },
      {
        id: 'share-card',
        path: '/share/card',
        title: '分享卡片配置',
        type: 'config',
        priority: 'P1',
        roles: ['运营专员', '超级管理员'],
        summary: '配置分享标题模板、封面图和展示字段，支持实时预览。',
        formGroups: [
          { title: '卡片样式', fields: ['卡片标题模板', '卡片封面图', '展示字段'] }
        ],
        actions: ['保存', '预览'],
        coverage: ['支持变量模板', '实时预览微信聊天/朋友圈样式'],
        rules: ['未上传封面时回退香型场景图']
      }
    ]
  },
  {
    id: 'forum',
    title: '论坛管理',
    icon: 'ChatDotSquare',
    pages: [
      {
        id: 'post-manage',
        path: '/forum/posts',
        title: '帖子管理',
        type: 'list',
        priority: 'P0',
        roles: ['内容审核员', '运营专员', '超级管理员'],
        summary: '全量管理论坛帖子，含审核、驳回、删除、置顶、加精、批量操作。',
        query: ['帖子来源', '论坛分类', '香型标签', '状态', '关键词', '作者昵称', '发布日期'],
        columns: ['帖子ID', '类型', '标题/内容摘要', '作者', '香型标签', '图片', '点赞数', '评论数', '转发数', '浏览数', '发布时间', '状态', '标记', '操作'],
        actions: ['通过', '驳回', '删除', '置顶', '加精', '批量通过', '批量驳回', '批量删除', '导出'],
        coverage: ['驳回原因+补充说明', '违规处罚阶梯', '置顶有效期设置'],
        rules: ['删除为软删除，后台保留30天']
      },
      {
        id: 'audit-workbench',
        path: '/forum/workbench',
        title: '审核工作台',
        type: 'workbench',
        priority: 'P0',
        roles: ['内容审核员', '超级管理员'],
        summary: '高频左右分栏审核页面，支持快捷键和自动跳转下一条。',
        actions: ['通过(Y)', '驳回(N)', '删除(D)', '下一条(→)'],
        coverage: ['敏感词高亮', '相似内容检测', '用户违规历史', '审核耗时统计'],
        rules: ['待审数超过50红色预警', '相似度超过80%标记疑似重复广告']
      },
      {
        id: 'comment-manage',
        path: '/forum/comments',
        title: '评论管理',
        type: 'list',
        priority: 'P0',
        roles: ['内容审核员', '超级管理员'],
        summary: '评论列表查询、删除评论和禁言用户。',
        query: ['评论关键词', '评论者昵称', '所属帖子ID', '评论日期'],
        columns: ['评论ID', '评论内容', '评论者', '所属帖子', '评论时间', '操作'],
        actions: ['删除', '禁言'],
        coverage: ['导流关键词重点识别', '用户端显示评论已被管理员删除'],
        rules: ['禁言期间不能发帖评论但可上香']
      },
      {
        id: 'report-manage',
        path: '/forum/reports',
        title: '举报处理',
        type: 'list',
        priority: 'P0',
        roles: ['内容审核员', '超级管理员'],
        summary: '处理帖子/评论举报，完成判定、处罚和反馈闭环。',
        query: ['内容类型', '举报原因', '处理状态', '举报日期'],
        columns: ['举报ID', '被举报内容', '被举报人', '举报人', '举报原因', '举报时间', '处理状态', '操作'],
        actions: ['处理'],
        coverage: ['有效举报/无效举报', '删除内容、警告、禁言、封禁作者'],
        rules: ['举报帖子2小时内处理，普通帖子24小时内处理']
      },
      {
        id: 'forum-category',
        path: '/forum/categories',
        title: '论坛分类管理',
        type: 'list',
        priority: 'P2',
        roles: ['运营专员', '超级管理员'],
        summary: '管理帖子分类名称、说明、排序和启停状态。',
        query: ['分类名称', '状态'],
        columns: ['分类ID', '分类名称', '分类说明', '排序', '状态', '操作'],
        actions: ['新增', '编辑', '启用', '禁用'],
        coverage: ['分类启停', '香型标签与香型管理联动'],
        rules: ['分类禁用后用户端发帖不再展示']
      },
      {
        id: 'official-post',
        path: '/forum/official-posts',
        title: '官方帖子管理',
        type: 'composer',
        priority: 'P2',
        roles: ['运营专员', '超级管理员'],
        summary: '发布和管理官方帖子，默认带官方标识且免审核。',
        formGroups: [
          { title: '发布官方帖子', fields: ['帖子标题', '帖子内容', '论坛分类', '香型标签', '是否置顶'] }
        ],
        actions: ['发布', '编辑', '删除'],
        coverage: ['富文本编辑', '默认置顶', '免审核即时发布'],
        rules: ['删除前需二次确认']
      }
    ]
  },
  {
    id: 'user',
    title: '用户管理',
    icon: 'User',
    pages: [
      {
        id: 'user-list',
        path: '/users/list',
        title: '用户列表',
        type: 'list',
        priority: 'P0',
        roles: ['运营专员', '内容审核员', '客服专员', '超级管理员'],
        summary: '查看全平台用户并执行详情、禁言、封号、发消息、导出。',
        query: ['用户昵称', '用户ID', '手机号', '等级', '状态', '注册日期', '最后活跃日期', '是否绑定手机'],
        columns: ['用户ID', '头像/昵称', '等级', '累计上香', '发帖数', '状态', '注册时间', '最后活跃', '操作'],
        actions: ['详情', '禁言', '封号', '发消息', '导出'],
        coverage: ['多条件筛选', '列表排序', '分角色授权操作'],
        rules: ['列表页OpenID和手机号脱敏显示']
      },
      {
        id: 'user-detail',
        path: '/users/detail',
        title: '用户详情',
        type: 'detail',
        hidden: true,
        activeMenu: '/users/list',
        priority: 'P0',
        roles: ['运营专员', '内容审核员', '客服专员', '超级管理员'],
        summary: '基础信息、会员信息与多Tab行为记录详情页。',
        formGroups: [
          { title: '基础信息', fields: ['用户ID', '头像', '昵称', '个性签名', '性别', '地区', '手机号', '注册时间', '最后登录', '状态'] },
          { title: '会员信息', fields: ['当前等级', '累计上香次数', '距下一级', '升级历史', '已解锁香型'] }
        ],
        tabs: [
          { name: '上香记录', points: ['按时间倒序', '香型筛选'] },
          { name: '发帖记录', points: ['帖子状态', '互动数据'] },
          { name: '评论记录', points: ['评论内容', '所属帖子'] },
          { name: '分享记录', points: ['分享次数', '邀请新用户数', '邀请用户列表'] },
          { name: '违规记录', points: ['违规时间', '违规内容', '违规原因', '处罚措施', '操作人'] }
        ],
        actions: ['重置头像', '重置昵称', '清空签名', '解绑手机', '调整等级', '禁言', '封号', '发消息', '返回'],
        coverage: ['行为全链路查询', '违规内容清理', '等级手动调整'],
        rules: ['调整等级需填写原因并记日志']
      },
      {
        id: 'level-manage',
        path: '/users/levels',
        title: '等级管理',
        type: 'config',
        priority: 'P0',
        roles: ['运营专员', '超级管理员'],
        summary: '配置Lv.1~Lv.6等级名称、阈值、解锁内容和徽章。',
        formGroups: [
          { title: '等级规则表', fields: ['等级', '等级名称', '升级阈值', '解锁香型', '解锁材质', '解锁特权', '徽章图片'] },
          { title: '等级分布看板', fields: ['等级占比饼图', '升级漏斗'] }
        ],
        actions: ['保存'],
        coverage: ['阈值递增校验', '联动已上线香型和已启用材质', '等级分布图表'],
        rules: ['Lv.1固定为0']
      },
      {
        id: 'blacklist-manage',
        path: '/users/blacklist',
        title: '黑名单管理',
        type: 'list',
        priority: 'P0',
        roles: ['内容审核员', '超级管理员'],
        summary: '查看禁言/封号用户并支持解封和批量解封。',
        query: ['用户昵称', '封禁类型', '执行日期'],
        columns: ['用户头像/昵称', '封禁类型', '封禁原因', '操作人', '执行时间', '到期时间', '操作'],
        actions: ['解封', '批量解封'],
        coverage: ['显示封禁原因和到期时间', '到期自动恢复并通知'],
        rules: ['封号到期时间显示永久']
      }
    ]
  },
  {
    id: 'message',
    title: '消息中心',
    icon: 'Bell',
    pages: [
      {
        id: 'notice-manage',
        path: '/message/notices',
        title: '系统公告管理',
        type: 'list',
        priority: 'P0',
        roles: ['运营专员', '超级管理员'],
        summary: '管理弹窗、横幅、消息三种系统公告。',
        query: ['公告标题', '公告类型', '状态', '目标用户'],
        columns: ['公告ID', '公告标题', '公告类型', '目标用户', '生效时间', '失效时间', '状态', '操作'],
        formGroups: [
          { title: '新增/编辑公告', fields: ['公告标题', '公告类型', '公告内容', '目标用户', '生效时间', '失效时间'] }
        ],
        actions: ['保存草稿', '发布', '下线', '删除', '预览'],
        coverage: ['弹窗/横幅/消息三种形态', '目标用户支持全部/指定等级/指定地区'],
        rules: ['失效时间必须晚于生效时间']
      },
      {
        id: 'message-push',
        path: '/message/push',
        title: '消息推送',
        type: 'tabs',
        priority: 'P1',
        roles: ['运营专员', '客服专员', '超级管理员'],
        summary: '推送记录 + 消息模板双Tab，支持群发和定向推送。',
        tabs: [
          { name: '推送记录', points: ['推送ID', '消息内容', '推送类型', '目标范围', '发送时间', '送达数'] },
          { name: '消息模板', points: ['模板ID', '模板名称', '模板内容', '变量', '编辑', '删除'] }
        ],
        actions: ['新建推送', '发送', '编辑模板', '删除模板'],
        coverage: ['群发/定向推送', '支持模板变量', '单用户每日最多5条系统消息'],
        rules: ['发送前必须校验消息内容']
      },
      {
        id: 'feedback-manage',
        path: '/message/feedback',
        title: '意见反馈管理',
        type: 'list',
        priority: 'P1',
        roles: ['客服专员', '超级管理员'],
        summary: '管理用户意见反馈，查看截图并回复或关闭。',
        query: ['用户昵称', '反馈分类', '处理状态', '提交时间'],
        columns: ['反馈ID', '用户昵称', '反馈内容', '截图', '反馈分类', '提交时间', '处理状态', '操作'],
        actions: ['回复', '关闭'],
        coverage: ['Bug/建议/投诉/其他分类', '回复后通过系统消息发送给用户'],
        rules: ['截图支持放大预览']
      }
    ]
  },
  {
    id: 'system',
    title: '系统管理',
    icon: 'Setting',
    pages: [
      {
        id: 'account-manage',
        path: '/system/accounts',
        title: '账号管理',
        type: 'list',
        priority: 'P0',
        roles: ['超级管理员'],
        summary: '管理后台管理员账号的新增、编辑、停用/启用和重置密码。',
        query: ['账号名称', '登录邮箱', '角色', '状态'],
        columns: ['账号ID', '账号名称', '登录邮箱', '角色', '状态', '最后登录', '操作'],
        actions: ['新增', '编辑', '停用', '启用', '重置密码'],
        coverage: ['邮箱唯一校验', '密码复杂度规则', '5次输错锁定30分钟'],
        rules: ['首次登录强制修改密码']
      },
      {
        id: 'role-manage',
        path: '/system/roles',
        title: '角色权限管理',
        type: 'security',
        priority: 'P0',
        roles: ['超级管理员'],
        summary: '管理预置角色和自定义角色，按模块+操作维度配置权限。',
        columns: ['角色ID', '角色名称', '角色说明', '账号数量', '操作'],
        actions: ['新增角色', '编辑', '权限配置'],
        coverage: ['树形勾选权限', '预置角色不可删除', '支持新增自定义角色'],
        rules: ['权限修改即时生效']
      },
      {
        id: 'operation-logs',
        path: '/system/logs',
        title: '操作日志',
        type: 'security',
        priority: 'P0',
        roles: ['超级管理员'],
        summary: '登录日志和操作日志双Tab，记录后台访问与敏感动作。',
        tabs: [
          { name: '登录日志', points: ['操作人', '登录时间', 'IP地址', '设备信息', '登录结果'] },
          { name: '操作日志', points: ['操作人', '操作时间', '操作类型', '操作对象', '操作详情', 'IP地址'] }
        ],
        actions: ['筛选'],
        coverage: ['非常用IP登录提醒', '日志至少保留180天', '敏感操作全链路追踪'],
        rules: ['日志只读不允许修改']
      },
      {
        id: 'system-config',
        path: '/system/config',
        title: '系统配置',
        type: 'security',
        priority: 'P0',
        roles: ['超级管理员'],
        summary: '小程序密钥、敏感词库和功能开关等系统级配置。',
        formGroups: [
          { title: '小程序配置', fields: ['小程序AppID', '小程序AppSecret'] },
          { title: '敏感词库', fields: ['敏感词分类', '敏感词增删改查', '批量导入xlsx/csv'] },
          { title: '功能开关', fields: ['论坛发帖开关', '分享奖励开关', '排行榜展示开关', '用户注册开关'] }
        ],
        actions: ['保存', '导入敏感词'],
        coverage: ['配置保存需管理员密码二次验证', '功能开关即时生效'],
        rules: ['所有配置变更记操作日志']
      }
    ]
  }
];

export const menuModules = baseMenuModules.map((module) => ({
  ...module,
  pages: [
    ...module.pages.map((page) => ({
      ...page,
      ...(pageEnhancements[page.id] || {})
    })),
    ...(extraPagesByModule[module.id] || [])
  ]
}));

export const allPages = menuModules.flatMap((module) =>
  module.pages.map((page) => ({
    ...page,
    moduleId: module.id,
    moduleTitle: module.title
  }))
);

export const pageMap = Object.fromEntries(allPages.map((page) => [page.id, page]));

export const coverageRows = allPages.map((page) => ({
  moduleTitle: page.moduleTitle,
  title: page.title,
  type: page.type,
  priority: page.priority,
  coverage: page.coverage || []
}));
