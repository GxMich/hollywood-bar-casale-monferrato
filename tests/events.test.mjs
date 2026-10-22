import test from 'node:test';
import assert from 'node:assert/strict';
import { getUpcomingEvents, formatEventDate, formatEventTime, getSafeEventLink } from '../src/events.js';

const now = new Date('2026-10-21T20:00:00+02:00');
const event = (overrides = {}) => ({ id:'example', title:'Evento di test', confirmed:true, start:'2026-10-23T21:00:00+02:00', end:'2026-10-24T01:00:00+02:00', ...overrides });

test('il programma vuoto rimane vuoto', () => {
  assert.deepEqual(getUpcomingEvents([], now), []);
});

test('esclude eventi non confermati, scaduti o incompleti', () => {
  const data = [event({confirmed:false}), event({end:'2026-10-20T22:00:00+02:00'}), event({start:'invalid'}), event({end:null}), event({title:' '}), event({end:'2026-10-23T20:00:00+02:00'})];
  assert.deepEqual(getUpcomingEvents(data, now), []);
});

test('mantiene un appuntamento in corso fino all’orario di fine', () => {
  const current = event({start:'2026-10-21T19:00:00+02:00',end:'2026-10-21T23:00:00+02:00'});
  assert.equal(getUpcomingEvents([current], now).length, 1);
  assert.equal(getUpcomingEvents([current], '2026-10-21T23:00:00+02:00').length, 0);
});

test('ordina il programma senza mutare i dati originali', () => {
  const later = event({id:'later',start:'2026-10-25T21:00:00+01:00',end:'2026-10-25T23:00:00+01:00'});
  const earlier = event({id:'earlier'});
  const input = [later, earlier];
  assert.deepEqual(getUpcomingEvents(input, now).map(item=>item.id), ['earlier','later']);
  assert.deepEqual(input.map(item=>item.id), ['later','earlier']);
});

test('data e ora seguono Europe/Rome anche oltre la mezzanotte UTC', () => {
  assert.match(formatEventDate('2026-07-10T23:30:00Z'), /^11 lug/);
  assert.equal(formatEventTime('2026-07-10T23:30:00Z'), '01:30');
  assert.equal(formatEventTime('2026-12-10T20:00:00Z'), '21:00');
});

test('le azioni esterne degli eventi accettano soltanto URL HTTPS validi', () => {
  assert.equal(getSafeEventLink('https://example.com/evento'), 'https://example.com/evento');
  for (const value of ['javascript:alert(1)', 'data:text/html,hi', 'http://example.com', '/undefined', null]) assert.equal(getSafeEventLink(value), null);
});
