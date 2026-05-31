import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <div id="modal" class="modal hidden">
        <div class="window">
          <span></span>
          <button>Restart</button>
        </div>
      </div>
    `;
    });

    it('should show modal with text and handle reset', () => {
        const onReset = vi.fn();
        Modal.show({ text: 'Test Win', onReset });

        const modal = document.getElementById('modal');
        expect(modal?.classList.contains('hidden')).toBe(false);
        expect(modal?.querySelector('span')?.innerText).toBe('Test Win');

        const btn = modal?.querySelector('button');
        btn?.click();
        expect(onReset).toHaveBeenCalled();
        expect(modal?.classList.contains('hidden')).toBe(true);
    });
});