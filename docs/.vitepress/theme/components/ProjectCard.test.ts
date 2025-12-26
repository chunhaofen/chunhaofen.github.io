import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from './ProjectCard.vue'
import type { Project } from '../../data/projects'

describe('ProjectCard', () => {
  const mockProject: Project = {
    id: 'test-project',
    title: 'Test Project',
    description: 'This is a test project description',
    icon: '🎯',
    tags: ['TypeScript', 'Vue', 'Testing'],
    order: 1,
    links: {
      github: 'https://github.com/test/project',
      npm: 'https://www.npmjs.com/package/test-project'
    },
    features: ['Feature 1', 'Feature 2'],
    techStack: ['TypeScript', 'Vue']
  }

  it('renders project icon', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    expect(wrapper.find('.project-icon').text()).toBe('🎯')
  })

  it('renders project title', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    expect(wrapper.find('.project-title').text()).toBe('Test Project')
  })

  it('renders project description', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    expect(wrapper.find('.project-description').text()).toBe('This is a test project description')
  })

  it('renders all project tags', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const tags = wrapper.findAll('.tag')
    expect(tags).toHaveLength(3)
    expect(tags[0].text()).toBe('TypeScript')
    expect(tags[1].text()).toBe('Vue')
    expect(tags[2].text()).toBe('Testing')
  })

  it('renders GitHub link when provided', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const githubLink = wrapper.find('a[href="https://github.com/test/project"]')
    expect(githubLink.exists()).toBe(true)
    expect(githubLink.text()).toBe('GitHub')
  })

  it('renders npm link when provided', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const npmLink = wrapper.find('a[href="https://www.npmjs.com/package/test-project"]')
    expect(npmLink.exists()).toBe(true)
    expect(npmLink.text()).toBe('npm')
  })

  it('renders details link', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const detailsLink = wrapper.find('a[href="/projects/test-project"]')
    expect(detailsLink.exists()).toBe(true)
    expect(detailsLink.text()).toBe('查看详情')
  })

  it('does not render GitHub link when not provided', () => {
    const projectWithoutGithub: Project = {
      ...mockProject,
      links: {}
    }
    
    const wrapper = mount(ProjectCard, {
      props: { project: projectWithoutGithub }
    })
    
    const githubLink = wrapper.find('a[href*="github"]')
    expect(githubLink.exists()).toBe(false)
  })

  it('does not render npm link when not provided', () => {
    const projectWithoutNpm: Project = {
      ...mockProject,
      links: { github: 'https://github.com/test/project' }
    }
    
    const wrapper = mount(ProjectCard, {
      props: { project: projectWithoutNpm }
    })
    
    const npmLink = wrapper.find('a[href*="npmjs"]')
    expect(npmLink.exists()).toBe(false)
  })
})
