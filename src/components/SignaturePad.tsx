import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

export type SignaturePadHandle = { toDataURL: () => string | null; clear: () => void; isEmpty: () => boolean };

export const SignaturePad = forwardRef<SignaturePadHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const emptyRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#111";
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const pos = (e: PointerEvent | React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: (e as PointerEvent).clientX - r.left, y: (e as PointerEvent).clientY - r.top };
  };

  useImperativeHandle(ref, () => ({
    toDataURL: () => emptyRef.current ? null : canvasRef.current!.toDataURL("image/png"),
    clear: () => {
      const c = canvasRef.current!;
      c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
      emptyRef.current = true;
    },
    isEmpty: () => emptyRef.current,
  }));

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        className="signature-box"
        onPointerDown={(e) => {
          drawingRef.current = true;
          emptyRef.current = false;
          const ctx = canvasRef.current!.getContext("2d")!;
          const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y);
        }}
        onPointerMove={(e) => {
          if (!drawingRef.current) return;
          const ctx = canvasRef.current!.getContext("2d")!;
          const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke();
        }}
        onPointerUp={() => { drawingRef.current = false; }}
        onPointerLeave={() => { drawingRef.current = false; }}
      />
    </div>
  );
});
SignaturePad.displayName = "SignaturePad";
