## Notion Table View and Filters
#### Nha Trang Ngo - Frontend Developer



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

## ✅ DOCKERIZE
- [x] Docker Setup
- [ ] Docker build and run

## Prerequisites
- Install Docker Desktop for Windows

## Build and Run

In project root:

```bash
docker-compose up --build
```
I tried to install and run Docker Desktop on my Windows 10, but it failed because my system and WSL are outdated. Some WSL commands Docker needs are not supported, and automatic WSL updates are disabled.

As a result, Docker can't start its services and the commands don't work. My system doesn't meet the requirements for Docker Desktop with WSL2, so I couldn't finish the Running or test it.

Thank you for understanding.
