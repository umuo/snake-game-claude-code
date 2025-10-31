<!--
Sync Impact Report - Constitution Update
=========================================

Version Change: Initial → 1.0.0

Modified Principles:
- N/A (Initial constitution creation)

Added Principles:
- I. Unit Testing (MANDATORY) - Comprehensive unit test coverage with TDD requirements
- II. Code Formatting (MANDATORY) - Automated formatting and linting enforcement
- III. Documentation Retention (MANDATORY) - Required documentation for features and decisions
- IV. Test-First Development (NON-NEGOTIABLE) - TDD methodology enforcement
- V. Continuous Integration Validation - CI/CD validation requirements

Added Sections:
- Development Standards (Specify framework methodology)
- Quality Gates (PR requirements)

Removed Sections:
- N/A (Initial version)

Templates Status:
✅ No template updates required - existing templates align with new principles
✅ spec-template.md: Includes mandatory testing sections - compatible
✅ plan-template.md: Includes "Constitution Check" section - compatible
✅ tasks-template.md: Includes test tasks and linting setup - compatible

Follow-up Items:
- All templates validated for alignment
- No pending placeholders in constitution
- Constitution ready for project adoption
-->

# Snake Game Constitution

## Core Principles

### I. Unit Testing (MANDATORY)
All code MUST be covered by comprehensive unit tests. Tests MUST be written BEFORE implementation following Test-Driven Development (TDD) practices. Unit tests MUST achieve minimum 80% code coverage for all production code. Each test case MUST be independent, runnable in any order, and provide clear pass/fail results. All tests MUST be automated and runnable via standard test commands.

**Rationale**: Unit tests ensure code correctness, enable safe refactoring, and catch regressions early. TDD methodology leads to better design and more maintainable code.

### II. Code Formatting (MANDATORY)
All code MUST follow consistent formatting standards enforced by automated linting and formatting tools. Every project MUST configure automated code formatters (e.g., Prettier, Black, rustfmt) and linters (e.g., ESLint, pylint, clippy) in the project setup phase. Formatters MUST run automatically on save/commit, and linters MUST enforce style guidelines without exceptions. Configuration MUST be committed to version control and shared across the development team.

**Rationale**: Consistent formatting reduces cognitive load, eliminates style debates in code reviews, and ensures the codebase remains readable as it grows.

### III. Documentation Retention (MANDATORY)
All significant features, APIs, and architectural decisions MUST be documented and retained in the repository. Documentation MUST include: feature specifications (spec.md), implementation plans (plan.md), quickstart guides, API contracts, and architectural decisions. Documentation MUST be updated alongside code changes and reviewed during pull requests. All documentation files MUST be tracked in version control and never deleted without proper migration.

**Rationale**: Comprehensive documentation ensures knowledge transfer, enables onboarding, maintains institutional memory, and supports long-term project maintenance and evolution.

### IV. Test-First Development (NON-NEGOTIABLE)
TDD is mandatory: Tests written → Requirements approved → Tests fail → Then implement. Red-Green-Refactor cycle MUST be strictly enforced for all user stories. No production code implementation is allowed until corresponding failing tests exist.

**Rationale**: Test-first development ensures requirements clarity, leads to cleaner architecture, and provides automatic regression testing that enables confident refactoring.

### V. Continuous Integration Validation
All code MUST pass the full test suite, linting checks, and formatting validation before merging. Automated CI/CD pipelines MUST verify unit tests, integration tests, formatting compliance, and linting standards on every commit and pull request. Build failures MUST block merges.

**Rationale**: Continuous validation prevents broken code from entering the main branch, ensures code quality standards are maintained, and provides immediate feedback to developers.

## Development Standards

All projects MUST follow the Specify framework methodology including: creating feature specifications (spec.md), implementation plans (plan.md), task breakdowns (tasks.md), and maintaining test-driven development practices. All development MUST be traceable from user stories through tasks to code implementation.

**Rationale**: The Specify framework ensures systematic, documented development with clear accountability and measurable progress.

## Quality Gates

Every pull request MUST satisfy:
- All unit tests passing with minimum 80% coverage
- All code formatted according to project standards
- All linting checks passing with no warnings
- Documentation updated for any user-facing changes
- Architecture decisions documented where applicable

**Rationale**: Quality gates prevent technical debt accumulation and ensure consistent code quality across the project.

**Version**: 1.0.0 | **Ratified**: 2025-10-29 | **Last Amended**: 2025-10-29