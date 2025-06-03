'use client';

const CopilotIframe = () => (
  <div style={{ width: '100%', height: '600px' }}>
    <iframe
      src="https://copilotstudio.microsoft.com/environments/59b5fc9d-7450-ee4c-a9ab-f09e6ea84f82/bots/cr9b1_baibliophile/webchat?__version__=2"
      style={{ width: '100%', height: '100%', border: 'none' }}
      title="Copilot Chat"
    />
  </div>
);

export default CopilotIframe;
// This component renders an iframe that embeds a Copilot chat interface.