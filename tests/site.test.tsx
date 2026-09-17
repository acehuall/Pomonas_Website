import { act, fireEvent, render, renderHook, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from '../App';
import { products } from '../data/products';
import { useFormspree } from '../hooks/useFormspree';

function open(path: string) {
  window.history.replaceState({}, '', path);
  return render(<App />);
}

async function fillContact() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Name *'), 'Test Visitor');
  await user.type(screen.getByLabelText('Email *'), 'visitor@example.com');
  return user;
}

describe('contact form', () => {
  it('requires a name and a valid email without sending invalid data', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    open('/contact');
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Submit Message' }));
    expect(fetchMock).not.toHaveBeenCalled();
    await user.type(screen.getByLabelText('Name *'), 'Test');
    await user.type(screen.getByLabelText('Email *'), 'invalid');
    await user.click(screen.getByRole('button', { name: 'Submit Message' }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect((screen.getByLabelText('Email *') as HTMLInputElement).checkValidity()).toBe(false);
  });

  it.each(products)('prefills the order enquiry for $name', (product) => {
    open(`/contact?product=${product.id}`);
    expect((screen.getByLabelText('How can we help?') as HTMLSelectElement).value).toBe('Order enquiry');
    expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toBe(`I'd like to order: ${product.name}`);
  });

  it('ignores an unknown product safely', () => {
    open('/contact?product=unknown');
    expect((screen.getByLabelText('How can we help?') as HTMLSelectElement).value).toBe('Recipe Development');
    expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toBe('');
  });

  it('sends controlled values once, shows loading and replaces the form on success', async () => {
    let finish!: (response: Response) => void;
    const fetchMock = vi.fn((_url: RequestInfo | URL, _options?: RequestInit) => new Promise<Response>(resolve => { finish = resolve; }));
    vi.stubGlobal('fetch', fetchMock);
    open('/contact?product=3');
    const user = await fillContact();
    await user.click(screen.getByRole('button', { name: 'Submit Message' }));
    const sending = screen.getByRole('button', { name: 'Sending…' }) as HTMLButtonElement;
    expect(sending.disabled).toBe(true);
    fireEvent.submit(sending.closest('form')!);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, request] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://formspree.io/f/contact-test');
    expect(request.method).toBe('POST');
    expect(JSON.parse(request.body as string)).toEqual({
      name: 'Test Visitor', email: 'visitor@example.com', subject: 'Order enquiry',
      message: "I'd like to order: Pomona's Green Cap",
    });
    await act(async () => finish(new Response('{}', { status: 200 })));
    expect(screen.getByRole('status').textContent).toBe("Thanks — we'll be in touch soon.");
    expect(screen.queryByLabelText('Name *')).toBeNull();
  });

  it.each(['http', 'network', 'configuration'])('offers email fallback after a %s failure and preserves entered text', async (failure) => {
    const fetchMock = vi.fn();
    if (failure === 'network') fetchMock.mockRejectedValue(new Error('Offline'));
    else fetchMock.mockResolvedValue(new Response('{}', { status: 422 }));
    if (failure === 'configuration') vi.stubEnv('VITE_FORMSPREE_CONTACT_ID', '');
    vi.stubGlobal('fetch', fetchMock);
    open('/contact');
    const user = await fillContact();
    await user.type(screen.getByLabelText('Message'), 'Please keep this message.');
    await user.click(screen.getByRole('button', { name: 'Submit Message' }));
    const error = await screen.findByRole('alert');
    expect(within(error).getByRole('link').getAttribute('href')).toBe('mailto:hello@pomona.studio');
    expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toBe('Please keep this message.');
    expect((screen.getByRole('button', { name: 'Submit Message' }) as HTMLButtonElement).disabled).toBe(false);
    if (failure === 'configuration') expect(fetchMock).not.toHaveBeenCalled();
    else {
      fetchMock.mockResolvedValue(new Response('{}', { status: 200 }));
      await user.click(screen.getByRole('button', { name: 'Submit Message' }));
      expect(await screen.findByRole('status')).toBeTruthy();
    }
  });
});

