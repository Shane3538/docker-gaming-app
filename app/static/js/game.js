:root {
  --bg: #071421;
  --bg-2: #0e1c2b;
  --panel: rgba(12, 21, 31, 0.8);
  --panel-border: rgba(96, 209, 255, 0.4);
  --text: #e6f7ff;
  --muted: #9ec3d6;
  --accent: #57d1ff;
  --accent-2: #3ef2c9;
  --warning: #ffb86b;
  --danger: #ff6f91;
  --shadow: rgba(19, 216, 255, 0.3);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: radial-gradient(circle at top, #0d2239 0%, var(--bg) 55%, #020a12 100%);
  color: var(--text);
  min-height: 100vh;
}

h1, h2, h3, .brand-tag {
  font-family: 'Orbitron', sans-serif;
}

.bg-grid {
  position: fixed;
  inset: 0;
  background-image: linear-gradient(rgba(87, 209, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(87, 209, 255, 0.08) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(circle at center, black 35%, transparent 85%);
  pointer-events: none;
}

.app-shell {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.glow-card {
  background: rgba(10, 19, 27, 0.82);
  border: 1px solid var(--panel-border);
  box-shadow: 0 0 22px rgba(87, 209, 255, 0.18);
  border-radius: 24px;
  backdrop-filter: blur(8px);
}

.auth-layout {
  width: min(420px, 100%);
}

.auth-panel {
  padding: 32px 28px;
}

.brand-block {
  margin-bottom: 28px;
}

.brand-tag {
  display: inline-block;
  letter-spacing: 0.18em;
  font-size: 11px;
  color: var(--accent-2);
  margin-bottom: 12px;
}

.brand-block h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.6rem);
}

.brand-block p {
  color: var(--muted);
  line-height: 1.6;
  margin: 12px 0 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--muted);
  font-size: 0.92rem;
}

.auth-form input {
  border: 1px solid rgba(125, 160, 186, 0.35);
  background: rgba(3, 10, 17, 0.8);
  color: var(--text);
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.auth-form input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(87, 209, 255, 0.15);
}

.primary-btn,
.logout-btn {
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
}

.primary-btn {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #031722;
  box-shadow: 0 10px 25px rgba(87, 209, 255, 0.25);
}

.primary-btn:hover,
.logout-btn:hover {
  transform: translateY(-1px);
}

.switch-link {
  margin-top: 22px;
  display: flex;
  justify-content: center;
  gap: 8px;
  color: var(--muted);
}

.switch-link a {
  color: var(--accent);
  text-decoration: none;
}

.flash-container {
  position: fixed;
  top: 22px;
  right: 22px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.flash {
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.flash-success {
  background: rgba(62, 242, 201, 0.12);
  color: #b6fff0;
}

.flash-error {
  background: rgba(255, 111, 145, 0.12);
  color: #ffd0dc;
}

.dashboard-shell {
  width: min(1200px, 100%);
  padding: 20px 0;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  margin-bottom: 20px;
}

.topbar h2 {
  margin: 8px 0 0;
  font-size: clamp(1.3rem, 2vw, 2rem);
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.score-pill {
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(87, 209, 255, 0.08);
  border: 1px solid rgba(87, 209, 255, 0.22);
  color: var(--muted);
}

.logout-btn {
  background: rgba(255, 111, 145, 0.13);
  color: #ffdfe8;
  border: 1px solid rgba(255, 111, 145, 0.2);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr) 260px;
  gap: 20px;
}

.panel {
  padding: 20px;
}

.panel-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.mission-info {
  margin-top: 22px;
  color: var(--muted);
  line-height: 1.6;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 20px;
}

.stats-row > div {
  background: rgba(19, 35, 49, 0.82);
  border: 1px solid rgba(125, 160, 186, 0.2);
  border-radius: 14px;
  padding: 14px 12px;
  text-align: center;
}

.label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 6px;
}

#score,
#moves,
#timer,
#best-score {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text);
}

#start-game {
  width: 100%;
  margin-top: 24px;
}

.game-panel {
  min-height: 520px;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, minmax(70px, 1fr));
  gap: 14px;
  padding: 12px;
}

.memory-card {
  aspect-ratio: 1;
  border: 1px solid rgba(131, 194, 255, 0.5);
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(12, 34, 46, 0.85), rgba(6, 16, 24, 0.95));
  color: var(--text);
  display: grid;
  place-items: center;
  font-size: clamp(1.7rem, 2vw, 2.6rem);
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  user-select: none;
  box-shadow: inset 0 0 16px rgba(87, 209, 255, 0.1);
}

.memory-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
}

.memory-card.is-flipped,
.memory-card.is-matched {
  background: linear-gradient(135deg, rgba(87, 209, 255, 0.22), rgba(62, 242, 201, 0.18));
  border-color: var(--accent-2);
  box-shadow: 0 0 20px rgba(87, 209, 255, 0.2);
}

.memory-card.is-matched {
  background: linear-gradient(135deg, rgba(62, 242, 201, 0.22), rgba(87, 209, 255, 0.12));
}

.memory-card.hidden {
  color: transparent;
}

.leaderboard-list {
  list-style: none;
  margin: 22px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.leaderboard-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(18, 30, 42, 0.7);
  border: 1px solid rgba(125, 160, 186, 0.2);
  border-radius: 12px;
  padding: 12px 14px;
  color: var(--text);
}

.leaderboard-list .empty-row {
  justify-content: center;
  color: var(--muted);
}

@media (max-width: 920px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
