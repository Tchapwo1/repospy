# 🗄️ Pillar 5: Data Schemas & State Contracts (SCHEMA) — RepoSpy

## 1. RepoSpy Manifest Schema (`repospy-report.json`)

The structured JSON payload produced after every scan:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "RepoSpyReport",
  "type": "object",
  "required": ["target_url", "scan_timestamp", "tech_stack", "design_tokens", "apis_and_services"],
  "properties": {
    "target_url": { "type": "string", "format": "uri" },
    "scan_timestamp": { "type": "string", "format": "date-time" },
    "scan_duration_ms": { "type": "integer" },
    "tech_stack": {
      "type": "object",
      "properties": {
        "framework": { "type": "string" },
        "router": { "type": "string" },
        "styling": { "type": "array", "items": { "type": "string" } },
        "ui_components": { "type": "array", "items": { "type": "string" } },
        "animation": { "type": "string" },
        "hosting": { "type": "string" }
      }
    },
    "design_tokens": {
      "type": "object",
      "properties": {
        "color_palette": {
          "type": "object",
          "properties": {
            "background": { "type": "string" },
            "surface": { "type": "string" },
            "accent": { "type": "string" },
            "foreground": { "type": "string" },
            "muted": { "type": "string" }
          }
        },
        "typography": {
          "type": "object",
          "properties": {
            "primary_font": { "type": "string" },
            "heading_font": { "type": "string" },
            "is_google_font": { "type": "boolean" }
          }
        },
        "border_radius": { "type": "string" }
      }
    },
    "apis_and_services": {
      "type": "object",
      "properties": {
        "graphql_endpoints": { "type": "array", "items": { "type": "string" } },
        "rest_endpoints": { "type": "array", "items": { "type": "string" } },
        "analytics": { "type": "array", "items": { "type": "string" } },
        "third_party_saas": { "type": "array", "items": { "type": "string" } }
      }
    }
  }
}
```
