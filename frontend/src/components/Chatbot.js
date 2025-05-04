import React, { useState } from 'react';
import {
  Webchat,
  WebchatProvider,
  Fab,
  getClient,
  Configuration,
} from '@botpress/webchat';

const clientId = '30b33ec7-7a4f-485e-bcc8-f9a10bfba171'; // Replace with your actual Botpress Cloud client ID

const configuration = {
  color: '#000', // Customize color as needed
};

const Chatbot = () => {
  const client = getClient({ clientId });
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      <WebchatProvider client={client} configuration={configuration}>
        <Fab onClick={toggleWebchat} />
        {isWebchatOpen && (
          <div
            style={{
              position: 'fixed',
              bottom: 80,
              right: 20,
              width: 350,
              height: 500,
              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <Webchat />
          </div>
        )}
      </WebchatProvider>
    </div>
  );
};

export default Chatbot;
