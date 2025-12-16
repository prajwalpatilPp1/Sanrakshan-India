# Design Document

## Overview

The website cleanup design focuses on systematically analyzing, categorizing, and removing unnecessary files while preserving the functional integrity of the Sanrakshan charity website. The cleanup will be performed in phases to minimize risk and ensure all dependencies are properly maintained.

## Architecture

### Cleanup Strategy
The cleanup follows a conservative approach with validation at each step:

1. **Analysis Phase**: Scan and categorize all files by usage and necessity
2. **Dependency Mapping**: Identify file relationships and references
3. **Safe Removal Phase**: Remove files in order of lowest to highest risk
4. **Validation Phase**: Verify website functionality after each removal batch

### File Categories

#### Essential Files (Keep)
- HTML pages (*.html) - Core website pages
- Active CSS files referenced in HTML
- Active JavaScript files (app.js, data.js)
- Referenced images in img/ root directory
- Node.js configuration (package.json, package-lock.json)
- Project documentation (README-ORGANIZATION.md, content.txt)
- Sanrakshan-specific content (sanrakshan_image_urls.txt)

#### Template Artifacts (Remove)
- Template documentation (READ-ME.txt, LICENSE.txt)
- Template preview image (charity-organization-website-template.jpg)
- Generic placeholder images not used by Sanrakshan

#### Duplicate Content (Consolidate/Remove)
- img/img/ nested directory structure
- Duplicate images between img/ and img/img/
- Unused library files in lib/

## Components and Interfaces

### File Analysis Component
```
FileAnalyzer {
  - scanDirectory(path): FileList
  - findReferences(file): ReferenceList  
  - categorizeFiles(files): CategoryMap
  - validateDependencies(files): DependencyGraph
}
```

### Cleanup Executor Component  
```
CleanupExecutor {
  - removeFile(path): boolean
  - moveFile(source, destination): boolean
  - consolidateDirectory(source, target): boolean
  - validateRemoval(files): ValidationResult
}
```

## Data Models

### File Classification
```typescript
interface FileInfo {
  path: string;
  type: 'html' | 'css' | 'js' | 'image' | 'library' | 'config' | 'doc';
  size: number;
  referenced: boolean;
  references: string[];
  category: 'essential' | 'template' | 'duplicate' | 'unused';
}

interface CleanupPlan {
  toRemove: FileInfo[];
  toMove: { source: string; destination: string }[];
  toKeep: FileInfo[];
  risks: string[];
}
```

## Error Handling

### Risk Mitigation
- **Backup Strategy**: Document all changes for potential rollback
- **Incremental Removal**: Remove files in small batches with validation
- **Reference Checking**: Verify no broken links before file removal
- **Dependency Validation**: Ensure required libraries remain available

### Error Recovery
- **Broken References**: Identify and report any broken links after cleanup
- **Missing Dependencies**: Restore accidentally removed dependencies
- **Functionality Issues**: Rollback capability for critical errors

## Testing Strategy

### Validation Tests
1. **Link Validation**: Verify all internal links work after cleanup
2. **Asset Loading**: Confirm all CSS, JS, and images load properly  
3. **Functionality Testing**: Test key website features (navigation, forms, carousels)
4. **Performance Testing**: Measure load time improvements after cleanup

### Test Scenarios
- Navigate through all HTML pages
- Verify carousel and interactive elements work
- Check responsive design on different screen sizes
- Validate form submissions and contact functionality
- Test image loading and display

## Implementation Phases

### Phase 1: Safe Template Cleanup
- Remove obvious template files (READ-ME.txt, LICENSE.txt, template image)
- Remove unused library directories (easing, waypoints if empty)
- Low risk, high impact cleanup

### Phase 2: Image Consolidation  
- Analyze img/ vs img/img/ directory contents
- Move essential images from img/img/ to appropriate img/ subdirectories
- Remove img/img/ nested structure
- Update any hardcoded image paths if necessary

### Phase 3: Library Optimization
- Verify which libraries are actually used in the codebase
- Remove unused library files while preserving Bootstrap, Owl Carousel, WOW.js
- Clean up empty directories

### Phase 4: Final Validation
- Comprehensive testing of all website functionality
- Performance measurement and optimization
- Documentation of cleanup results

## Design Decisions

### Conservative Approach
**Decision**: Remove files incrementally with validation at each step
**Rationale**: Minimizes risk of breaking website functionality during cleanup

### Preserve Project Structure  
**Decision**: Keep existing css/, js/, img/ directory organization
**Rationale**: Maintains familiar structure for developers and existing references

### Keep Node.js Dependencies
**Decision**: Preserve package.json and image processing capabilities  
**Rationale**: Future image downloads from sanrakshanindia.org may require these tools

### Consolidate Rather Than Delete Images
**Decision**: Move useful images rather than deleting duplicates
**Rationale**: Images may be needed for future website updates or content changes