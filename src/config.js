const params = new URLSearchParams(window.location.search);
const clientSlug = params.get('client') || 'daiana-sebi';
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(clientSlug)) {
  throw new Error('Identificatorul invitației nu este valid.');
}
const { default: config } = await import(`../clients/${clientSlug}.json`, { with: { type: 'json' } });
export { config };