describe('newsletter', () => {
  it('requires an email, submits with Enter and prevents duplicate submission', async () => {
    let finish!: (response: Response) => void;
    const fetchMock = vi.fn((_url: RequestInfo | URL, _options?: RequestInit) => new Promise<Response>(resolve => { finish = resolve; }));
    vi.stubGlobal('fetch', fetchMock);
    open('/');
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Join the list' }));
    expect(fetchMock).not.toHaveBeenCalled();
    await user.type(screen.getByLabelText('Email for newsletter'), 'subscriber@example.com{Enter}');
    const sending = screen.getByRole('button', { name: 'Sending…' }) as HTMLButtonElement;
    expect(sending.disabled).toBe(true);
    fireEvent.submit(sending.closest('form')!);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe('https://formspree.io/f/newsletter-test');
    await act(async () => finish(new Response('{}', { status: 200 })));
    expect(screen.getByRole('status').textContent).toBe("Thanks — you're on the list.");
    expect(screen.queryByLabelText('Email for newsletter')).toBeNull();
  });

  it('shows an error and allows retry without losing the email', async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(new Error('Offline')).mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    open('/');
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Email for newsletter'), 'subscriber@example.com{Enter}');
    expect(await screen.findByRole('alert')).toBeTruthy();
    expect((screen.getByLabelText('Email for newsletter') as HTMLInputElement).value).toBe('subscriber@example.com');
    await user.click(screen.getByRole('button', { name: 'Join the list' }));
    expect(await screen.findByRole('status')).toBeTruthy();
  });

  it('handles missing newsletter configuration without a request', async () => {
    vi.stubEnv('VITE_FORMSPREE_NEWSLETTER_ID', '');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    open('/');
    await userEvent.setup().type(screen.getByLabelText('Email for newsletter'), 'subscriber@example.com{Enter}');
    expect(await screen.findByRole('alert')).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

it('times out a stalled request and releases the submission lock', async () => {
  vi.useFakeTimers();
  const fetchMock = vi.fn((_url, options: RequestInit) => new Promise((_resolve, reject) => {
    options.signal?.addEventListener('abort', () => reject(new Error('Aborted')));
  }));
  vi.stubGlobal('fetch', fetchMock);
  const { result } = renderHook(() => useFormspree('test'));
  act(() => { void result.current.submit({ email: 'visitor@example.com' }); });
  expect(result.current.status).toBe('sending');
  await act(async () => { await vi.advanceTimersByTimeAsync(20000); });
  expect(result.current.status).toBe('error');
  fetchMock.mockResolvedValueOnce(new Response('{}', { status: 200 }));
  await act(async () => { await result.current.submit({ email: 'visitor@example.com' }); });
  expect(result.current.status).toBe('success');
});

describe('navigation and shared product data', () => {
  it.each(['/', '/about', '/services', '/merchandise', '/contact', '/missing'])('renders %s with no placeholder links and correctly attributed images', (path) => {
    const { container } = open(path);
    for (const anchor of container.querySelectorAll('a')) {
      expect(anchor.getAttribute('href')).toMatch(/^(\/|mailto:)/);
      expect(anchor.textContent?.trim() || anchor.getAttribute('aria-label')).toBeTruthy();
    }
    for (const image of container.querySelectorAll('img')) {
      expect(Number(image.getAttribute('width'))).toBeGreaterThan(0);
      expect(Number(image.getAttribute('height'))).toBeGreaterThan(0);
      expect(image.getAttribute('decoding')).toBe('async');
      expect(image.alt).toBeTruthy();
      expect(image.getAttribute('fetchpriority') === 'high' || image.getAttribute('loading') === 'lazy').toBe(true);
    }
  });

  it('uses the shared names and prices on Home, and its calls to action navigate', async () => {
    open('/');
    for (const product of products.filter(p => p.featured)) {
      const link = screen.getByRole('link', { name: new RegExp(product.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
      expect(link.textContent).toContain(product.price);
      expect(link.getAttribute('href')).toBe('/merchandise');
    }
    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: 'Explore Our Services' }));
    expect(window.location.pathname).toBe('/services');
    for (const link of screen.getAllByRole('link', { name: "Let's talk" })) expect(link.getAttribute('href')).toBe('/contact');
    await user.click(screen.getByRole('link', { name: 'Start a Project' }));
    expect(window.location.pathname).toBe('/contact');
  });

  it('every enquiry link selects the matching product and order link works', async () => {
    open('/merchandise');
    const user = userEvent.setup();
    for (const product of products) {
      const card = screen.getByRole('heading', { name: product.name }).parentElement!.parentElement!;
      expect(card.textContent).toContain(product.price);
      await user.click(within(card).getByRole('link', { name: 'Enquire' }));
      expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toBe(`I'd like to order: ${product.name}`);
      await user.click(screen.getByRole('link', { name: 'Merchandise' }));
    }
    await user.click(screen.getByRole('link', { name: 'Email to Order' }));
    expect(window.location.pathname).toBe('/contact');
  });

  it('mobile menu announces its state, closes on navigation and Escape, and makes hidden links inert', async () => {
    open('/');
    const user = userEvent.setup();
    const toggle = screen.getByRole('button', { name: 'Toggle menu' });
    const menu = document.getElementById('mobile-navigation')!;
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(menu.hasAttribute('inert')).toBe(true);
    await user.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(menu.hasAttribute('inert')).toBe(false);
    await user.click(within(menu).getByRole('link', { name: 'About' }));
    expect(window.location.pathname).toBe('/about');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    await user.click(toggle);
    await user.keyboard('{Escape}');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
    await user.click(toggle);
    await user.click(within(menu).getByRole('link', { name: 'About' }));
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('unknown routes have a working home link', async () => {
    open('/does-not-exist');
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeTruthy();
    await userEvent.setup().click(screen.getByRole('link', { name: 'Back to Home' }));
    expect(window.location.pathname).toBe('/');
  });
});
