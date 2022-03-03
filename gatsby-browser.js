// ref: https://www.gatsbyjs.com/docs/how-to/performance/add-offline-support-with-a-service-worker/#displaying-a-message-when-a-service-worker-updates

// for more details: https://github.com/gatsbyjs/gatsby/issues/9087

// eslint-disable-next-line import/prefer-default-export
export const onServiceWorkerUpdateReady = () => {
  // eslint-disable-next-line no-alert
  const answer = window.confirm(
    'This application has been updated. 🚀 '
        + 'Reload to display the latest version?',
  );
  if (answer === true) {
    window.location.reload();
  }
};
