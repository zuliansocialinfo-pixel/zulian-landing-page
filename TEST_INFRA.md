# E2E Test Infra: Zulian Social Media Marketing

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.
- Tooling: Playwright (suitable for React SPA).

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | Application Load (Preloader) | R2. Preloader | 5 | 5 | ✓ |
| 2 | Hero Section & CTA | R2. Hero Section | 5 | 5 | ✓ |
| 3 | About Section (Chi Sono) | R2. Chi Sono | 5 | 5 | ✓ |
| 4 | Services Section | R2. Servizi | 5 | 5 | ✓ |
| 5 | Process Section (Come Funziona)| R2. Come Funziona | 5 | 5 | ✓ |
| 6 | Footer & Policy Links | R2. Footer, R4 | 5 | 5 | ✓ |
| 7 | Responsive Design | Acceptance: Design | 5 | 5 | ✓ |
| 8 | Theme & Animations | R1. Dark Mode/Framer | 5 | 5 | ✓ |

## Test Architecture
- Test runner: `npx playwright test`
- Framework: Playwright Test
- Directory layout:
  - `e2e-tests/`: Root directory for Playwright E2E tests
  - `e2e-tests/tier1/`: Feature coverage tests
  - `e2e-tests/tier2/`: Boundary & edge case tests
  - `e2e-tests/tier3/`: Cross-feature combination tests
  - `e2e-tests/tier4/`: Real-world application scenarios

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | User explores services and books a consultation | F1, F2, F4 | Medium |
| 2 | User navigates from About to Process, then to Footer | F1, F3, F5, F6 | Medium |
| 3 | Mobile user views the whole page | F1, F7, F8 | High |
| 4 | Tablet user checks policy links and contacts | F1, F6, F7 | Medium |
| 5 | User scrolls through page verifying all animations | F1, F8 | High |

## Coverage Thresholds
- Tier 1: ≥5 per feature
- Tier 2: ≥5 per feature
- Tier 3: pairwise coverage of major feature interactions
- Tier 4: ≥5 realistic application scenarios
