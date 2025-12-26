import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from './Badge.vue'

describe('Badge', () => {
  it('renders badge image with correct src', () => {
    const wrapper = mount(Badge, {
      props: {
        src: 'https://img.shields.io/npm/v/test.svg',
        alt: 'npm version'
      }
    })
    
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://img.shields.io/npm/v/test.svg')
  })

  it('renders badge image with correct alt text', () => {
    const wrapper = mount(Badge, {
      props: {
        src: 'https://img.shields.io/npm/v/test.svg',
        alt: 'npm version'
      }
    })
    
    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe('npm version')
  })

  it('hides badge when image fails to load', async () => {
    const wrapper = mount(Badge, {
      props: {
        src: 'https://invalid-url.com/badge.svg',
        alt: 'test badge'
      }
    })
    
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    
    // Trigger error event
    await img.trigger('error')
    
    // After error, image should not be rendered
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('applies badge class to image', () => {
    const wrapper = mount(Badge, {
      props: {
        src: 'https://img.shields.io/npm/v/test.svg',
        alt: 'npm version'
      }
    })
    
    const img = wrapper.find('img')
    expect(img.classes()).toContain('badge')
  })

  it('gracefully handles error without breaking component', async () => {
    const wrapper = mount(Badge, {
      props: {
        src: 'https://invalid-url.com/badge.svg',
        alt: 'test badge'
      }
    })
    
    const img = wrapper.find('img')
    
    // Should not throw error when triggering error event
    await expect(img.trigger('error')).resolves.not.toThrow()
    
    // Component should still be mounted
    expect(wrapper.exists()).toBe(true)
  })
})
