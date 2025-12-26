#!/usr/bin/env node
/**
 * Preview Testing Script
 * Tests all pages, navigation, and links
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DIST_DIR = './dist';
const BASE_URL = 'http://localhost:4173';

// Test results
const results = {
  passed: [],
  failed: [],
  warnings: []
};

function log(type, message) {
  const prefix = {
    pass: '✓',
    fail: '✗',
    warn: '⚠',
    info: 'ℹ'
  }[type] || 'ℹ';
  
  console.log(`${prefix} ${message}`);
  
  if (type === 'pass') results.passed.push(message);
  if (type === 'fail') results.failed.push(message);
  if (type === 'warn') results.warnings.push(message);
}

// Test 1: Verify all required pages exist
function testPagesExist() {
  console.log('\n=== Testing Page Generation ===');
  
  const requiredPages = [
    'index.html',
    'about.html',
    '404.html',
    'projects/index.html',
    'projects/electron-infra-kit.html',
    'projects/electron-infra-kit-docs.html',
    'projects/electron-infra-showcase.html'
  ];
  
  requiredPages.forEach(page => {
    const path = join(DIST_DIR, page);
    if (existsSync(path)) {
      log('pass', `Page exists: ${page}`);
    } else {
      log('fail', `Page missing: ${page}`);
    }
  });
}

// Test 2: Verify navigation links in pages
function testNavigation() {
  console.log('\n=== Testing Navigation Links ===');
  
  const indexPath = join(DIST_DIR, 'index.html');
  if (!existsSync(indexPath)) {
    log('fail', 'index.html not found for navigation test');
    return;
  }
  
  const content = readFileSync(indexPath, 'utf-8');
  
  // Check for navigation links
  const navLinks = [
    { text: '首页', pattern: /首页|Home/i },
    { text: '项目', pattern: /项目|Projects/i },
    { text: '关于', pattern: /关于|About/i }
  ];
  
  navLinks.forEach(({ text, pattern }) => {
    if (pattern.test(content)) {
      log('pass', `Navigation link found: ${text}`);
    } else {
      log('warn', `Navigation link may be missing: ${text}`);
    }
  });
}

// Test 3: Verify external links in project pages
function testExternalLinks() {
  console.log('\n=== Testing External Links ===');
  
  const projectPages = [
    'projects/electron-infra-kit.html',
    'projects/electron-infra-kit-docs.html',
    'projects/electron-infra-showcase.html'
  ];
  
  projectPages.forEach(page => {
    const path = join(DIST_DIR, page);
    if (!existsSync(path)) {
      log('fail', `Project page not found: ${page}`);
      return;
    }
    
    const content = readFileSync(path, 'utf-8');
    
    // Check for GitHub links
    if (content.includes('github.com')) {
      log('pass', `GitHub link found in ${page}`);
    } else {
      log('warn', `No GitHub link in ${page}`);
    }
    
    // Check for npm links (for electron-infra-kit)
    if (page.includes('electron-infra-kit.html') && !page.includes('docs')) {
      if (content.includes('npmjs.com') || content.includes('npm')) {
        log('pass', `npm link found in ${page}`);
      } else {
        log('warn', `No npm link in ${page}`);
      }
    }
  });
}

// Test 4: Verify responsive CSS
function testResponsiveLayout() {
  console.log('\n=== Testing Responsive Layout ===');
  
  const indexPath = join(DIST_DIR, 'index.html');
  if (!existsSync(indexPath)) {
    log('fail', 'index.html not found for responsive test');
    return;
  }
  
  const content = readFileSync(indexPath, 'utf-8');
  
  // Check for viewport meta tag
  if (content.includes('viewport')) {
    log('pass', 'Viewport meta tag found');
  } else {
    log('fail', 'Viewport meta tag missing');
  }
  
  // Check for CSS files
  if (content.includes('.css')) {
    log('pass', 'CSS files linked');
  } else {
    log('warn', 'No CSS files found');
  }
  
  // VitePress includes responsive styles by default
  log('info', 'VitePress includes responsive styles by default');
}

// Test 5: Verify project cards
function testProjectCards() {
  console.log('\n=== Testing Project Cards ===');
  
  const indexPath = join(DIST_DIR, 'index.html');
  if (!existsSync(indexPath)) {
    log('fail', 'index.html not found for project cards test');
    return;
  }
  
  const content = readFileSync(indexPath, 'utf-8');
  
  const projects = [
    'electron-infra-kit',
    'electron-infra-kit-docs',
    'electron-infra-showcase'
  ];
  
  projects.forEach(project => {
    if (content.includes(project)) {
      log('pass', `Project found in homepage: ${project}`);
    } else {
      log('warn', `Project may be missing from homepage: ${project}`);
    }
  });
}

// Test 6: Verify assets
function testAssets() {
  console.log('\n=== Testing Assets ===');
  
  const assetsPath = join(DIST_DIR, 'assets');
  if (existsSync(assetsPath)) {
    log('pass', 'Assets directory exists');
  } else {
    log('warn', 'Assets directory not found');
  }
}

// Run all tests
function runTests() {
  console.log('🧪 Starting Preview Tests...\n');
  console.log(`Preview server should be running at: ${BASE_URL}\n`);
  
  testPagesExist();
  testNavigation();
  testExternalLinks();
  testResponsiveLayout();
  testProjectCards();
  testAssets();
  
  // Summary
  console.log('\n=== Test Summary ===');
  console.log(`✓ Passed: ${results.passed.length}`);
  console.log(`✗ Failed: ${results.failed.length}`);
  console.log(`⚠ Warnings: ${results.warnings.length}`);
  
  if (results.failed.length > 0) {
    console.log('\n❌ Some tests failed:');
    results.failed.forEach(msg => console.log(`  - ${msg}`));
    process.exit(1);
  } else if (results.warnings.length > 0) {
    console.log('\n⚠️  All critical tests passed, but there are warnings');
    process.exit(0);
  } else {
    console.log('\n✅ All tests passed!');
    process.exit(0);
  }
}

// Run tests
runTests();
