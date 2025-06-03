## Notion Table View and Filters
#### Nha Trang Ngo 


## ✅ Notion Database Table View & Filter UI - Feature Checklist

### Table View UI
- [x] Basic table view for a Notion database
- [x] Support sorting
- [x] Rearrangement of columns (drag and drop)
- [x] Resizing of columns (drag to resize)

### Filter UI
- [x] Support for property types:
  - [x] checkbox
  - [x] date
  - [x] multi_select
  - [x] number
  - [x] rich_text
  - [x] select
  - [ ] timestamp
  - [x] status
- [x] Compound filters with filter groups
  - [x] Support for nested conditions (configurable nesting level) (```FilterBuilderProps.maxDepth```)

### Tests
- [ ] Unit tests for compound filters


### Stretch Goals
- [ ] Implement NOT operator logic
- [ ] Unit tests for NOT operator

## DOCKERIZE
# Docker Setup

## Prerequisites
- Install Docker Desktop for Windows

## Build and Run

In project root:

```bash
docker-compose up --build
