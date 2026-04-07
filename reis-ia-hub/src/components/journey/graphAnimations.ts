export const GRAPH_ANIMATIONS = `
@keyframes nodePulse {
  0%, 100% { box-shadow: 0 0 20px rgba(74,144,255,0.10), inset 0 0 15px rgba(74,144,255,0.05); }
  50% { box-shadow: 0 0 40px rgba(74,144,255,0.25), inset 0 0 20px rgba(74,144,255,0.10); }
}

@keyframes nodeRing {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.8); opacity: 0; }
}

@keyframes nodeRingDouble {
  0% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.4); opacity: 0.15; }
  100% { transform: scale(1.8); opacity: 0; }
}

@keyframes floatParticle {
  0% { transform: translate(0, 0); opacity: 0.03; }
  20% { transform: translate(20px, -30px); opacity: 0.06; }
  40% { transform: translate(-15px, -50px); opacity: 0.04; }
  60% { transform: translate(25px, -35px); opacity: 0.07; }
  80% { transform: translate(-10px, -20px); opacity: 0.03; }
  100% { transform: translate(0, 0); opacity: 0.03; }
}

@keyframes floatParticleSlow {
  0% { transform: translate(0, 0) scale(1); opacity: 0.02; }
  33% { transform: translate(30px, -40px) scale(1.2); opacity: 0.05; }
  66% { transform: translate(-20px, -60px) scale(0.8); opacity: 0.03; }
  100% { transform: translate(0, 0) scale(1); opacity: 0.02; }
}

@keyframes overlayFadeIn {
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes overlayFadeOut {
  from { opacity: 1; transform: scale(1) translateY(0); }
  to { opacity: 0; transform: scale(0.96) translateY(8px); }
}

@keyframes backdropFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes rippleUnlock {
  0% { transform: scale(0.8); opacity: 0.6; border-color: #4A90FF; }
  100% { transform: scale(2.5); opacity: 0; border-color: #4A90FF; }
}

@keyframes glowBreathe {
  0%, 100% { box-shadow: 0 0 20px rgba(74,144,255,0.08); }
  50% { box-shadow: 0 0 40px rgba(74,144,255,0.20); }
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes connectorFlow {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}

@keyframes progressPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes celebrateIn {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes starFloat {
  0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
  100% { transform: translateY(-60px) rotate(180deg); opacity: 0; }
}

@keyframes phaseEnter {
  from { opacity: 0; transform: translateY(30px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes cardEnter {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes borderGlow {
  0%, 100% { border-color: rgba(74,144,255,0.25); }
  50% { border-color: rgba(74,144,255,0.50); }
}

@keyframes dotPulse {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
}

@keyframes ringPulse {
  0% { transform: scale(1); opacity: 0.4; }
  100% { transform: scale(1.8); opacity: 0; }
}

@keyframes ledPulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}

.journey-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
.journey-scrollbar::-webkit-scrollbar-track { background: transparent; }
.journey-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
.journey-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
`;
