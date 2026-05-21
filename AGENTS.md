
<!-- TOKENOMICS:START -->
## Token Optimization Insights

_Last updated: 2026-05-16_

### Context Management
- Your context snowballs at **turn 16** on average (30% of sessions). Use `/compact` proactively after turn 14-16 on long sessions to prevent unbounded growth.
- Some sessions use significantly more tokens than others. Consider shorter, more focused sessions with clear goals.
- You could benefit from subagents for parallel tasks. Consider splitting multi-file operations into parallel agent tasks.
- You receive verbose command output. Prefer `Grep`/`Read` tools over bash commands when searching files to reduce output tokens.
- You read files you don't end up using. Use `Grep` first to locate relevant files before reading them — reduces unnecessary context by ~0%.

### Model Usage
- MCP server(s) **Windows-MCP, claude_ai_Google_Drive, PDF_Tools_-_View, pdf-viewer, unity, playwright** are loaded but never used. Consider removing them to reduce per-session overhead.
- You use Opus/Codex for **10%** of simple tasks. Prefer **Sonnet** for editing, small fixes, and exploration tasks to reduce token usage by ~5x on those sessions.

### Prompt Quality
- **10%** of your prompts are under 10 words. Include specific file paths, function names, and expected outcomes to reduce clarification rounds.
<!-- TOKENOMICS:END -->
