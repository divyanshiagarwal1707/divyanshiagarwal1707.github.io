import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Gamepad2, RotateCcw, Play, Volume2, VolumeX } from 'lucide-react';

// 5x7 Bitmaps for characters: A, I, T, H, S, P
const BITMAPS: Record<string, number[][]> = {
  A: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  I: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  P: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  ' ': [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]
};

interface Brick {
  x: number;
  y: number;
  w: number;
  h: number;
  alive: boolean;
}

export const ArcadeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'victory'>('idle');
  const gameStateRef = useRef<'idle' | 'playing' | 'gameover' | 'victory'>('idle');
  const [balls, setBalls] = useState(3);
  const [score, setScore] = useState(0);
  const [bricksLeft, setBricksLeft] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync ref and silence audio when not actively playing
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    gameStateRef.current = gameState;
    if (gameState !== 'playing' && audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend().catch(() => {});
    }
  }, [gameState]);

  // Sound synthesis using Web Audio API — ONLY plays when user clicks play
  const playBeep = useCallback((freq = 440, type: OscillatorType = 'sine', duration = 0.08) => {
    if (!soundEnabled || gameStateRef.current !== 'playing') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio might be blocked before user interaction
    }
  }, [soundEnabled]);

  // Game internal mutable state
  const gameRef = useRef({
    paddleX: 300,
    paddleW: 90,
    paddleH: 10,
    ballX: 345,
    ballY: 350,
    ballVx: 2.0,
    ballVy: -2.8,
    ballR: 6,
    bricks: [] as Brick[],
    isFocused: false,
    leftPressed: false,
    rightPressed: false,
    animId: 0,
    width: 700,
    height: 420,
    idleTimer: 0
  });

  // Build the brick layout from "AI THAT" and "SHIPS"
  const buildBricks = useCallback((canvasW: number) => {
    const bricks: Brick[] = [];
    const brickSize = canvasW < 500 ? 7 : 10;
    const gap = 2;
    const step = brickSize + gap;

    const createWordBricks = (text: string, startY: number) => {
      // Calculate total columns
      let totalCols = 0;
      for (const char of text) {
        const matrix = BITMAPS[char] || BITMAPS[' '];
        totalCols += matrix[0].length + 1; // 1 col gap between letters
      }
      totalCols -= 1; // remove trailing gap

      const wordWidth = totalCols * step;
      let currentX = (canvasW - wordWidth) / 2;

      for (const char of text) {
        const matrix = BITMAPS[char] || BITMAPS[' '];
        const cols = matrix[0].length;

        for (let r = 0; r < 7; r++) {
          for (let c = 0; c < cols; c++) {
            if (matrix[r][c] === 1) {
              bricks.push({
                x: currentX + c * step,
                y: startY + r * step,
                w: brickSize,
                h: brickSize,
                alive: true
              });
            }
          }
        }
        currentX += (cols + 1) * step;
      }
    };

    createWordBricks("AI THAT", 60);
    createWordBricks("SHIPS", 60 + 7 * step + 16);

    return bricks;
  }, []);

  // Initialize Game & Handle Canvas loop
  const initGame = useCallback((mode: 'idle' | 'playing' = 'playing') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    const bricks = buildBricks(w);

    gameRef.current.width = w;
    gameRef.current.height = h;
    gameRef.current.paddleW = Math.max(70, Math.min(100, w * 0.16));
    gameRef.current.paddleX = (w - gameRef.current.paddleW) / 2;
    gameRef.current.ballX = w / 2;
    gameRef.current.ballY = h - 50;
    gameRef.current.ballVx = (Math.random() > 0.5 ? 1 : -1) * (w < 500 ? 1.8 : 2.2);
    gameRef.current.ballVy = -(w < 500 ? 2.2 : 2.8);
    gameRef.current.bricks = bricks;

    setBalls(3);
    setScore(0);
    setBricksLeft(bricks.length);
    gameStateRef.current = mode;
    setGameState(mode);
    if (mode === 'playing' && audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
  }, [buildBricks]);

  // Setup canvas & resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const containerW = canvas.parentElement?.clientWidth || 700;
      const w = Math.min(containerW, 860);
      const h = Math.max(380, Math.min(480, w * 0.6));
      canvas.width = w;
      canvas.height = h;
      gameRef.current.width = w;
      gameRef.current.height = h;
      gameRef.current.bricks = buildBricks(w);
      setBricksLeft(gameRef.current.bricks.length);
      gameRef.current.paddleW = Math.max(70, Math.min(100, w * 0.16));
      gameRef.current.paddleX = (w - gameRef.current.paddleW) / 2;
      gameRef.current.ballX = w / 2;
      gameRef.current.ballY = h - 50;
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [buildBricks]);

  // Main animation frame game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const loop = () => {
      const g = gameRef.current;
      const w = g.width;
      const h = g.height;

      // Clear board
      ctx.fillStyle = '#111116';
      ctx.fillRect(0, 0, w, h);

      // Fine grid background pattern
      ctx.strokeStyle = '#181822';
      ctx.lineWidth = 1;
      const gridStep = 24;
      for (let x = 0; x < w; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Handle keyboard paddle movement if focused
      if (gameState === 'playing') {
        if (g.leftPressed) g.paddleX = Math.max(0, g.paddleX - 7);
        if (g.rightPressed) g.paddleX = Math.min(w - g.paddleW, g.paddleX + 7);
      } else if (gameState === 'idle') {
        // Idle demo: paddle follows ball gently
        const targetX = g.ballX - g.paddleW / 2;
        g.paddleX += (targetX - g.paddleX) * 0.08;
        g.paddleX = Math.max(0, Math.min(w - g.paddleW, g.paddleX));
      }

      // Move ball
      if (gameState === 'playing' || gameState === 'idle') {
        g.ballX += g.ballVx;
        g.ballY += g.ballVy;

        // Wall collisions
        if (g.ballX - g.ballR <= 0) {
          g.ballX = g.ballR;
          g.ballVx = Math.abs(g.ballVx);
          playBeep(260, 'sine', 0.04);
        } else if (g.ballX + g.ballR >= w) {
          g.ballX = w - g.ballR;
          g.ballVx = -Math.abs(g.ballVx);
          playBeep(260, 'sine', 0.04);
        }

        if (g.ballY - g.ballR <= 0) {
          g.ballY = g.ballR;
          g.ballVy = Math.abs(g.ballVy);
          playBeep(280, 'sine', 0.04);
        }

        // Paddle collision
        const paddleY = h - 35;
        if (
          g.ballY + g.ballR >= paddleY &&
          g.ballY - g.ballR <= paddleY + g.paddleH &&
          g.ballX >= g.paddleX &&
          g.ballX <= g.paddleX + g.paddleW &&
          g.ballVy > 0
        ) {
          // Calculate bounce angle depending on hit spot
          const hitOffset = (g.ballX - (g.paddleX + g.paddleW / 2)) / (g.paddleW / 2);
          const maxAngle = Math.PI / 3; // 60 degrees
          const angle = hitOffset * maxAngle;
          const baseSpeed = w < 500 ? 2.5 : 3.2;

          g.ballVx = baseSpeed * Math.sin(angle);
          g.ballVy = -Math.abs(baseSpeed * Math.cos(angle));
          playBeep(480, 'triangle', 0.08);
        }

        // Brick collisions
        let remaining = 0;
        for (let i = 0; i < g.bricks.length; i++) {
          const b = g.bricks[i];
          if (!b.alive) continue;
          remaining++;

          // AABB collision with ball
          if (
            g.ballX + g.ballR >= b.x &&
            g.ballX - g.ballR <= b.x + b.w &&
            g.ballY + g.ballR >= b.y &&
            g.ballY - g.ballR <= b.y + b.h
          ) {
            b.alive = false;
            g.ballVy = -g.ballVy;
            remaining--;
            setScore((s) => s + 10);
            playBeep(580 + (i % 8) * 40, 'square', 0.06);
            break;
          }
        }
        setBricksLeft(remaining);

        if (remaining === 0 && gameState === 'playing') {
          setGameState('victory');
          playBeep(880, 'sine', 0.3);
        }

        // Ball drops below paddle
        if (g.ballY > h) {
          if (gameState === 'idle') {
            // Respawn for idle preview
            g.ballX = w / 2;
            g.ballY = h - 80;
            g.ballVy = -2.6;
          } else if (gameState === 'playing') {
            setBalls((prev) => {
              const next = prev - 1;
              if (next <= 0) {
                // Game over: stop sound completely
                gameStateRef.current = 'gameover';
                setGameState('gameover');
                if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
                  audioCtxRef.current.suspend().catch(() => {});
                }
                return 0;
              } else {
                playBeep(180, 'sawtooth', 0.15);
                // Reset ball
                g.ballX = g.paddleX + g.paddleW / 2;
                g.ballY = h - 60;
                g.ballVx = (Math.random() > 0.5 ? 1 : -1) * (w < 500 ? 1.8 : 2.2);
                g.ballVy = -(w < 500 ? 2.2 : 2.8);
                return next;
              }
            });
          }
        }
      }

      // Draw Bricks (Separate square white bricks with visible gaps)
      for (const b of g.bricks) {
        if (!b.alive) continue;
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 4;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.shadowBlur = 0;
      }

      // Draw Paddle (Narrow glowing orange paddle)
      const paddleY = h - 35;
      ctx.fillStyle = '#FF5E3A';
      ctx.shadowColor = 'rgba(255, 94, 58, 0.8)';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.roundRect(g.paddleX, paddleY, g.paddleW, g.paddleH, 4);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Ball (Small coral ball)
      ctx.fillStyle = '#FF7352';
      ctx.shadowColor = 'rgba(255, 115, 82, 0.9)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(g.ballX, g.ballY, g.ballR, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, playBeep]);

  // Keyboard navigation & controls (active only when focused)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      gameRef.current.leftPressed = true;
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      gameRef.current.rightPressed = true;
    } else if (e.key === ' ' || e.key === 'Enter') {
      if (gameState !== 'playing') {
        e.preventDefault();
        initGame('playing');
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') gameRef.current.leftPressed = false;
    if (e.key === 'ArrowRight') gameRef.current.rightPressed = false;
  };

  // Mouse & Touch controls
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX;
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    gameRef.current.paddleX = Math.max(0, Math.min(canvas.width - gameRef.current.paddleW, x - gameRef.current.paddleW / 2));
  };

  return (
    <section 
      id="play" 
      className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-[#292930]/60"
      aria-label="Typographic Breakout Arcade"
    >
      {/* Header Centered */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 mb-2 text-[#FF5E3A]">
          <Gamepad2 size={16} />
          <span className="text-[11px] font-mono tracking-widest uppercase">
            INTERACTIVE ARCADE SHOWCASE
          </span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-[#F5F5F7] mb-3">
          BREAK IT IF YOU CAN
        </h2>

        <p className="text-xs sm:text-sm text-[#B7B7C3] font-mono">
          Control with Mouse drag, Touch, or Left/Right Arrow keys. Arrow keys activate when board has focus.
        </p>
      </div>

      {/* Main Arcade Frame */}
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={() => { gameRef.current.isFocused = true; }}
        onBlur={() => {
          gameRef.current.isFocused = false;
          gameRef.current.leftPressed = false;
          gameRef.current.rightPressed = false;
        }}
        className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[#292930] bg-[#111116] shadow-2xl focus:outline-none focus:border-[#FF5E3A] transition-all group"
      >
        {/* Top Board Details: Top-left label & Top-right BALLS dots */}
        <div className="absolute top-4 left-6 right-6 flex items-center justify-between pointer-events-none z-20">
          <div>
            <span className="font-mono text-[10px] sm:text-xs text-[#B7B7C3] tracking-widest uppercase block">
              5×7 BITMAP BRICK MATRIX
            </span>
            <div className="w-8 h-[2px] bg-[#FF5E3A] mt-1" />
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] sm:text-xs text-[#71717A] tracking-wider uppercase">
              BALLS
            </span>
            <div className="flex items-center gap-1.5">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i < balls ? 'bg-[#FF5E3A] shadow-[0_0_8px_#FF5E3A]' : 'bg-[#292930]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Canvas Playfield */}
        <div className="pt-10 flex justify-center">
          <canvas
            ref={canvasRef}
            onPointerMove={handlePointerMove}
            onClick={() => {
              if (gameState !== 'playing') initGame('playing');
            }}
            className="w-full max-w-4xl cursor-crosshair touch-none select-none block"
            style={{ maxHeight: '460px' }}
          />
        </div>

        {/* Overlay for Idle / Game Over / Victory */}
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-[#08080C]/75 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center z-30">
            {gameState === 'idle' && (
              <div className="space-y-4 animate-fadeIn">
                <span className="text-xs font-mono text-[#B7B7C3] tracking-widest uppercase">
                  TYPOGRAPHIC BRICK MATRIX: "AI THAT SHIPS"
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                  Ready to Play?
                </h3>
                <button
                  type="button"
                  onClick={() => initGame('playing')}
                  className="px-6 py-2.5 rounded-full bg-[#FF5E3A] text-white font-heading font-bold text-sm tracking-wider uppercase hover:bg-[#FF7352] transition-transform hover:scale-105 shadow-xl flex items-center gap-2 mx-auto"
                >
                  <Play size={16} fill="white" />
                  <span>Start Game</span>
                </button>
              </div>
            )}

            {gameState === 'gameover' && (
              <div className="space-y-4 animate-fadeIn">
                <span className="text-xs font-mono text-[#E05263] tracking-widest uppercase font-bold">
                  OUT OF BALLS
                </span>
                <h3 className="text-3xl font-heading font-black text-white">
                  Game Over
                </h3>
                <p className="font-mono text-sm text-[#B7B7C3]">
                  Score: {score} · Remaining Bricks: {bricksLeft}
                </p>
                <button
                  type="button"
                  onClick={() => initGame('playing')}
                  className="px-6 py-2.5 rounded-full bg-[#FF5E3A] text-white font-heading font-bold text-sm tracking-wider uppercase hover:bg-[#FF7352] transition-transform hover:scale-105 shadow-xl flex items-center gap-2 mx-auto"
                >
                  <RotateCcw size={16} />
                  <span>Try Again</span>
                </button>
              </div>
            )}

            {gameState === 'victory' && (
              <div className="space-y-4 animate-fadeIn">
                <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase font-bold">
                  ALL LETTERS CLEARED
                </span>
                <h3 className="text-3xl font-heading font-black text-white">
                  Breakout Master!
                </h3>
                <p className="font-mono text-sm text-[#B7B7C3]">
                  You successfully shipped AI THAT SHIPS! Score: {score}
                </p>
                <button
                  type="button"
                  onClick={() => initGame('playing')}
                  className="px-6 py-2.5 rounded-full bg-[#FF5E3A] text-white font-heading font-bold text-sm tracking-wider uppercase hover:bg-[#FF7352] transition-transform hover:scale-105 shadow-xl flex items-center gap-2 mx-auto"
                >
                  <RotateCcw size={16} />
                  <span>Play Again</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Control Strip Below Board */}
      <div className="max-w-4xl mx-auto mt-4 px-4 py-3 bg-[#111116] border border-[#292930] rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-6">
          <span className="text-[#71717A]">
            STATUS: <span className="text-white uppercase font-bold">{gameState}</span>
          </span>
          <span className="text-[#71717A]">
            SCORE: <span className="text-[#FF5E3A] font-bold">{score}</span>
          </span>
          <span className="text-[#71717A] hidden sm:inline">
            BRICKS: <span className="text-white font-bold">{bricksLeft}</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 text-[#B7B7C3] hover:text-white rounded border border-[#292930] hover:border-[#71717A] transition-colors"
            aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          <button
            type="button"
            onClick={() => initGame('playing')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F1E28] hover:bg-[#FF5E3A] text-[#F5F5F7] hover:text-white border border-[#292930] hover:border-[#FF5E3A] transition-all font-semibold"
          >
            <RotateCcw size={13} />
            <span>Restart</span>
          </button>
        </div>
      </div>
    </section>
  );
};

