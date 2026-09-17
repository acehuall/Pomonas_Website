import { useRef, useState } from 'react';

export function useFormspree(formId: string | undefined) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const pending = useRef(false);

  async function submit(fields: Record<string, string>) {
    if (pending.current) return;
    pending.current = true;
    setStatus('sending');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      if (!formId?.trim()) throw new Error('Form is not configured');
      const response = await fetch(`https://formspree.io/f/${encodeURIComponent(formId.trim())}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      window.clearTimeout(timeout);
      pending.current = false;
    }
  }

  return { status, submit };
}
