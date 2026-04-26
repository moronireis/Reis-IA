---
name: Journey Constellation Map Brief
description: Creative brief for constellation-style learning journey map in REIS IA Hub. Covers layout, stars, connections, animations, ceremonies.
type: project
---

Constellation Map Journey brief delivered at `brain/assets/branding/constellation-map-journey-brief.md`.

Existing components: JourneyExperience.tsx (main view), JourneyMap.tsx (alternate view), ContentOverlay.tsx (node detail), graphAnimations.ts (keyframes), JourneyDashboard.tsx (list view), JourneyAdminBuilder.tsx (admin).

Current data model: StudentJourney > JourneyPhase (locked/available/in_progress/completed) > JourneyNode (5 content types: task/material/presentation/checkpoint/quiz, 5 statuses).

**Why:** Transform vertical list into spatial star-map experience for premium feel.
**How to apply:** Dev agent should refactor JourneyExperience.tsx layout and extend graphAnimations.ts. ContentOverlay stays intact.
