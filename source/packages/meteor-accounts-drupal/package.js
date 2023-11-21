Package.describe({name: 'doow:accounts-drupal', version: '1.0.0', summary: 'Accounts login for drupal serwer using post.', documentation: 'README.md'});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  api.use('accounts-base', 'server');
  api.use('http', 'server');
  api.imply('accounts-base', ['client', 'server']);
  api.imply('accounts-password', ['client', 'server']);

  api.use('check');

  api.addFiles(['drupal_client.js'], 'client');
  api.addFiles(['drupal_server.js'], 'server');

  api.export('LDAP', 'server');
  api.export('DRUPAL_DEFAULTS', 'server');
});
