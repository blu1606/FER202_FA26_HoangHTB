# Phase 1: Tạo Skill Workspace `.agents/skills/exercise-workflow`

## Overview
- Priority: High
- Current status: In Progress
- Description: Tạo custom skill theo tiêu chuẩn Antigravity IDE trong `.agents/skills/exercise-workflow/SKILL.md` để tự động hoá quy trình kiểm tra mẫu issue, tạo issues qua `gh`, chụp ảnh màn hình và cập nhật issue.

## Implementation Steps
1. Tạo thư mục `.agents/skills/exercise-workflow`.
2. Viết file `SKILL.md` với frontmatter đầy đủ (name, description) và quy trình chuẩn từng bước (Check issue pattern -> Create issue with `gh` -> Build & test -> Capture screenshots -> Update & close issue).
3. Thêm script mẫu chụp ảnh tự động sử dụng Puppeteer hoặc Playwright.

## Todo List
- [ ] Tạo `.agents/skills/exercise-workflow/SKILL.md`
- [ ] Kiểm tra tính hợp lệ của skill
