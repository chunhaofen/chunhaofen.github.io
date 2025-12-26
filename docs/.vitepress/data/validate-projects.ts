/**
 * 项目数据验证脚本
 * 验证所有项目数据符合 Project 接口定义
 */

import { projects, type Project } from './projects'

/**
 * 验证必需字段是否存在
 */
function validateRequiredFields(project: Project): string[] {
  const errors: string[] = []
  const requiredFields = [
    'id',
    'title',
    'description',
    'icon',
    'tags',
    'order',
    'links',
    'features',
    'techStack'
  ] as const

  for (const field of requiredFields) {
    if (project[field] === undefined || project[field] === null) {
      errors.push(`项目 "${project.id || 'unknown'}" 缺少必需字段: ${field}`)
    }
  }

  // 验证数组字段不为空
  if (Array.isArray(project.tags) && project.tags.length === 0) {
    errors.push(`项目 "${project.id}" 的 tags 字段不能为空数组`)
  }

  if (Array.isArray(project.features) && project.features.length === 0) {
    errors.push(`项目 "${project.id}" 的 features 字段不能为空数组`)
  }

  if (Array.isArray(project.techStack) && project.techStack.length === 0) {
    errors.push(`项目 "${project.id}" 的 techStack 字段不能为空数组`)
  }

  // 验证 links 对象至少有一个链接
  if (
    project.links &&
    !project.links.github &&
    !project.links.npm &&
    !project.links.docs &&
    !project.links.demo
  ) {
    errors.push(`项目 "${project.id}" 的 links 对象至少需要一个链接`)
  }

  return errors
}

/**
 * 验证 order 字段唯一性
 */
function validateOrderUniqueness(projects: Project[]): string[] {
  const errors: string[] = []
  const orderMap = new Map<number, string[]>()

  for (const project of projects) {
    const order = project.order
    if (!orderMap.has(order)) {
      orderMap.set(order, [])
    }
    orderMap.get(order)!.push(project.id)
  }

  for (const [order, ids] of orderMap.entries()) {
    if (ids.length > 1) {
      errors.push(
        `order 值 ${order} 重复，出现在以下项目中: ${ids.join(', ')}`
      )
    }
  }

  return errors
}

/**
 * 验证字段类型
 */
function validateFieldTypes(project: Project): string[] {
  const errors: string[] = []

  if (typeof project.id !== 'string') {
    errors.push(`项目 "${project.id}" 的 id 字段必须是字符串`)
  }

  if (typeof project.title !== 'string') {
    errors.push(`项目 "${project.id}" 的 title 字段必须是字符串`)
  }

  if (typeof project.description !== 'string') {
    errors.push(`项目 "${project.id}" 的 description 字段必须是字符串`)
  }

  if (typeof project.icon !== 'string') {
    errors.push(`项目 "${project.id}" 的 icon 字段必须是字符串`)
  }

  if (!Array.isArray(project.tags)) {
    errors.push(`项目 "${project.id}" 的 tags 字段必须是数组`)
  }

  if (typeof project.order !== 'number') {
    errors.push(`项目 "${project.id}" 的 order 字段必须是数字`)
  }

  if (!Array.isArray(project.features)) {
    errors.push(`项目 "${project.id}" 的 features 字段必须是数组`)
  }

  if (!Array.isArray(project.techStack)) {
    errors.push(`项目 "${project.id}" 的 techStack 字段必须是数组`)
  }

  if (typeof project.links !== 'object' || project.links === null) {
    errors.push(`项目 "${project.id}" 的 links 字段必须是对象`)
  }

  // 验证可选字段类型
  if (project.featured !== undefined && typeof project.featured !== 'boolean') {
    errors.push(`项目 "${project.id}" 的 featured 字段必须是布尔值`)
  }

  if (project.version !== undefined && typeof project.version !== 'string') {
    errors.push(`项目 "${project.id}" 的 version 字段必须是字符串`)
  }

  if (
    project.releaseDate !== undefined &&
    typeof project.releaseDate !== 'string'
  ) {
    errors.push(`项目 "${project.id}" 的 releaseDate 字段必须是字符串`)
  }

  if (project.badges !== undefined) {
    if (!Array.isArray(project.badges)) {
      errors.push(`项目 "${project.id}" 的 badges 字段必须是数组`)
    } else {
      project.badges.forEach((badge, index) => {
        if (typeof badge.alt !== 'string') {
          errors.push(
            `项目 "${project.id}" 的 badges[${index}].alt 字段必须是字符串`
          )
        }
        if (typeof badge.src !== 'string') {
          errors.push(
            `项目 "${project.id}" 的 badges[${index}].src 字段必须是字符串`
          )
        }
      })
    }
  }

  return errors
}

/**
 * 主验证函数
 */
export function validateProjects(): {
  valid: boolean
  errors: string[]
} {
  const allErrors: string[] = []

  // 验证每个项目
  for (const project of projects) {
    const requiredFieldErrors = validateRequiredFields(project)
    const typeErrors = validateFieldTypes(project)
    allErrors.push(...requiredFieldErrors, ...typeErrors)
  }

  // 验证 order 唯一性
  const orderErrors = validateOrderUniqueness(projects)
  allErrors.push(...orderErrors)

  return {
    valid: allErrors.length === 0,
    errors: allErrors
  }
}

/**
 * 运行验证（如果直接执行此文件）
 */
const result = validateProjects()

if (result.valid) {
  console.log('✅ 所有项目数据验证通过！')
  console.log(`共验证 ${projects.length} 个项目`)
} else {
  console.error('❌ 项目数据验证失败：')
  result.errors.forEach((error) => {
    console.error(`  - ${error}`)
  })
  process.exit(1)
}
