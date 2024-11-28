import React, { useState } from 'react';
import { WhatsApp } from '@mui/icons-material';

const FloatingWhatsAppButton: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  // const phoneNumber = '8660771074';  
  // const whatsappUrl = `https://wa.me/${phoneNumber}`;

  const handleClick = () => {
    setShowQR(true);
  };

  const handleCloseQR = () => {
    setShowQR(false);
  };

  return (
    <div>
      <div className="fixed bottom-4 right-4 z-20">
        <button
          onClick={handleClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg focus:outline-none"
        >
          <WhatsApp style={{ fontSize: '30px' }} />
        </button>
      </div>

      {/* QR Code Pop-up */}
      {showQR && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h3 className="text-lg font-bold mb-4">Scan QR Code to Chat</h3>
            <p className="mb-4">Use your phone's WhatsApp to scan the code below and start chatting:</p>
            <div className='flex justify-center'>
            {/* <QRCode  value={whatsappUrl} size={150} /> */}
            </div>
            <div className="mt-4">
              <button
                onClick={handleCloseQR}
                className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingWhatsAppButton;
