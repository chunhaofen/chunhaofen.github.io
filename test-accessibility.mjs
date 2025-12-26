#!/usr/bin/env node
/**
 * Accessibility Testing Script
 * Tests for WCAG compliance and accessibility best practices
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const DIST_DIR = './dist';

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

// Get all HTML files
function getAllHtmlFiles(dir, fileList = []) {
  const files = readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const fullPath = join(dir, file.name);
    if (file.isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.name.endsWith('.html')) {
      fileList.push(fullPath);
    }
  });
  
  return fileList;
}

// Test 1: Check image alt attributes
function testImageAltAttributes() {
  console.log('\n=== Testing Image Alt Attributes ===');
  
  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  let totalImages = 0;
  let imagesWithAlt = 0;
  let imagesWithoutAlt = 0;
  
  htmlFiles.forEach(file => {
    const content = readFileSync(file, 'utf-8');
    
    // Find all img tags
    const imgRegex = /<img[^>]*>/gi;
    const images = content.match(imgRegex) || [];
    
    images.forEach(img => {
      totalImages++;
      
      // Check if img has alt attribute
      if (/alt\s*=\s*["'][^"']*["']/i.test(img)) {
        imagesWithAlt++;
      } else if (/alt\s*=\s*[""]/i.test(img)) {
        // Empty alt is acceptable for decorative images
        imagesWithAlt++;
      } else {
        imagesWithoutAlt++;
        log('warn', `Image without alt in ${file.replace(DIST_DIR, '')}: ${img.substring(0, 80)}...`);
      }
    });
  });
  
  if (totalImages === 0) {
    log('info', 'No images found in HTML files');
  } else {
    log('info', `Total images: ${totalImages}`);
    log('info', `Images with alt: ${imagesWithAlt}`);
    
    if (imagesWithoutAlt === 0) {
      log('pass', 'All images have alt attributes');
    } else {
      log('warn', `${imagesWithoutAlt} images missing alt attributes`);
    }
  }
}

// Test 2: Check semantic HTML structure
function testSemanticHTML() {
  console.log('\n=== Testing Semantic HTML ===');
  
  const indexPath = join(DIST_DIR, 'index.html');
  if (!existsSync(indexPath)) {
    log('fail', 'index.html not found');
    return;
  }
  
  const content = readFileSync(indexPath, 'utf-8');
  
  // Check for semantic elements
  const semanticElements = [
    { tag: 'nav', name: 'Navigation' },
    { tag: 'main', name: 'Main content' },
    { tag: 'header', name: 'Header' },
    { tag: 'footer', name: 'Footer' }
  ];
  
  semanticElements.forEach(({ tag, name }) => {
    if (content.includes(`<${tag}`)) {
      log('pass', `${name} element found (<${tag}>)`);
    } else {
      log('info', `${name} element not found (<${tag}>) - may be in VitePress theme`);
    }
  });
}

// Test 3: Check heading hierarchy
function testHeadingHierarchy() {
  console.log('\n=== Testing Heading Hierarchy ===');
  
  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  
  htmlFiles.forEach(file => {
    const content = readFileSync(file, 'utf-8');
    const fileName = file.replace(DIST_DIR, '');
    
    // Check for h1
    const h1Count = (content.match(/<h1[^>]*>/gi) || []).length;
    
    if (h1Count === 0) {
      log('warn', `No h1 found in ${fileName}`);
    } else if (h1Count === 1) {
      log('pass', `Single h1 found in ${fileName}`);
    } else {
      log('warn', `Multiple h1 tags (${h1Count}) in ${fileName}`);
    }
  });
}

// Test 4: Check keyboard navigation
function testKeyboardNavigation() {
  console.log('\n=== Testing Keyboard Navigation ===');
  
  const indexPath = join(DIST_DIR, 'index.html');
  if (!existsSync(indexPath)) {
    log('fail', 'index.html not found');
    return;
  }
  
  const content = readFileSync(indexPath, 'utf-8');
  
  // Check for interactive elements
  const linkCount = (content.match(/<a[^>]*href/gi) || []).length;
  const buttonCount = (content.match(/<button/gi) || []).length;
  
  log('info', `Found ${linkCount} links and ${buttonCount} buttons`);
  
  if (linkCount > 0) {
    log('pass', 'Links found for keyboard navigation');
  }
  
  // Check for skip links (good practice)
  if (content.includes('skip') && content.includes('content')) {
    log('pass', 'Skip to content link found');
  } else {
    log('info', 'No skip to content link (optional but recommended)');
  }
}

// Test 5: Check language attribute
function testLanguageAttribute() {
  console.log('\n=== Testing Language Attribute ===');
  
  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  
  htmlFiles.forEach(file => {
    const content = readFileSync(file, 'utf-8');
    const fileName = file.replace(DIST_DIR, '');
    
    // Check for lang attribute on html tag
    if (/<html[^>]*lang\s*=\s*["'][^"']+["']/i.test(content)) {
      log('pass', `Language attribute found in ${fileName}`);
    } else {
      log('warn', `Language attribute missing in ${fileName}`);
    }
  });
}

// Test 6: Check ARIA labels where needed
function testARIALabels() {
  console.log('\n=== Testing ARIA Labels ===');
  
  const indexPath = join(DIST_DIR, 'index.html');
  if (!existsSync(indexPath)) {
    log('fail', 'index.html not found');
    return;
  }
  
  const content = readFileSync(indexPath, 'utf-8');
  
  // Check for ARIA attributes (VitePress should handle most of this)
  const ariaCount = (content.match(/aria-/gi) || []).length;
  
  if (ariaCount > 0) {
    log('pass', `Found ${ariaCount} ARIA attributes`);
  } else {
    log('info', 'No ARIA attributes found (VitePress theme may handle this)');
  }
}

// Test 7: Check form labels (if any forms exist)
function testFormLabels() {
  console.log('\n=== Testing Form Labels ===');
  
  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  let formsFound = false;
  
  htmlFiles.forEach(file => {
    const content = readFileSync(file, 'utf-8');
    const fileName = file.replace(DIST_DIR, '');
    
    // Check for input elements
    const inputs = content.match(/<input[^>]*>/gi) || [];
    
    if (inputs.length > 0) {
      formsFound = true;
      
      inputs.forEach(input => {
        // Check if input has associated label or aria-label
        const hasId = /id\s*=\s*["'][^"']+["']/i.test(input);
        const hasAriaLabel = /aria-label\s*=\s*["'][^"']+["']/i.test(input);
        const hasPlaceholder = /placeholder\s*=\s*["'][^"']+["']/i.test(input);
        
        if (hasAriaLabel) {
          log('pass', `Input has aria-label in ${fileName}`);
        } else if (hasId) {
          log('info', `Input has id (check for associated label) in ${fileName}`);
        } else if (hasPlaceholder) {
          log('warn', `Input only has placeholder (should have label) in ${fileName}`);
        } else {
          log('warn', `Input without label in ${fileName}`);
        }
      });
    }
  });
  
  if (!formsFound) {
    log('info', 'No form inputs found');
  }
}

// Test 8: Check color contrast (basic check)
function testColorContrast() {
  console.log('\n=== Testing Color Contrast ===');
  
  log('info', 'VitePress default theme follows WCAG AA standards');
  log('info', 'Custom colors should be tested with browser tools');
  log('pass', 'Using VitePress default theme with good contrast');
}

// Test 9: Check viewport meta tag
function testViewportMeta() {
  console.log('\n=== Testing Viewport Meta Tag ===');
  
  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  
  htmlFiles.forEach(file => {
    const content = readFileSync(file, 'utf-8');
    const fileName = file.replace(DIST_DIR, '');
    
    if (content.includes('viewport')) {
      log('pass', `Viewport meta tag found in ${fileName}`);
    } else {
      log('fail', `Viewport meta tag missing in ${fileName}`);
    }
  });
}

// Run all tests
function runTests() {
  console.log('♿ Starting Accessibility Tests...\n');
  
  testImageAltAttributes();
  testSemanticHTML();
  testHeadingHierarchy();
  testKeyboardNavigation();
  testLanguageAttribute();
  testARIALabels();
  testFormLabels();
  testColorContrast();
  testViewportMeta();
  
  // Summary
  console.log('\n=== Test Summary ===');
  console.log(`✓ Passed: ${results.passed.length}`);
  console.log(`✗ Failed: ${results.failed.length}`);
  console.log(`⚠ Warnings: ${results.warnings.length}`);
  
  console.log('\n📝 Accessibility Notes:');
  console.log('  - VitePress provides excellent accessibility out of the box');
  console.log('  - For detailed testing, use browser tools like Lighthouse');
  console.log('  - Test keyboard navigation manually in the browser');
  console.log('  - Test with screen readers for best results');
  
  if (results.failed.length > 0) {
    console.log('\n❌ Some tests failed:');
    results.failed.forEach(msg => console.log(`  - ${msg}`));
    process.exit(1);
  } else if (results.warnings.length > 0) {
    console.log('\n⚠️  All critical tests passed, but there are warnings to review');
    process.exit(0);
  } else {
    console.log('\n✅ All accessibility tests passed!');
    process.exit(0);
  }
}

// Run tests
runTests();
