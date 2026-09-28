---
name: exercise-workflow
description: Automates the lab/exercise workflow in the repository: checks issue templates, creates GitHub issues using gh CLI, guides implementation, captures UI screenshots, and updates/closes issues with commit links and screenshot attachments.
---

# Exercise & Lab GitHub Automation Workflow

This skill standardizes and automates the workflow for implementing exercises and labs in this repository.

## Workflow Overview

1. **Check Template & Context**:
   - Run `gh issue list --state all --limit 10` to observe previous issue naming and body structure.
   - Run `gh issue view <issue-id>` to inspect the exact markdown template.
2. **Create Issues Ahead of Implementation**:
   - Create an issue for each exercise or feature component before starting work.
   - Format titles using conventional commits: `feat(<slot-or-scope>): <Tên bài tập hoặc tính năng>`.
3. **Template Structure for Issues**:
   ```markdown
   ## 📌 Mô tả yêu cầu (Description)
   <Chi tiết yêu cầu bài tập>

   ## 🎯 Mục tiêu (Objectives)
   - [x] Mục tiêu 1
   - [x] Mục tiêu 2

   ## ✅ Danh sách công việc (Checklist)
   - [x] Khởi tạo component
   - [x] Xử lý state với useState
   - [x] Tích hợp giao diện React-Bootstrap

   ## 🔗 Liên kết Commit (Related Commits)
   - Triển khai bài tập: `<commit-hash>` (`<commit message>`)

   ## 📸 Hình ảnh giao diện / Minh họa (Screenshots)
   ![<Tên ảnh>](https://raw.githubusercontent.com/<owner>/<repo>/main/<path-to-screenshot>)
   ```
4. **Implementation & Validation**:
   - Build using Vite (`pnpm run build`).
   - Ensure clean code, proper prop types, and responsive UI.
5. **Screenshot Capture**:
   - Run local dev server or preview build.
   - Capture screenshots for each exercise using Playwright / Puppeteer script into `<project>/screenshots/`.
6. **Issue Closure & Commit**:
   - Commit changes including code and screenshots.
   - Update issue with commit hash and raw GitHub screenshot URL.
   - Close the issue via `gh issue close <issue-number> --comment "Hoàn thành và đính kèm screenshot."`.
