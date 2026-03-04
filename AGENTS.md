# VOGO Engineering Context (Codex)

## Project
VOGO platform – mobile applications ecosystem built on WordPress, WooCommerce and Flutter.

## Technology Stack
- WordPress
- WooCommerce
- Custom REST API (VOGO API plugin)
- Flutter mobile applications
- MySQL database

## Work Discipline (Non-negotiable)
- Fix it professional. Do not change anything else.
- Implement/repair strictly the requested requirements; do not introduce new features, refactors, or “nice to have” improvements.
- Do not make assumptions or speculative scenarios. Use only validated data and confirmed information.
- If anything is unclear or uncertain, ask before coding.
- Expected results: fix exactly the listed items; no other modifications.

## Output & Communication Rules
- Provide a point-by-point response for each requirement (do not merge requirements).
- Do not miss any requirement.
- Do not add new topics or extra changes.
- Maintain a professional, expert tone; VOGO style; user-friendly.

## Coding Style Requirements
- All code comments must be in English.
- Ensure code readability for easy maintenance.
- Add efficient code comments for the requested changes only.
- If missing, add a file header comment at the top:
  `/** File purpose and role */`
- If missing, add section comments in relevant areas:
  `/** Section purpose and behavior */`
- Do not alter existing formatting/structure unless strictly required by the requested fix.

## Architecture Principles
- SQL-first approach: database structure is defined and confirmed before PHP code.
- Prefer direct SQL queries for performance and clarity.
- Avoid unnecessary WordPress abstraction layers when direct DB access is clearer.

## REST API Rules
- All REST endpoints use **POST** unless explicitly required otherwise.
- Endpoints must include permission validation using:
  `vogo_permission_check`
- User identity must be extracted from JWT using:
  `extract_user_from_jwt_token($request)`
- JWT secret (`VOGO_API_KEY`) is global and never sent in payload.

## Logging
Use step-by-step debug logging:
