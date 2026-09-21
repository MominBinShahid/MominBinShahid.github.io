/*
  Self-destroying service worker.

  The old site shipped gatsby-plugin-offline, which registered a worker at "/".
  Scope "/" means that worker sees the whole origin - including /MealUnits/,
  which is a different app that people depend on to dose insulin.

  Returning visitors still have it installed. Removing it from the build does not
  remove it from their browsers: they keep being served a cached copy of a site
  that no longer exists. The only way out is to ship something at the same URL
  that takes over and then removes itself.

  Three rules this file exists to honour. The facts behind them were confirmed
  with the MealUnits project directly rather than guessed at.

  1. caches.keys() is ORIGIN-wide, not app-wide. A "delete everything" cleanup
     would wipe MealUnits' caches. So deletion works off an explicit allowlist of
     prefixes known to belong to the old Gatsby worker. Anything not on the list
     is left alone, forever. Allowlist, never denylist.

     MealUnits' caches are all prefixed `mealunits-`. That prefix must never be
     added below.

     Note the arrangement is symmetrical and each file only shows half of it:
     MealUnits' own worker filters caches.keys() DOWN to `mealunits-` and deletes
     only those. So the same prefix is load-bearing in both directions - this
     worker must never delete it, that one must delete nothing else. Changing
     either side without the other breaks a site that is not the one you edited.

  2. IndexedDB is never touched. MealUnits opens a database named exactly
     `MealUnits`, and that database is the ONLY copy of the user's prescription -
     target, insulin sensitivity factor, carb ratio - plus their injection log and
     readings. No server, no account, no backup. Deleting it is unrecoverable loss
     of medical data, and it would also take out the app's fail-closed screen,
     which reads a frozen copy of those settings when everything else has broken.

     The orphaned keys the old worker left behind are a few kilobytes of nothing.
     There is no version of this trade worth making.

  3. Only our own registration is removed. self.registration is this worker at
     "/", never MealUnits' worker at "/MealUnits/". Unregistering a scope you do
     not own is not ours to do.

  This file keeps shipping indefinitely. There is no way to know the last stale
  client has come back, so there is no point at which removing it is safe.
*/

const DELETE_PREFIXES = ['gatsby-plugin-offline', 'workbox-'];

/** Never delete a cache under these, whatever else changes above. */
const NEVER_DELETE_PREFIXES = ['mealunits-'];

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      const ours = names.filter(
        (name) =>
          DELETE_PREFIXES.some((p) => name.startsWith(p)) &&
          !NEVER_DELETE_PREFIXES.some((p) => name.startsWith(p)),
      );
      await Promise.all(ours.map((name) => caches.delete(name)));

      await self.registration.unregister();

      // Pages open right now are still being served the old worker's cached
      // responses, so reload them onto the real site. matchAll only returns
      // clients this worker controls, and /MealUnits/ is controlled by its own
      // more-specific worker - but skip it explicitly rather than rely on that.
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        if (new URL(client.url).pathname.startsWith('/MealUnits/')) continue;
        client.navigate(client.url);
      }
    })(),
  );
});

// Network only. Nothing is cached here; this worker exists to leave.
self.addEventListener('fetch', () => {});
