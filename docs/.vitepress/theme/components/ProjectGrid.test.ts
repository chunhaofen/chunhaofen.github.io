import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectGrid from './ProjectGrid.vue'
import ProjectCard from './ProjectCard.vue'

describe('ProjectGrid', () => {
  it('renders ProjectCard components for each project', () => {
    const wrapper = mount(ProjectGrid)
    
    const projectCards = wrapper.findAllComponents(ProjectCard)
    expect(projectCards.length).toBeGreaterThan(0)
  })

  it('sorts projects by order field in ascending order', () => {
    const wrapper = mount(ProjectGrid)
    
    const projectCards = wrapper.findAllComponents(ProjectCard)
    
    // Get the order values from each project card
    const orders = projectCards.map(card => card.props('project').order)
    
    // Check if orders are in ascending sequence
    for (let i = 0; i < orders.length - 1; i++) {
      expect(orders[i]).toBeLessThanOrEqual(orders[i + 1])
    }
  })

  it('renders all three projects from the data', () => {
    const wrapper = mount(ProjectGrid)
    
    const projectCards = wrapper.findAllComponents(ProjectCard)
    expect(projectCards).toHaveLength(3)
  })

  it('renders projects in correct order', () => {
    const wrapper = mount(ProjectGrid)
    
    const projectCards = wrapper.findAllComponents(ProjectCard)
    
    // Based on the projects data, the order should be:
    // 1. electron-infra-kit (order: 1)
    // 2. electron-infra-kit-docs (order: 2)
    // 3. electron-infra-showcase (order: 3)
    expect(projectCards[0].props('project').id).toBe('electron-infra-kit')
    expect(projectCards[1].props('project').id).toBe('electron-infra-kit-docs')
    expect(projectCards[2].props('project').id).toBe('electron-infra-showcase')
  })

  it('has grid layout class', () => {
    const wrapper = mount(ProjectGrid)
    
    expect(wrapper.find('.projects-grid').exists()).toBe(true)
  })
})
