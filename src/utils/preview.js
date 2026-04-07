export function buildSampleValue(column, rowIndex) {
  if (column.includes('ID')) return `ID2026040${rowIndex + 1}`;
  if (column.includes('名称') || column.includes('标题')) return `示例${rowIndex + 1}`;
  if (column.includes('昵称') || column.includes('用户')) return `善信·用户${rowIndex + 1}`;
  if (column.includes('等级')) return `Lv.${rowIndex + 2}`;
  if (column.includes('状态')) return rowIndex % 2 === 0 ? '正常 / 已发布' : '待审核 / 下线';
  if (column.includes('时间') || column.includes('日期')) return `2026-04-0${rowIndex + 1} 09:3${rowIndex}`;
  if (column.includes('排序')) return `${rowIndex + 1}`;
  if (column.includes('次数') || column.includes('数量') || column.includes('浏览') || column.includes('评论') || column.includes('点赞')) return `${(rowIndex + 1) * 12}`;
  if (column.includes('图片')) return '[缩略图]';
  if (column.includes('内容')) return '这里展示摘要或示例内容';
  if (column.includes('操作')) return '查看 / 编辑 / 更多';
  return `示意值${rowIndex + 1}`;
}

export function createTableRows(columns, count = 3) {
  return Array.from({ length: count }).map((_, rowIndex) =>
    columns.map((column) => buildSampleValue(column, rowIndex))
  );
}
