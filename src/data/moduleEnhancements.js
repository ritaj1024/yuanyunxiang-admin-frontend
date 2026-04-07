const fullPermissionTree = [
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
      { id: 'user-message', label: '发消息' },
      { id: 'user-avatar', label: '审核昵称头像' }
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

const levelOptions = ['全部', 'Lv.1初见', 'Lv.2入门', 'Lv.3游方', 'Lv.4研经', 'Lv.5造像', 'Lv.6圆满'];
const incenseOptions = ['全部', '平安香', '青云香', '芝兰香', '连理香', '折桂香', '松鹤香'];
const incenseOptionsWithCommon = ['通用', '平安香', '青云香', '芝兰香', '连理香', '折桂香', '松鹤香'];
const forumCategoryOptions = ['全部', '自由发帖', '问答互助', '善愿墙', '还愿分享'];
const forumTagOptions = ['全部', '平安香', '青云香', '芝兰香', '连理香', '折桂香', '松鹤香', '无标签'];
const reportReasonOptions = ['全部', '涉政', '色情', '赌博', '宗教违规', '人身攻击', '广告', '其他'];
const adminRoleOptions = ['超级管理员', '运营专员', '内容审核员', '客服专员', '数据分析师'];
const regionOptions = ['全部', '四川·成都', '浙江·杭州', '江苏·苏州', '广东·深圳', '北京·朝阳'];

const incenseBasicFields = [
  {
    label: '香型ID',
    type: 'text',
    readonly: true,
    description: '系统自动生成，不可编辑，唯一标识。',
    example: 'pingan',
    placeholder: '保存后自动生成'
  },
  {
    label: '显示名称',
    type: 'text',
    required: true,
    maxLength: 10,
    description: '香型在用户端展示的名称，不超过10个字符。',
    example: '「平安香」',
    placeholder: '请输入显示名称'
  },
  {
    label: '原命名',
    type: 'text',
    maxLength: 20,
    description: '内部参考命名，非必填，不超过20个字符。',
    example: '纳福上香',
    placeholder: '请输入原命名'
  },
  {
    label: '文案意境',
    type: 'textarea',
    required: true,
    maxLength: 30,
    rows: 3,
    description: '香型对应的意境文案，不超过30个字。',
    example: '岁岁常欢愉，年年皆胜意',
    placeholder: '请输入文案意境'
  },
  {
    label: '解锁等级',
    type: 'select',
    required: true,
    options: levelOptions.slice(1),
    description: '用户需达到该等级才可使用。',
    example: 'Lv.1初见',
    placeholder: '请选择解锁等级'
  },
  {
    label: '展示排序',
    type: 'number',
    required: true,
    min: 1,
    max: 99,
    description: '数值越小越靠前，范围1~99。',
    example: '1',
    placeholder: '请输入展示排序'
  }
];

const incenseSceneFields = [
  {
    label: '场景背景图',
    type: 'upload',
    required: true,
    description: '必传，JPG/PNG，建议尺寸750x1334px，文件大小不超过2MB。',
    example: '庭院腊梅.jpg',
    placeholder: '请上传场景背景图'
  },
  {
    label: '晨间背景图',
    type: 'upload',
    description: '非必传，6:00~10:00展示；未上传则使用默认场景背景图。',
    example: '庭院腊梅_晨.jpg',
    placeholder: '请上传晨间背景图'
  },
  {
    label: '昼间背景图',
    type: 'upload',
    description: '非必传，10:00~17:00展示的背景图。',
    example: '庭院腊梅_昼.jpg',
    placeholder: '请上传昼间背景图'
  },
  {
    label: '昏间背景图',
    type: 'upload',
    description: '非必传，17:00~20:00展示的背景图。',
    example: '庭院腊梅_昏.jpg',
    placeholder: '请上传昏间背景图'
  },
  {
    label: '夜间背景图',
    type: 'upload',
    description: '非必传，20:00~次日6:00展示的背景图。',
    example: '庭院腊梅_夜.jpg',
    placeholder: '请上传夜间背景图'
  },
  {
    label: '雨天背景图',
    type: 'upload',
    description: '非必传，雨天展示，优先级高于时段图。',
    example: '庭院腊梅_雨.jpg',
    placeholder: '请上传雨天背景图'
  },
  {
    label: '雪天背景图',
    type: 'upload',
    description: '非必传，雪天展示，优先级高于时段图。',
    example: '庭院腊梅_雪.jpg',
    placeholder: '请上传雪天背景图'
  }
];

export const pageEnhancements = {
  'user-analysis': {
    query: ['日期范围', '渠道'],
    sortFields: ['新增用户', '累计用户', '留存率']
  },
  'incense-analysis': {
    query: ['日期范围', '地区', '等级'],
    sortFields: ['累计上香次数', '人均上香次数']
  },
  'forum-analysis': {
    query: ['日期范围', '论坛分类', '香型标签'],
    sortFields: ['发帖量', '互动率', '审核通过率']
  },
  'share-analysis': {
    query: ['日期范围', '分享渠道'],
    sortFields: ['分享次数', '转化率', '裂变系数']
  },

  /* ==================== 香室管理 ==================== */

  'incense-list': {
    queryDefinitions: [
      { label: '香型名称', type: 'text', placeholder: '请输入香型名称' },
      { label: '状态', type: 'select', options: ['全部', '上线', '下线'] }
    ],
    sortFields: ['展示排序', '累计使用次数'],
    mockRows: [
      { 香型ID: 'pingan', 显示名称: '「平安香」', 原命名: '纳福上香', 文案意境: '岁岁常欢愉，年年皆胜意', 场景画面: '庭院腊梅', 解锁等级: 'Lv.1初见', 展示排序: '1', 状态: '上线', 累计使用次数: '12580' },
      { 香型ID: 'qingyun', 显示名称: '「青云香」', 原命名: '扶摇上香', 文案意境: '愿前路开阔，所行化青云', 场景画面: '远山云海', 解锁等级: 'Lv.2入门', 展示排序: '2', 状态: '上线', 累计使用次数: '9386' },
      { 香型ID: 'zhilan', 显示名称: '「芝兰香」', 原命名: '兰亭静香', 文案意境: '兰心蕙质，自有清芬满庭', 场景画面: '竹影兰庭', 解锁等级: 'Lv.3游方', 展示排序: '3', 状态: '上线', 累计使用次数: '7021' },
      { 香型ID: 'lianli', 显示名称: '「连理香」', 原命名: '双栖上香', 文案意境: '愿良缘如约，岁月与共', 场景画面: '连理灯庭', 解锁等级: 'Lv.4研经', 展示排序: '4', 状态: '下线', 累计使用次数: '5188' },
      { 香型ID: 'zhegui', 显示名称: '「折桂香」', 原命名: '桂榜上香', 文案意境: '愿所求皆中，所念皆有回响', 场景画面: '桂枝月门', 解锁等级: 'Lv.5造像', 展示排序: '5', 状态: '上线', 累计使用次数: '4312' },
      { 香型ID: 'songhe', 显示名称: '「松鹤香」', 原命名: '延年静香', 文案意境: '愿身心康宁，福寿长青', 场景画面: '松庭鹤影', 解锁等级: 'Lv.6圆满', 展示排序: '6', 状态: '下线', 累计使用次数: '2870' }
    ],
    editorGroups: [
      { title: '基本信息', fields: incenseBasicFields },
      { title: '场景配置', fields: incenseSceneFields }
    ],
    actionForms: [
      {
        action: '上线',
        title: '香型上线校验',
        groups: [{
          title: '上线前校验',
          fields: [
            { label: '显示名称', type: 'text', readonly: true, description: '需已填写' },
            { label: '文案意境', type: 'text', readonly: true, description: '需已填写' },
            { label: '场景画面完整度', type: 'text', readonly: true, description: '需已上传场景背景图' }
          ]
        }],
        effectStatus: '上线'
      },
      {
        action: '下线',
        title: '确认下线该香型？',
        groups: [{
          title: '下线确认',
          fields: [
            { label: '下线提示', type: 'text', readonly: true, defaultValue: '下线后用户端将不再展示，历史记录保留', description: '确认下线该香型？下线后用户端将不再展示' }
          ]
        }],
        effectStatus: '下线'
      }
    ]
  },
  'incense-edit': {
    formGroups: [
      { title: '基本信息', fields: incenseBasicFields },
      { title: '场景配置', fields: incenseSceneFields }
    ]
  },
  'material-manage': {
    queryDefinitions: [
      { label: '材质名称', type: 'text', placeholder: '请输入材质名称' },
      { label: '解锁等级', type: 'select', options: levelOptions },
      { label: '状态', type: 'select', options: ['全部', '启用', '禁用'] }
    ],
    mockRows: [
      { 材质ID: 'bronze', 材质名称: '青铜', 材质图片: '香炉_青铜.png', 解锁等级: 'Lv.1初见', 状态: '启用' },
      { 材质ID: 'ceramic', 材质名称: '青瓷', 材质图片: '香炉_青瓷.png', 解锁等级: 'Lv.2入门', 状态: '启用' },
      { 材质ID: 'redcopper', 材质名称: '紫铜', 材质图片: '香炉_紫铜.png', 解锁等级: 'Lv.3游方', 状态: '启用' },
      { 材质ID: 'whitejade', 材质名称: '白玉', 材质图片: '香炉_白玉.png', 解锁等级: 'Lv.5造像', 状态: '启用' },
      { 材质ID: 'blackgold', 材质名称: '乌金', 材质图片: '香炉_乌金.png', 解锁等级: 'Lv.6圆满', 状态: '禁用' }
    ],
    editorGroups: [
      {
        title: '材质信息',
        fields: [
          { label: '材质ID', type: 'text', readonly: true, description: '系统自动生成，不可编辑' },
          { label: '材质名称', type: 'text', required: true, maxLength: 10, description: '必填，不超过10个字符' },
          { label: '材质图片', type: 'upload', required: true, description: '必传，透明底PNG，建议尺寸400x600px，不超过1MB' },
          { label: '解锁等级', type: 'select', required: true, options: levelOptions.slice(1), description: '用户需达到该等级才可选择此材质' },
          { label: '状态', type: 'select', options: ['启用', '禁用'], description: '启用：用户端可选；禁用：用户端不展示' }
        ]
      }
    ]
  },
  'music-manage': {
    queryDefinitions: [
      { label: '音频名称', type: 'text', placeholder: '请输入音频名称' },
      { label: '默认播放', type: 'select', options: ['全部', '是', '否'] },
      { label: '状态', type: 'select', options: ['全部', '启用', '禁用'] }
    ],
    mockRows: [
      { 音频ID: 'audio_001', 音频名称: '古琴·高山流水', 音频文件: '高山流水.mp3', 默认播放: '否', 排序: '1', 状态: '启用' },
      { 音频ID: 'audio_002', 音频名称: '梵音·清心咒', 音频文件: '清心咒.mp3', 默认播放: '是', 排序: '2', 状态: '启用' },
      { 音频ID: 'audio_003', 音频名称: '雨夜·檐铃声', 音频文件: '檐铃声.mp3', 默认播放: '否', 排序: '3', 状态: '禁用' },
      { 音频ID: 'audio_004', 音频名称: '禅意·空山鸟鸣', 音频文件: '空山鸟鸣.mp3', 默认播放: '否', 排序: '4', 状态: '启用' }
    ],
    editorGroups: [
      {
        title: '音频信息',
        fields: [
          { label: '音频ID', type: 'text', readonly: true, description: '系统自动生成，不可编辑' },
          { label: '音频名称', type: 'text', required: true, maxLength: 20, description: '必填，不超过20个字符' },
          { label: '音频文件', type: 'upload', required: true, description: '必传，MP3格式，文件大小不超过3MB，循环播放' },
          { label: '默认播放', type: 'select', options: ['是', '否'], description: '"是"表示用户首次进入自动播放' },
          { label: '排序', type: 'number', min: 1, max: 99, description: '数值越小越靠前' },
          { label: '状态', type: 'select', options: ['启用', '禁用'] }
        ]
      }
    ]
  },
  'incense-rules': {
    editorGroups: [
      {
        title: '业务参数',
        fields: [
          { label: '每日免费上香次数', type: 'number', required: true, min: 1, max: 99, defaultValue: 3, description: '用户每日不花任何代价可上香的次数', example: '3' },
          { label: '每日上香总上限', type: 'number', required: true, min: 1, max: 999, defaultValue: 50, description: '含免费+分享+广告获得的总和上限', example: '50' },
          { label: '祈福语字数上限', type: 'number', required: true, min: 10, max: 200, defaultValue: 50, description: '用户自定义祈福语最大长度', example: '50' },
          { label: '上香动画时长（秒）', type: 'number', required: true, min: 1, max: 10, defaultValue: 3, description: '上香动画播放时长', example: '3' },
          { label: '上香成功页展示时长（秒）', type: 'number', required: true, min: 3, max: 30, defaultValue: 5, description: '上香成功结果页面展示时长', example: '5' },
          { label: '上香冷却间隔（秒）', type: 'number', required: true, min: 0, max: 60, defaultValue: 0, description: '两次上香间最短间隔（防刷），0表示无间隔', example: '0' }
        ]
      }
    ]
  },
  'prayer-manage': {
    tabs: [
      {
        name: '系统推荐祈福语',
        columns: ['祈福语ID', '祈福语内容', '关联香型', '是否每日精选', '使用次数', '状态', '操作'],
        mockRows: [
          { 祈福语ID: 'prayer_001', 祈福语内容: '愿家人平安健康，岁岁常欢愉', 关联香型: '平安香', 是否每日精选: '是', 使用次数: '356', 状态: '启用' },
          { 祈福语ID: 'prayer_002', 祈福语内容: '愿前路坦荡，乘风而上', 关联香型: '青云香', 是否每日精选: '否', 使用次数: '218', 状态: '启用' },
          { 祈福语ID: 'prayer_003', 祈福语内容: '愿心中芝兰常在，不染尘埃', 关联香型: '芝兰香', 是否每日精选: '是', 使用次数: '189', 状态: '启用' },
          { 祈福语ID: 'prayer_004', 祈福语内容: '愿良缘天赐，白首不相离', 关联香型: '连理香', 是否每日精选: '否', 使用次数: '147', 状态: '启用' },
          { 祈福语ID: 'prayer_005', 祈福语内容: '愿金榜题名，鱼跃龙门', 关联香型: '折桂香', 是否每日精选: '否', 使用次数: '126', 状态: '禁用' },
          { 祈福语ID: 'prayer_006', 祈福语内容: '愿身心安泰，延年益寿', 关联香型: '松鹤香', 是否每日精选: '否', 使用次数: '95', 状态: '启用' },
          { 祈福语ID: 'prayer_007', 祈福语内容: '愿诸事顺遂，万般如意', 关联香型: '通用', 是否每日精选: '是', 使用次数: '520', 状态: '启用' }
        ],
        actions: ['编辑', '删除']
      },
      {
        name: '用户祈福语审核',
        columns: ['祈福语内容', '提交用户', '关联香型', '提交时间', '风险等级', '操作'],
        mockRows: [
          { 祈福语内容: '愿XXX平安（疑似含人名）', 提交用户: '善信·张三', 关联香型: '平安香', 提交时间: '2026-03-26 09:15:30', 风险等级: '中' },
          { 祈福语内容: '希望发财暴富加微信xxx', 提交用户: '善信·李四', 关联香型: '青云香', 提交时间: '2026-03-26 10:08:15', 风险等级: '高' },
          { 祈福语内容: '愿天下无疾，愿山河无恙', 提交用户: '善信·王五', 关联香型: '松鹤香', 提交时间: '2026-03-26 11:22:45', 风险等级: '低' }
        ],
        actions: ['通过', '驳回']
      }
    ],
    actionForms: [
      {
        action: '新增',
        title: '新增系统祈福语',
        groups: [{
          title: '祈福语信息',
          fields: [
            { label: '祈福语内容', type: 'textarea', required: true, maxLength: 50, description: '不超过50个字符，保存时自动敏感词检测' },
            { label: '关联香型', type: 'select', required: true, multiple: true, options: incenseOptionsWithCommon, description: '可多选，可选"通用"' },
            { label: '是否每日精选', type: 'select', options: ['是', '否'], description: '"是"则在用户端重点推荐' },
            { label: '状态', type: 'select', options: ['启用', '禁用'] }
          ]
        }]
      },
      {
        action: '编辑',
        title: '编辑系统祈福语',
        groups: [{
          title: '祈福语信息',
          fields: [
            { label: '祈福语内容', type: 'textarea', required: true, maxLength: 50 },
            { label: '关联香型', type: 'select', required: true, multiple: true, options: incenseOptionsWithCommon },
            { label: '是否每日精选', type: 'select', options: ['是', '否'] },
            { label: '状态', type: 'select', options: ['启用', '禁用'] }
          ]
        }]
      },
      {
        action: '驳回',
        title: '祈福语驳回处理',
        groups: [{
          title: '驳回结果',
          fields: [
            { label: '替换默认文案', type: 'text', readonly: true, defaultValue: '愿诸事顺遂，万般如意', description: '驳回后祈福语将替换为系统默认文案' },
            { label: '通知文案', type: 'text', readonly: true, defaultValue: '您的祈福语因内容不当已被替换', description: '用户将收到此通知' }
          ]
        }],
        effectStatus: '已驳回'
      }
    ]
  },
  'incense-records': {
    queryDefinitions: [
      { label: '用户昵称', type: 'text', placeholder: '请输入用户昵称' },
      { label: '用户ID', type: 'text', placeholder: '请输入OpenID' },
      { label: '香型', type: 'select', options: incenseOptions },
      { label: '上香日期', type: 'date-range' },
      { label: '祈福语关键词', type: 'text', placeholder: '请输入祈福语关键词' },
      { label: '上香来源', type: 'select', options: ['全部', '免费', '分享获得', '广告获得'] }
    ],
    mockRows: [
      { 记录ID: '20260326091530001', '用户头像/昵称': '善信·张三', 香型: '「平安香」', 祈福语: '愿家人平安健康，岁岁常欢愉。', 上香时间: '2026-03-26 09:15:30', 当时排名: '第128名', 上香来源: '免费' },
      { 记录ID: '20260326102015018', '用户头像/昵称': '善信·李四', 香型: '「青云香」', 祈福语: '愿此行顺利，所求皆有回应。', 上香时间: '2026-03-26 10:20:15', 当时排名: '第265名', 上香来源: '分享获得' },
      { 记录ID: '20260326140240027', '用户头像/昵称': '善信·王五', 香型: '「芝兰香」', 祈福语: '愿心境澄明，诸事从容安定。', 上香时间: '2026-03-26 14:02:40', 当时排名: '第49名', 上香来源: '广告获得' },
      { 记录ID: '20260325195812009', '用户头像/昵称': '善信·赵六', 香型: '「折桂香」', 祈福语: '愿考试顺遂，心念皆成。', 上香时间: '2026-03-25 19:58:12', 当时排名: '第86名', 上香来源: '免费' },
      { 记录ID: '20260325080112005', '用户头像/昵称': '善信·周七', 香型: '「连理香」', 祈福语: '愿执子之手，白头偕老。', 上香时间: '2026-03-25 08:01:12', 当时排名: '第312名', 上香来源: '分享获得' },
      { 记录ID: '20260324211830042', '用户头像/昵称': '善信·陈八', 香型: '「松鹤香」', 祈福语: '愿父母身体康健，福寿绵长。', 上香时间: '2026-03-24 21:18:30', 当时排名: '第167名', 上香来源: '免费' }
    ]
  },

  /* ==================== 排行榜管理 ==================== */

  'ranking-data': {
    tabs: [
      {
        name: '全国排行榜',
        columns: ['排名', '用户头像/昵称', '地区', '累计上香次数', '连续上香天数', '最近上香时间', '异常标记', '操作'],
        mockRows: [
          { 排名: '1', '用户头像/昵称': '善信·李四', 地区: '四川·成都', 累计上香次数: '1258', 连续上香天数: '30天', 最近上香时间: '2026-03-26 08:00', 异常标记: '正常' },
          { 排名: '2', '用户头像/昵称': '善信·王五', 地区: '浙江·杭州', 累计上香次数: '1145', 连续上香天数: '28天', 最近上香时间: '2026-03-26 07:30', 异常标记: '正常' },
          { 排名: '3', '用户头像/昵称': '善信·赵六', 地区: '江苏·苏州', 累计上香次数: '982', 连续上香天数: '15天', 最近上香时间: '2026-03-26 09:12', 异常标记: '疑似刷榜' },
          { 排名: '4', '用户头像/昵称': '善信·张三', 地区: '广东·深圳', 累计上香次数: '876', 连续上香天数: '22天', 最近上香时间: '2026-03-26 06:45', 异常标记: '正常' },
          { 排名: '5', '用户头像/昵称': '善信·周七', 地区: '北京·朝阳', 累计上香次数: '814', 连续上香天数: '18天', 最近上香时间: '2026-03-25 23:50', 异常标记: '正常' },
          { 排名: '6', '用户头像/昵称': '善信·陈八', 地区: '四川·成都', 累计上香次数: '756', 连续上香天数: '12天', 最近上香时间: '2026-03-26 10:05', 异常标记: '疑似刷榜' }
        ],
        actions: ['修正数据']
      },
      {
        name: '好友排行榜查询',
        points: ['输入用户OpenID或昵称查询该用户视角的好友排行榜', '主要用于客诉排查', '展示好友间排名、上香次数对比']
      }
    ],
    actionForms: [
      {
        action: '修正数据',
        title: '排行榜数据修正',
        groups: [{
          title: '修正信息',
          fields: [
            { label: '当前上香次数', type: 'number', readonly: true, description: '回显当前值，不可编辑' },
            { label: '修正后上香次数', type: 'number', required: true, description: '修正后的上香次数' },
            { label: '修正原因', type: 'textarea', required: true, maxLength: 200, description: '必填，此操作将记入操作日志' }
          ]
        }]
      },
      {
        action: '封榜',
        title: '封榜确认',
        groups: [{
          title: '封榜说明',
          fields: [
            { label: '封榜提示', type: 'text', readonly: true, defaultValue: '封榜期间用户端排行榜显示维护中，上香操作正常但排名暂不更新', description: '确认封榜？' }
          ]
        }],
        effectStatus: '封榜中'
      },
      {
        action: '解封',
        title: '解封确认',
        groups: [{
          title: '解封说明',
          fields: [
            { label: '解封提示', type: 'text', readonly: true, defaultValue: '解封后将重新计算排名', description: '确认解封？' }
          ]
        }],
        effectStatus: '正常'
      }
    ]
  },
  'ranking-rules': {
    editorGroups: [
      {
        title: '排行策略',
        fields: [
          { label: '排名更新时间', type: 'text', required: true, defaultValue: '00:00', description: '每日定时更新排名（时:分）', example: '00:00' },
          { label: '月度重置日', type: 'select', required: true, options: Array.from({ length: 28 }, (_, i) => `每月${i + 1}日`), defaultValue: '每月1日', description: '每月固定日期重置排行榜' },
          { label: '排序规则', type: 'text', readonly: true, defaultValue: '次数降序→时间升序', description: '同次数按时间升序排列' },
          { label: '好友榜展示数量', type: 'number', required: true, min: 10, max: 500, defaultValue: 100, description: '好友排行榜展示数量' },
          { label: '全国榜展示数量', type: 'number', required: true, min: 100, max: 1000, defaultValue: 500, description: '全国排行榜展示数量' },
          { label: '刷榜异常阈值（倍数）', type: 'number', required: true, min: 1, max: 10, defaultValue: 3, description: '单日上香次数超过日均X倍自动标记', example: '3' }
        ]
      }
    ]
  },

  /* ==================== 分享管理 ==================== */

  'share-rules': {
    editorGroups: [
      {
        title: '奖励参数',
        fields: [
          { label: '分享给好友奖励（次）', type: 'number', required: true, min: 0, max: 20, defaultValue: 3, description: '每日首次分享给好友获得的上香次数' },
          { label: '分享到朋友圈奖励（次）', type: 'number', required: true, min: 0, max: 20, defaultValue: 5, description: '每日首次分享到朋友圈获得的上香次数' },
          { label: '好友点击邀请奖励（次）', type: 'number', required: true, min: 0, max: 10, defaultValue: 1, description: '好友通过分享卡片进入小程序时邀请人获得的次数' },
          { label: '好友点击每日上限（次）', type: 'number', required: true, min: 0, max: 50, defaultValue: 10, description: '每日通过好友点击可获得的奖励次数上限' },
          { label: '新用户注册额外奖励（次）', type: 'number', required: true, min: 0, max: 20, defaultValue: 5, description: '被邀请者首次注册时邀请人获得的额外次数' },
          { label: '分享奖励总开关', type: 'switch', defaultValue: true, description: '关闭后所有分享不发放奖励，用于紧急情况' }
        ]
      }
    ]
  },
  'share-card': {
    editorGroups: [
      {
        title: '卡片样式',
        fields: [
          { label: '卡片标题模板', type: 'textarea', required: true, maxLength: 50, defaultValue: '我在「缘·云香」点了一炷{香型名}，一起祈福吧', description: '支持变量：{香型名}、{用户昵称}、{排名}' },
          { label: '卡片封面图', type: 'upload', description: '未上传封面时自动回退到当前香型场景图' },
          { label: '展示字段', type: 'text', defaultValue: '香型名称 / 祈福语 / 当前排名', description: '分享卡片上展示的信息' }
        ]
      }
    ],
    preview: {
      title: '微信分享卡片实时预览',
      caption: '未上传封面图时自动回退到当前香型场景图',
      modes: ['微信聊天卡片', '朋友圈分享卡片'],
      lines: [
        '我在「缘·云香」点了一炷{香型名}，一起祈福吧',
        '展示字段：香型名称 / 祈福语 / 当前排名'
      ]
    }
  },

  /* ==================== 论坛管理 ==================== */

  'post-manage': {
    queryDefinitions: [
      { label: '帖子来源', type: 'select', options: ['全部', '官方帖', '用户帖'] },
      { label: '论坛分类', type: 'select', options: forumCategoryOptions },
      { label: '香型标签', type: 'select', options: forumTagOptions },
      { label: '状态', type: 'select', options: ['全部', '已发布', '待审核', '已驳回', '已删除'] },
      { label: '关键词', type: 'text', placeholder: '请输入标题或内容关键词' },
      { label: '作者昵称', type: 'text', placeholder: '请输入作者昵称' },
      { label: '发布日期', type: 'date-range' }
    ],
    sortFields: ['发布时间', '点赞数', '评论数', '转发数', '浏览数'],
    mockRows: [
      { 帖子ID: 'POST20260326001', 类型: '自由发帖', '标题/内容摘要': '今天在缘·云香为家人祈福，愿所念之人平安顺遂。', 作者: '善信·张三 Lv.3', 香型标签: '平安香', 图片: '[3张图]', 点赞数: '128', 评论数: '32', 转发数: '15', 浏览数: '1560', 发布时间: '2026-03-26 10:30', 状态: '已发布', 标记: '置顶+精华' },
      { 帖子ID: 'POST20260325018', 类型: '问答', '标题/内容摘要': '请教各位，祈福语被系统替换一般是什么原因？', 作者: '善信·李四 Lv.2', 香型标签: '无标签', 图片: '[0张图]', 点赞数: '64', 评论数: '18', 转发数: '4', 浏览数: '698', 发布时间: '2026-03-25 21:12', 状态: '待审核', 标记: '-' },
      { 帖子ID: 'POST20260324007', 类型: '善愿', '标题/内容摘要': '愿父母安康，愿远方亲友诸事顺意。', 作者: '善信·王五 Lv.5', 香型标签: '芝兰香', 图片: '[1张图]', 点赞数: '205', 评论数: '54', 转发数: '21', 浏览数: '2236', 发布时间: '2026-03-24 08:16', 状态: '已发布', 标记: '精华' },
      { 帖子ID: 'POST20260323033', 类型: '还愿', '标题/内容摘要': '上周许愿求职顺利，今天来还愿，感谢大家鼓励。', 作者: '善信·赵六 Lv.4', 香型标签: '青云香', 图片: '[2张图]', 点赞数: '96', 评论数: '27', 转发数: '11', 浏览数: '1045', 发布时间: '2026-03-23 14:05', 状态: '已驳回', 标记: '-' },
      { 帖子ID: 'POST20260322012', 类型: '自由发帖', '标题/内容摘要': '第一次在论坛发帖，分享每日祈福的感受。', 作者: '善信·周七 Lv.1', 香型标签: '平安香', 图片: '[0张图]', 点赞数: '38', 评论数: '12', 转发数: '3', 浏览数: '420', 发布时间: '2026-03-22 16:40', 状态: '已删除', 标记: '-' }
    ],
    actionForms: [
      {
        action: '驳回',
        title: '帖子驳回处理',
        groups: [{
          title: '驳回表单',
          fields: [
            { label: '驳回原因', type: 'select', required: true, options: ['涉政', '色情', '广告', '宗教违规', '人身攻击', '其他'], description: '选择驳回原因分类' },
            { label: '补充说明', type: 'textarea', maxLength: 200, description: '非必填，不超过200个字' }
          ]
        }],
        effectStatus: '已驳回'
      },
      {
        action: '置顶',
        title: '帖子置顶设置',
        groups: [{
          title: '置顶配置',
          fields: [
            { label: '置顶有效期', type: 'datetime', required: true, description: '置顶到期后自动取消置顶' }
          ]
        }]
      }
    ]
  },
  'audit-workbench': {
    workbench: {
      stats: ['待审核数量', '今日已审数量', '平均处理时长'],
      leftSections: ['帖子类型', '帖子内容', '帖子图片', '作者信息'],
      rightSections: ['用户历史违规', '相似内容检测', '驳回原因', '补充说明']
    },
    actionForms: [
      {
        action: '驳回',
        title: '审核工作台驳回',
        groups: [{
          title: '驳回表单',
          fields: [
            { label: '驳回原因', type: 'select', required: true, options: ['涉政', '色情', '广告', '宗教违规', '人身攻击', '其他'], description: '必填，选择驳回原因' },
            { label: '补充说明', type: 'textarea', maxLength: 200, description: '非必填，不超过200个字' }
          ]
        }],
        effectStatus: '已驳回'
      }
    ]
  },
  'comment-manage': {
    queryDefinitions: [
      { label: '评论关键词', type: 'text', placeholder: '重点：微信、加群、加V、私聊、转账等导流关键词' },
      { label: '评论者昵称', type: 'text', placeholder: '请输入评论者昵称' },
      { label: '所属帖子ID', type: 'text', placeholder: '请输入帖子ID' },
      { label: '评论日期', type: 'date-range' }
    ],
    mockRows: [
      { 评论ID: 'CMT20260326001', 评论内容: '愿你家人平安顺遂，也祝你所愿皆成。', 评论者: '善信·张三', 所属帖子: '今天在缘·云香为家人祈福...', 评论时间: '2026-03-26 11:20' },
      { 评论ID: 'CMT20260326008', 评论内容: '加我微信交流祈福心得XXX。', 评论者: '善信·李四', 所属帖子: '请教各位，祈福语被系统替换...', 评论时间: '2026-03-26 13:45' },
      { 评论ID: 'CMT20260325016', 评论内容: '谢谢分享，也想知道你用的是哪种香型。', 评论者: '善信·王五', 所属帖子: '上周许愿求职顺利...', 评论时间: '2026-03-25 19:08' },
      { 评论ID: 'CMT20260325022', 评论内容: '进群交流！扫码加V领取免费上香次数！', 评论者: '善信·陈八', 所属帖子: '第一次在论坛发帖...', 评论时间: '2026-03-25 16:33' },
      { 评论ID: 'CMT20260324009', 评论内容: '坚持每日上香真的能带来内心的安宁。', 评论者: '善信·赵六', 所属帖子: '愿父母安康，愿远方亲友...', 评论时间: '2026-03-24 10:15' }
    ],
    actionForms: [
      {
        action: '禁言',
        title: '评论用户禁言设置',
        groups: [{
          title: '禁言信息',
          fields: [
            { label: '禁言时长', type: 'select', required: true, options: ['3天', '7天', '30天', '永久'], description: '禁言期间不能发帖/评论，可正常上香' },
            { label: '禁言原因', type: 'textarea', required: true, maxLength: 200, description: '用户将收到通知"您因{禁言原因}已被禁言{时长}"' }
          ]
        }],
        effectStatus: '禁言中'
      }
    ]
  },
  'report-manage': {
    queryDefinitions: [
      { label: '内容类型', type: 'select', options: ['全部', '帖子', '评论'] },
      { label: '举报原因', type: 'select', options: reportReasonOptions },
      { label: '处理状态', type: 'select', options: ['全部', '待处理', '已处理-有效', '已处理-无效'] },
      { label: '举报日期', type: 'date-range' }
    ],
    mockRows: [
      { 举报ID: 'RPT20260326001', 被举报内容: '加我微信XXX，带你快速上榜', 被举报人: '善信·李四', 举报人: '善信·王五', 举报原因: '广告', 举报时间: '2026-03-26 11:30', 处理状态: '待处理' },
      { 举报ID: 'RPT20260325006', 被举报内容: '评论区导流加群二维码', 被举报人: '善信·赵六', 举报人: '善信·周七', 举报原因: '广告', 举报时间: '2026-03-25 16:10', 处理状态: '已处理-有效' },
      { 举报ID: 'RPT20260325003', 被举报内容: '帖子中包含不当宗教言论', 被举报人: '善信·陈八', 举报人: '善信·张三', 举报原因: '宗教违规', 举报时间: '2026-03-25 10:22', 处理状态: '待处理' },
      { 举报ID: 'RPT20260324013', 被举报内容: '普通祈福心得分享，无违规内容', 被举报人: '善信·张三', 举报人: '善信·陈八', 举报原因: '其他', 举报时间: '2026-03-24 09:55', 处理状态: '已处理-无效' }
    ],
    actionForms: [
      {
        action: '处理',
        title: '举报处理表单',
        groups: [{
          title: '处理结果',
          fields: [
            { label: '被举报内容预览', type: 'textarea', readonly: true, description: '回显完整帖子/评论内容' },
            { label: '判定结果', type: 'select', required: true, options: ['有效举报', '无效举报'], description: '判定该举报是否成立' },
            { label: '处理措施', type: 'select', multiple: true, options: ['删除内容', '警告作者', '禁言作者3天', '禁言作者7天', '封禁作者'], description: '判定为有效举报时必选' },
            { label: '处理说明', type: 'textarea', maxLength: 200, description: '非必填' }
          ]
        }],
        effectStatus: '已处理-有效'
      }
    ]
  },
  'forum-category': {
    queryDefinitions: [
      { label: '分类名称', type: 'text', placeholder: '请输入分类名称' },
      { label: '状态', type: 'select', options: ['全部', '启用', '禁用'] }
    ],
    mockRows: [
      { 分类ID: 'cat_001', 分类名称: '自由发帖', 分类说明: '分享祈福心得、生活感悟', 排序: '1', 状态: '启用' },
      { 分类ID: 'cat_002', 分类名称: '问答互助', 分类说明: '提问交流、善友互助', 排序: '2', 状态: '启用' },
      { 分类ID: 'cat_003', 分类名称: '善愿墙', 分类说明: '表达心愿、收集祝福', 排序: '3', 状态: '启用' },
      { 分类ID: 'cat_004', 分类名称: '还愿分享', 分类说明: '还愿记录与正向反馈', 排序: '4', 状态: '禁用' }
    ],
    editorGroups: [
      {
        title: '分类信息',
        fields: [
          { label: '分类ID', type: 'text', readonly: true, description: '系统自动生成' },
          { label: '分类名称', type: 'text', required: true, maxLength: 10, description: '必填，不超过10个字符' },
          { label: '分类说明', type: 'text', maxLength: 30, description: '非必填，不超过30个字符' },
          { label: '排序', type: 'number', min: 1, max: 99, description: '数值越小越靠前' },
          { label: '状态', type: 'select', options: ['启用', '禁用'], description: '禁用后用户端发帖时不展示该分类，已有帖子保留' }
        ]
      }
    ]
  },
  'official-post': {
    editorGroups: [
      {
        title: '发布官方帖子',
        fields: [
          { label: '帖子标题', type: 'text', required: true, maxLength: 50, description: '必填，不超过50个字符', example: '缘·云香V1.0版本更新公告' },
          { label: '帖子内容', type: 'textarea', required: true, rows: 6, description: '必填，支持富文本（图片、链接、文字样式）' },
          { label: '论坛分类', type: 'select', required: true, options: ['系统公告', '佛门资讯（V2.0）', '法师开示（V2.0）', '文化科普（V2.0）'], description: '必填，选择帖子所属分类' },
          { label: '香型标签', type: 'select', multiple: true, options: incenseOptionsWithCommon.slice(1), description: '非必填，可关联多个香型' },
          { label: '是否置顶', type: 'select', options: ['是', '否'], defaultValue: '是', description: '默认"是"，官方帖子自动带"官方"金色标识' }
        ]
      }
    ],
    preview: {
      title: '官方帖子发布效果',
      caption: '官方帖子带金色"官方"标识，默认置顶且免审核',
      modes: ['论坛帖子流', '帖子详情页'],
      lines: ['富文本内容支持图片 / 链接 / 文字样式', '论坛分类：系统公告 / 佛门资讯 / 法师开示 / 文化科普']
    }
  },

  /* ==================== 用户管理 ==================== */

  'user-list': {
    queryDefinitions: [
      { label: '用户昵称', type: 'text', placeholder: '请输入用户昵称' },
      { label: '用户ID', type: 'text', placeholder: '请输入OpenID' },
      { label: '手机号', type: 'text', placeholder: '请输入手机号' },
      { label: '等级', type: 'select', options: levelOptions },
      { label: '状态', type: 'select', options: ['全部', '正常', '禁言中', '已封号'] },
      { label: '注册日期', type: 'date-range' },
      { label: '最后活跃日期', type: 'date-range' },
      { label: '是否绑定手机', type: 'select', options: ['全部', '是', '否'] }
    ],
    sortFields: ['注册时间', '累计上香次数', '最后活跃时间', '等级'],
    mockRows: [
      { 用户ID: 'A13F28X9', '头像/昵称': '善信·张三', 等级: 'Lv.3游方', 累计上香: '156', 发帖数: '8', 状态: '正常', 注册时间: '2026-01-15 10:30', 最后活跃: '2026-03-26 08:15' },
      { 用户ID: 'B82K11Q7', '头像/昵称': '善信·李四', 等级: 'Lv.2入门', 累计上香: '64', 发帖数: '15', 状态: '禁言中（剩余3天）', 注册时间: '2026-02-03 21:10', 最后活跃: '2026-03-26 12:42' },
      { 用户ID: 'C71M45P2', '头像/昵称': '善信·王五', 等级: 'Lv.5造像', 累计上香: '482', 发帖数: '26', 状态: '正常', 注册时间: '2025-12-11 08:05', 最后活跃: '2026-03-26 09:20' },
      { 用户ID: 'D95T62L4', '头像/昵称': '善信·赵六', 等级: 'Lv.1初见', 累计上香: '18', 发帖数: '2', 状态: '已封号', 注册时间: '2026-03-08 14:18', 最后活跃: '2026-03-20 11:08' },
      { 用户ID: 'E47R83N1', '头像/昵称': '善信·周七', 等级: 'Lv.4研经', 累计上香: '312', 发帖数: '19', 状态: '正常', 注册时间: '2025-11-20 16:45', 最后活跃: '2026-03-26 07:50' },
      { 用户ID: 'F26S19W8', '头像/昵称': '善信·陈八', 等级: 'Lv.6圆满', 累计上香: '1258', 发帖数: '42', 状态: '正常', 注册时间: '2025-10-05 09:30', 最后活跃: '2026-03-26 11:18' }
    ],
    actionForms: [
      {
        action: '禁言',
        title: '用户禁言设置',
        groups: [{
          title: '禁言信息',
          fields: [
            { label: '禁言时长', type: 'select', required: true, options: ['3天', '7天', '30天', '永久'], description: '禁言期间不能发帖/评论，可正常上香' },
            { label: '禁言原因', type: 'textarea', required: true, maxLength: 200, description: '用户将收到通知"您因{原因}已被禁言{时长}"' }
          ]
        }],
        effectStatus: '禁言中'
      },
      {
        action: '封号',
        title: '用户封号处理',
        groups: [{
          title: '封号信息',
          fields: [
            { label: '封号原因', type: 'textarea', required: true, maxLength: 200, description: '永久禁止登录，保留所有数据' }
          ]
        }],
        effectStatus: '已封号'
      }
    ]
  },
  'user-detail': {
    detailSections: [
      {
        title: '基础信息',
        items: [
          '用户ID：oXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          '头像：[用户头像] 「可点击重置头像」',
          '昵称：善信·张三 「可点击重置昵称」',
          '个性签名：每日一香，心安如常 「可点击清空签名」',
          '性别：男',
          '地区：四川·成都',
          '手机号：138****8888 「可点击解绑手机」',
          '注册时间：2026-01-15 10:30:00',
          '最后登录：2026-03-26 08:15:00',
          '状态：正常'
        ]
      },
      {
        title: '会员信息',
        items: [
          '当前等级：Lv.3 游方',
          '累计上香次数：156次',
          '距下一级：还差44次升至Lv.4研经',
          '升级历史：Lv.1 2026-01-15 / Lv.2 2026-02-01 / Lv.3 2026-03-10',
          '已解锁香型：平安香、青云香、芝兰香'
        ]
      }
    ],
    tabs: [
      {
        name: '上香记录',
        columns: ['记录ID', '香型', '祈福语', '上香时间', '当时排名', '上香来源'],
        mockRows: [
          { 记录ID: '20260326091530001', 香型: '「平安香」', 祈福语: '愿家人平安健康', 上香时间: '2026-03-26 09:15:30', 当时排名: '第128名', 上香来源: '免费' },
          { 记录ID: '20260325195812009', 香型: '「青云香」', 祈福语: '愿事业顺利', 上香时间: '2026-03-25 19:58:12', 当时排名: '第86名', 上香来源: '分享获得' },
          { 记录ID: '20260324080500003', 香型: '「芝兰香」', 祈福语: '愿心境清明', 上香时间: '2026-03-24 08:05:00', 当时排名: '第145名', 上香来源: '免费' }
        ]
      },
      {
        name: '发帖记录',
        columns: ['帖子ID', '标题/内容摘要', '分类', '状态', '点赞数', '评论数', '发布时间'],
        mockRows: [
          { 帖子ID: 'POST20260326001', '标题/内容摘要': '今天在缘·云香为家人祈福...', 分类: '自由发帖', 状态: '已发布', 点赞数: '128', 评论数: '32', 发布时间: '2026-03-26 10:30' },
          { 帖子ID: 'POST20260320015', '标题/内容摘要': '分享坚持上香30天的感悟', 分类: '自由发帖', 状态: '已发布', 点赞数: '56', 评论数: '11', 发布时间: '2026-03-20 15:22' }
        ]
      },
      {
        name: '评论记录',
        columns: ['评论ID', '评论内容', '所属帖子', '评论时间'],
        mockRows: [
          { 评论ID: 'CMT20260326001', 评论内容: '愿你家人平安顺遂', 所属帖子: '今天在缘·云香为家人祈福...', 评论时间: '2026-03-26 11:20' },
          { 评论ID: 'CMT20260324003', 评论内容: '我也有同样的感悟', 所属帖子: '分享坚持上香30天的感悟', 评论时间: '2026-03-24 09:10' }
        ]
      },
      {
        name: '分享记录',
        columns: ['分享次数', '邀请新用户数', '被邀请人', '注册时间'],
        mockRows: [
          { 分享次数: '35次', 邀请新用户数: '8人', 被邀请人: '善信·赵六', 注册时间: '2026-03-20' },
          { 分享次数: '', 邀请新用户数: '', 被邀请人: '善信·孙九', 注册时间: '2026-03-22' },
          { 分享次数: '', 邀请新用户数: '', 被邀请人: '善信·钱十', 注册时间: '2026-03-25' }
        ]
      },
      {
        name: '违规记录',
        columns: ['违规时间', '违规内容', '违规原因', '处罚措施', '操作人'],
        mockRows: [
          { 违规时间: '2026-03-15 14:30', 违规内容: '评论中包含导流信息', 违规原因: '广告', 处罚措施: '禁言3天', 操作人: 'admin_zhangsan' }
        ]
      }
    ],
    actionForms: [
      {
        action: '调整等级',
        title: '等级调整',
        groups: [{
          title: '等级信息',
          fields: [
            { label: '当前等级', type: 'text', readonly: true, defaultValue: 'Lv.3游方', description: '当前等级，不可编辑' },
            { label: '调整后等级', type: 'select', required: true, options: levelOptions.slice(1), description: '选择调整后的目标等级' },
            { label: '调整原因', type: 'textarea', required: true, maxLength: 200, description: '如"数据补偿"、"活动奖励"等，操作记入日志' }
          ]
        }]
      },
      {
        action: '禁言',
        title: '用户禁言设置',
        groups: [{
          title: '禁言信息',
          fields: [
            { label: '禁言时长', type: 'select', required: true, options: ['3天', '7天', '30天', '永久'] },
            { label: '禁言原因', type: 'textarea', required: true, maxLength: 200 }
          ]
        }],
        effectStatus: '禁言中'
      },
      {
        action: '封号',
        title: '用户封号处理',
        groups: [{
          title: '封号信息',
          fields: [
            { label: '封号原因', type: 'textarea', required: true, maxLength: 200 }
          ]
        }],
        effectStatus: '已封号'
      }
    ]
  },
  'level-manage': {
    editorGroups: [
      {
        title: '等级规则表',
        fields: [
          { label: '等级', type: 'text', readonly: true, defaultValue: 'Lv.1 ~ Lv.6', description: '系统固定6个等级，不可新增/删除' },
          { label: 'Lv.1 等级名称', type: 'text', required: true, maxLength: 4, defaultValue: '初见', description: 'Lv.1阈值固定为0' },
          { label: 'Lv.2 等级名称', type: 'text', required: true, maxLength: 4, defaultValue: '入门' },
          { label: 'Lv.2 升级阈值', type: 'number', required: true, min: 1, max: 9999, defaultValue: 20, description: '累计上香次数' },
          { label: 'Lv.3 等级名称', type: 'text', required: true, maxLength: 4, defaultValue: '游方' },
          { label: 'Lv.3 升级阈值', type: 'number', required: true, min: 1, max: 9999, defaultValue: 50 },
          { label: 'Lv.4 等级名称', type: 'text', required: true, maxLength: 4, defaultValue: '研经' },
          { label: 'Lv.4 升级阈值', type: 'number', required: true, min: 1, max: 9999, defaultValue: 200 },
          { label: 'Lv.5 等级名称', type: 'text', required: true, maxLength: 4, defaultValue: '造像' },
          { label: 'Lv.5 升级阈值', type: 'number', required: true, min: 1, max: 9999, defaultValue: 500 },
          { label: 'Lv.6 等级名称', type: 'text', required: true, maxLength: 4, defaultValue: '圆满' },
          { label: 'Lv.6 升级阈值', type: 'number', required: true, min: 1, max: 9999, defaultValue: 1000 },
          { label: '解锁香型', type: 'select', multiple: true, options: incenseOptionsWithCommon.slice(1), description: '枚举值来源于"香型管理"中已上线的香型' },
          { label: '解锁材质', type: 'select', multiple: true, options: ['青铜', '青瓷', '紫铜', '白玉', '乌金'], description: '枚举值来源于"香炉材质管理"中已启用的材质' },
          { label: '解锁特权', type: 'textarea', rows: 2, description: '描述该等级的特殊权益', example: '专属头像框' },
          { label: '徽章图片', type: 'upload', description: 'PNG格式，不超过500KB' }
        ]
      }
    ]
  },
  'blacklist-manage': {
    queryDefinitions: [
      { label: '用户昵称', type: 'text', placeholder: '请输入用户昵称' },
      { label: '封禁类型', type: 'select', options: ['全部', '禁言', '封号'] },
      { label: '执行日期', type: 'date-range' }
    ],
    sortFields: ['执行时间', '到期时间'],
    mockRows: [
      { '用户头像/昵称': '善信·李四', 封禁类型: '禁言', 封禁原因: '发布广告内容', 操作人: 'admin_zhangsan', 执行时间: '2026-03-20 14:30', 到期时间: '2026-03-23 14:30' },
      { '用户头像/昵称': '善信·赵六', 封禁类型: '封号', 封禁原因: '累计违规4次，触发阶梯处罚', 操作人: 'audit_li', 执行时间: '2026-03-18 09:20', 到期时间: '永久' },
      { '用户头像/昵称': '善信·周七', 封禁类型: '禁言', 封禁原因: '评论区导流', 操作人: 'audit_wang', 执行时间: '2026-03-25 11:05', 到期时间: '2026-04-01 11:05' },
      { '用户头像/昵称': '善信·陈八', 封禁类型: '禁言', 封禁原因: '发布不当宗教言论', 操作人: 'audit_li', 执行时间: '2026-03-26 08:15', 到期时间: '2026-04-02 08:15' }
    ]
  },

  /* ==================== 消息中心 ==================== */

  'notice-manage': {
    queryDefinitions: [
      { label: '公告标题', type: 'text', placeholder: '请输入公告标题' },
      { label: '公告类型', type: 'select', options: ['全部', '弹窗', '横幅', '消息'] },
      { label: '状态', type: 'select', options: ['全部', '草稿', '已发布', '已过期'] },
      { label: '目标用户', type: 'select', options: ['全部', '全部用户', '指定等级', '指定地区'] }
    ],
    mockRows: [
      { 公告ID: 'ANN20260326001', 公告标题: '缘·云香V1.0正式上线公告', 公告类型: '弹窗', 目标用户: '全部用户', 生效时间: '2026-03-26 10:00', 失效时间: '2026-04-02 10:00', 状态: '已发布' },
      { 公告ID: 'ANN20260325002', 公告标题: '清明祈福专题活动开启', 公告类型: '横幅', 目标用户: '全部用户', 生效时间: '2026-04-01 00:00', 失效时间: '2026-04-07 23:59', 状态: '草稿' },
      { 公告ID: 'ANN20260320005', 公告标题: '系统维护通知', 公告类型: '消息', 目标用户: '全部用户', 生效时间: '2026-03-20 22:00', 失效时间: '2026-03-21 06:00', 状态: '已过期' },
      { 公告ID: 'ANN20260328003', 公告标题: '会员等级权益升级说明', 公告类型: '弹窗', 目标用户: '指定等级', 生效时间: '2026-03-28 10:00', 失效时间: '2026-04-10 10:00', 状态: '草稿' }
    ],
    editorGroups: [
      {
        title: '新增/编辑公告',
        fields: [
          { label: '公告标题', type: 'text', required: true, maxLength: 50, description: '不超过50个字符' },
          { label: '公告类型', type: 'select', required: true, options: ['弹窗', '横幅', '消息'], description: '弹窗：强制展示；横幅：顶部滚动；消息：消息列表' },
          { label: '公告内容', type: 'textarea', required: true, rows: 5, description: '支持富文本编辑器' },
          { label: '目标用户', type: 'select', required: true, options: ['全部用户', '指定等级', '指定地区'], description: '选择推送目标' },
          { label: '生效时间', type: 'datetime', required: true },
          { label: '失效时间', type: 'datetime', required: true, description: '必须晚于生效时间，到期自动下线' }
        ]
      }
    ],
    preview: {
      title: '公告用户端预览',
      caption: '支持弹窗、横幅、消息三种展示形态',
      modes: ['启动弹窗', '首页横幅', '消息列表'],
      lines: ['目标用户：全部用户 / 指定等级 / 指定地区', '到达生效时间后自动展示，到期自动下线']
    }
  },
  'message-push': {
    tabs: [
      {
        name: '推送记录',
        columns: ['推送ID', '消息内容', '推送类型', '目标范围', '发送时间', '送达数'],
        mockRows: [
          { 推送ID: 'MSG20260326001', 消息内容: '恭喜您升级到Lv.3游方！', 推送类型: '定向', 目标范围: '善信·张三', 发送时间: '2026-03-26 10:00', 送达数: '1' },
          { 推送ID: 'MSG20260325008', 消息内容: '缘·云香V1.0正式上线啦！', 推送类型: '群发', 目标范围: '全部用户', 发送时间: '2026-03-25 09:00', 送达数: '12580' },
          { 推送ID: 'MSG20260324015', 消息内容: '您因发布广告内容已被禁言3天', 推送类型: '定向', 目标范围: '善信·李四', 发送时间: '2026-03-24 14:30', 送达数: '1' },
          { 推送ID: 'MSG20260323022', 消息内容: '清明祈福主题活动即将开启', 推送类型: '群发', 目标范围: 'Lv.3及以上', 发送时间: '2026-03-23 18:00', 送达数: '5680' }
        ]
      },
      {
        name: '消息模板',
        columns: ['模板ID', '模板名称', '模板内容', '操作'],
        mockRows: [
          { 模板ID: 'TPL_001', 模板名称: '升级通知', 模板内容: '恭喜{用户昵称}，您已升级到{等级名}！' },
          { 模板ID: 'TPL_002', 模板名称: '禁言通知', 模板内容: '您因{禁言原因}已被禁言{禁言时长}，禁言期间无法发帖和评论。' },
          { 模板ID: 'TPL_003', 模板名称: '解封通知', 模板内容: '您的账号已恢复正常使用。' },
          { 模板ID: 'TPL_004', 模板名称: '祈福语驳回通知', 模板内容: '您的祈福语因内容不当已被替换为系统默认文案。' }
        ],
        actions: ['编辑模板', '删除模板']
      }
    ],
    actionForms: [
      {
        action: '新建推送',
        title: '新建消息推送',
        groups: [{
          title: '推送信息',
          fields: [
            { label: '消息内容', type: 'textarea', required: true, maxLength: 500, description: '可选择模板或自定义输入' },
            { label: '推送类型', type: 'select', required: true, options: ['群发', '定向'], description: '群发面向用户群体，定向面向指定用户' },
            { label: '目标范围', type: 'select', required: true, options: ['全部用户', '指定等级', '指定用户'], description: '单用户每日最多收到5条系统消息' }
          ]
        }]
      },
      {
        action: '编辑模板',
        title: '编辑消息模板',
        groups: [{
          title: '模板信息',
          fields: [
            { label: '模板名称', type: 'text', required: true, description: '模板名称' },
            { label: '模板内容', type: 'textarea', required: true, description: '支持变量{用户昵称}、{等级名}等' }
          ]
        }]
      }
    ]
  },
  'feedback-manage': {
    queryDefinitions: [
      { label: '用户昵称', type: 'text', placeholder: '请输入用户昵称' },
      { label: '反馈分类', type: 'select', options: ['全部', 'Bug反馈', '功能建议', '投诉', '其他'] },
      { label: '处理状态', type: 'select', options: ['全部', '待处理', '已回复', '已关闭'] },
      { label: '提交时间', type: 'date-range' }
    ],
    mockRows: [
      { 反馈ID: 'FB20260326001', 用户昵称: '善信·张三', 反馈内容: '希望增加每日运势功能。', 截图: '[2张图]', 反馈分类: '功能建议', 提交时间: '2026-03-26 15:00', 处理状态: '待处理' },
      { 反馈ID: 'FB20260325008', 用户昵称: '善信·李四', 反馈内容: 'iPhone 端分享后返回页面偶发白屏。', 截图: '[1张图]', 反馈分类: 'Bug反馈', 提交时间: '2026-03-25 09:42', 处理状态: '已回复' },
      { 反馈ID: 'FB20260324005', 用户昵称: '善信·王五', 反馈内容: '公告弹窗关闭后希望不要重复出现。', 截图: '[0张图]', 反馈分类: '其他', 提交时间: '2026-03-24 20:16', 处理状态: '已关闭' },
      { 反馈ID: 'FB20260323012', 用户昵称: '善信·赵六', 反馈内容: '上香动画卡顿，建议优化性能。', 截图: '[3张图]', 反馈分类: 'Bug反馈', 提交时间: '2026-03-23 11:08', 处理状态: '待处理' },
      { 反馈ID: 'FB20260322009', 用户昵称: '善信·周七', 反馈内容: '客服回复太慢了，等了两天没人理。', 截图: '[0张图]', 反馈分类: '投诉', 提交时间: '2026-03-22 16:30', 处理状态: '已回复' }
    ],
    actionForms: [
      {
        action: '回复',
        title: '反馈回复',
        groups: [{
          title: '回复内容',
          fields: [
            { label: '回复内容', type: 'textarea', required: true, maxLength: 500, description: '回复将通过消息推送发送至用户' }
          ]
        }],
        effectStatus: '已回复'
      }
    ]
  },

  /* ==================== 数据统计 ==================== */

  'export-center': {
    editorGroups: [
      {
        title: '导出任务',
        fields: [
          { label: '数据类型', type: 'select', required: true, options: ['用户数据', '上香记录', '帖子数据', '评论数据', '分享数据', '排行榜数据'], description: '选择要导出的数据类型' },
          { label: '日期范围', type: 'text', required: true, description: '选择开始和结束日期', example: '2026-03-01 至 2026-03-26' },
          { label: '导出字段', type: 'text', description: '根据所选数据类型勾选需要的列', example: '用户昵称、香型、祈福语、时间' },
          { label: '文件格式', type: 'select', required: true, options: ['xlsx', 'csv'], description: '选择导出文件格式' }
        ]
      },
      {
        title: '导出记录',
        fields: [
          { label: '导出说明', type: 'text', readonly: true, defaultValue: '数据量≤10000条同步下载；>10000条异步处理，完成后通知下载', description: '所有导出操作记入操作日志' }
        ]
      }
    ],
    actionForms: [
      {
        action: '导出',
        title: '导出任务配置',
        groups: [{
          title: '导出信息',
          fields: [
            { label: '数据类型', type: 'select', required: true, options: ['用户数据', '上香记录', '帖子数据', '评论数据', '分享数据', '排行榜数据'] },
            { label: '日期范围', type: 'text', required: true },
            { label: '导出字段', type: 'text' },
            { label: '文件格式', type: 'select', required: true, options: ['xlsx', 'csv'] }
          ]
        }]
      }
    ]
  },

  /* ==================== 系统管理 ==================== */

  'account-manage': {
    queryDefinitions: [
      { label: '账号名称', type: 'text', placeholder: '请输入账号名称' },
      { label: '登录邮箱', type: 'text', placeholder: '请输入登录邮箱' },
      { label: '角色', type: 'select', options: ['全部', ...adminRoleOptions] },
      { label: '状态', type: 'select', options: ['全部', '启用', '停用'] }
    ],
    mockRows: [
      { 账号ID: 'ADMIN001', 账号名称: '张三', 登录邮箱: 'zhangsan@example.com', 角色: '超级管理员', 状态: '启用', 最后登录: '2026-03-26 09:00' },
      { 账号ID: 'ADMIN002', 账号名称: '李敏', 登录邮箱: 'limin@example.com', 角色: '内容审核员', 状态: '启用', 最后登录: '2026-03-26 08:43' },
      { 账号ID: 'ADMIN003', 账号名称: '王倩', 登录邮箱: 'wangqian@example.com', 角色: '客服专员', 状态: '停用', 最后登录: '2026-03-20 19:12' },
      { 账号ID: 'ADMIN004', 账号名称: '赵伟', 登录邮箱: 'zhaowei@example.com', 角色: '运营专员', 状态: '启用', 最后登录: '2026-03-26 10:15' },
      { 账号ID: 'ADMIN005', 账号名称: '周芳', 登录邮箱: 'zhoufang@example.com', 角色: '数据分析师', 状态: '启用', 最后登录: '2026-03-25 17:30' }
    ],
    editorGroups: [
      {
        title: '账号信息',
        fields: [
          { label: '账号名称', type: 'text', required: true, maxLength: 20, description: '管理员姓名' },
          { label: '登录邮箱', type: 'text', required: true, description: '邮箱格式校验，不可与已有账号重复' },
          { label: '初始密码', type: 'text', required: true, description: '8位以上，含大小写字母和数字；首次登录强制修改', example: 'Abc12345' },
          { label: '角色', type: 'select', required: true, options: adminRoleOptions, description: '分配系统角色' }
        ]
      }
    ]
  },
  'role-manage': {
    mockRows: [
      { 角色ID: 'ROLE_001', 角色名称: '超级管理员', 角色说明: '拥有全部系统权限', 账号数量: '1' },
      { 角色ID: 'ROLE_002', 角色名称: '运营专员', 角色说明: '负责日常业务配置和活动运营', 账号数量: '3' },
      { 角色ID: 'ROLE_003', 角色名称: '内容审核员', 角色说明: '内容安全审核与违规处理', 账号数量: '2' },
      { 角色ID: 'ROLE_004', 角色名称: '客服专员', 角色说明: '用户客诉处理与消息推送', 账号数量: '2' },
      { 角色ID: 'ROLE_005', 角色名称: '数据分析师', 角色说明: '数据监控与报表导出', 账号数量: '1' }
    ],
    editorGroups: [
      {
        title: '角色信息',
        fields: [
          { label: '角色名称', type: 'text', required: true, description: '角色名称' },
          { label: '角色说明', type: 'textarea', description: '描述角色职责' }
        ]
      }
    ],
    permissionTree: fullPermissionTree
  },
  'operation-logs': {
    tabs: [
      {
        name: '登录日志',
        columns: ['操作人', '登录时间', 'IP地址', '设备信息', '登录结果'],
        mockRows: [
          { 操作人: '张三', 登录时间: '2026-03-26 09:00:15', IP地址: '192.168.1.100', 设备信息: 'Chrome 120 / Windows 11', 登录结果: '成功' },
          { 操作人: '李敏', 登录时间: '2026-03-26 08:43:22', IP地址: '192.168.1.101', 设备信息: 'Safari 17 / macOS 14', 登录结果: '成功' },
          { 操作人: '王倩', 登录时间: '2026-03-25 19:12:08', IP地址: '10.0.1.55', 设备信息: 'Chrome 119 / Windows 10', 登录结果: '失败' },
          { 操作人: '张三', 登录时间: '2026-03-25 08:55:30', IP地址: '192.168.1.100', 设备信息: 'Chrome 120 / Windows 11', 登录结果: '成功' },
          { 操作人: '赵伟', 登录时间: '2026-03-26 10:15:45', IP地址: '172.16.0.88', 设备信息: 'Edge 120 / Windows 11', 登录结果: '成功' }
        ]
      },
      {
        name: '操作日志',
        columns: ['操作人', '操作时间', '操作类型', '操作对象', '操作详情', 'IP地址'],
        mockRows: [
          { 操作人: '张三', 操作时间: '2026-03-26 14:30:20', 操作类型: '用户管理', 操作对象: '用户"善信·李四"', 操作详情: '禁言3天，原因：发布广告', IP地址: '192.168.1.100' },
          { 操作人: '李敏', 操作时间: '2026-03-26 11:15:08', 操作类型: '内容管理', 操作对象: '帖子POST20260326001', 操作详情: '审核通过', IP地址: '192.168.1.101' },
          { 操作人: '赵伟', 操作时间: '2026-03-26 10:20:35', 操作类型: '配置变更', 操作对象: '上香规则配置', 操作详情: '每日免费上香次数 3→5', IP地址: '172.16.0.88' },
          { 操作人: '周芳', 操作时间: '2026-03-25 16:45:12', 操作类型: '数据导出', 操作对象: '上香记录', 操作详情: '导出2026-03数据 xlsx格式', IP地址: '192.168.1.102' },
          { 操作人: '张三', 操作时间: '2026-03-25 14:10:50', 操作类型: '公告管理', 操作对象: '公告ANN20260325002', 操作详情: '新增草稿"清明祈福专题活动开启"', IP地址: '192.168.1.100' },
          { 操作人: '李敏', 操作时间: '2026-03-25 09:30:18', 操作类型: '用户管理', 操作对象: '用户"善信·赵六"', 操作详情: '封号处理，原因：累计违规4次', IP地址: '192.168.1.101' }
        ]
      }
    ],
    queryDefinitions: [
      { label: '操作人', type: 'text', placeholder: '请输入操作人' },
      { label: '操作类型', type: 'select', options: ['全部', '用户管理', '内容管理', '配置变更', '数据导出', '公告管理'] },
      { label: '操作日期', type: 'date-range' }
    ]
  },
  'system-config': {
    editorGroups: [
      {
        title: '小程序配置',
        fields: [
          { label: '小程序AppID', type: 'text', required: true, defaultValue: 'wx**************', description: '加密存储，仅超级管理员可点击"查看明文"' },
          { label: '小程序AppSecret', type: 'text', required: true, defaultValue: '****************', description: '加密存储，仅超级管理员可点击"查看明文"' }
        ]
      },
      {
        title: '敏感词库',
        fields: [
          { label: '敏感词分类', type: 'select', options: ['涉政', '色情', '广告', '宗教违规', '赌博', '其他'], description: '按分类管理敏感词' },
          { label: '当前词库数量', type: 'text', readonly: true, defaultValue: '涉政 128条 / 色情 256条 / 广告 89条 / 宗教 64条 / 赌博 42条 / 其他 35条', description: '支持增删改查和批量导入' }
        ]
      },
      {
        title: '功能开关',
        fields: [
          { label: '论坛发帖开关', type: 'switch', defaultValue: true, description: '关闭后用户不能发帖，已有帖子正常展示' },
          { label: '分享奖励开关', type: 'switch', defaultValue: true, description: '关闭后所有分享不发放奖励' },
          { label: '排行榜展示开关', type: 'switch', defaultValue: true, description: '关闭后用户端不展示排行榜入口' },
          { label: '用户注册开关', type: 'switch', defaultValue: true, description: '关闭后新用户无法注册' }
        ]
      }
    ],
    actionForms: [
      {
        action: '保存',
        title: '系统配置保存校验',
        groups: [{
          title: '二次验证',
          fields: [
            { label: '管理员密码', type: 'text', required: true, description: '请输入管理员密码进行二次验证' }
          ]
        }]
      },
      {
        action: '导入敏感词',
        title: '敏感词批量导入',
        groups: [{
          title: '导入信息',
          fields: [
            { label: '敏感词分类', type: 'select', required: true, options: ['涉政', '色情', '广告', '宗教违规', '赌博', '其他'] },
            { label: '批量导入xlsx/csv', type: 'upload', required: true, description: '上传xlsx/csv文件，系统自动去重后导入' }
          ]
        }]
      }
    ]
  }
};

export const extraPagesByModule = {
  user: [
    {
      id: 'points-manage',
      path: '/users/points',
      title: '积分管理（V2.0）',
      type: 'tabs',
      priority: 'P3',
      version: 'V2.0预留',
      roles: ['运营专员', '超级管理员'],
      summary: '预留积分规则配置、积分明细查询和兑换记录管理能力。',
      tabs: [
        { name: '积分规则配置', points: ['积分获取规则', '积分消耗规则', '积分有效期', '积分商城兑换门槛'] },
        { name: '积分明细查询', points: ['积分流水ID', '用户昵称', '变动类型', '变动值', '变动时间'] },
        { name: '兑换记录', points: ['兑换单号', '兑换商品', '兑换积分', '兑换时间', '发货状态'] }
      ],
      actions: ['保存规则', '导出'],
      coverage: ['积分规则配置', '明细查询', '兑换记录'],
      rules: ['当前版本为V2.0预留，不影响现有积分关闭状态']
    }
  ],
  message: [
    {
      id: 'banner-manage',
      path: '/message/banners',
      title: 'Banner管理（V2.0）',
      type: 'list',
      priority: 'P3',
      version: 'V2.0预留',
      roles: ['运营专员', '超级管理员'],
      summary: '预留首页轮播 Banner 的配置、跳转目标与展示时段控制。',
      query: ['Banner标题', '状态', '展示日期'],
      columns: ['BannerID', 'Banner标题', 'Banner图片', '跳转类型', '跳转目标', '展示时段', '状态', '操作'],
      actions: ['新增', '编辑', '启用', '禁用'],
      queryDefinitions: [
        { label: 'Banner标题', type: 'text', placeholder: '请输入Banner标题' },
        { label: '状态', type: 'select', options: ['全部', '启用', '禁用'] },
        { label: '展示日期', type: 'date-range' }
      ],
      mockRows: [
        { BannerID: 'BNR202604001', Banner标题: '清明祈福主题活动', Banner图片: '清明_banner.jpg', 跳转类型: '小程序页面', 跳转目标: '/pages/activity/qingming', 展示时段: '2026-04-01 00:00 至 2026-04-07 23:59', 状态: '启用' },
        { BannerID: 'BNR202604002', Banner标题: '缘·云香V1.1更新公告', Banner图片: '版本更新_banner.jpg', 跳转类型: '外部H5', 跳转目标: 'https://example.com/release-note', 展示时段: '2026-04-05 10:00 至 2026-04-12 10:00', 状态: '启用' },
        { BannerID: 'BNR202603018', Banner标题: '春季善愿征集', Banner图片: '善愿征集_banner.jpg', 跳转类型: '小程序页面', 跳转目标: '/pages/forum/wish', 展示时段: '2026-03-15 00:00 至 2026-03-31 23:59', 状态: '禁用' }
      ],
      editorGroups: [
        {
          title: 'Banner配置',
          fields: [
            { label: 'Banner标题', type: 'text', required: true },
            { label: 'Banner图片', type: 'upload', required: true },
            { label: '跳转类型', type: 'select', required: true, options: ['小程序页面', '外部H5'] },
            { label: '跳转目标', type: 'text', required: true },
            { label: '开始时间', type: 'datetime', required: true },
            { label: '结束时间', type: 'datetime', required: true },
            { label: '状态', type: 'select', options: ['启用', '禁用'] }
          ]
        }
      ],
      coverage: ['首页轮播图配置', '跳转链接 / 小程序页面配置', '展示时段控制'],
      rules: ['Banner管理为V2.0预留能力']
    }
  ]
};
