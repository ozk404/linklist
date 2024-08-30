'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function NFCReader() {
  const [status, setStatus] = useState('Ready to scan');
  const [serialNumber, setSerialNumber] = useState('');
  const [records, setRecords] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const startNfcScan = async () => {
      try {
        const ndef = new NDEFReader();
        await ndef.scan();
        setStatus('> Scan started');

        ndef.addEventListener('readingerror', () => {
          setStatus('Error reading NFC tag. Please try another one.');
          setSerialNumber('');
          setRecords([]);
          // Restart the scan
          startNfcScan();
        });

        ndef.addEventListener('reading', ({ message, serialNumber }) => {
          setSerialNumber(serialNumber);
          const recordsData = message.records.map((record, index) => {
            return `Record ${index}: ${JSON.stringify(record)}`;
          });

          if (serialNumber === "e3:0a:2c:10") {
            router.push('/ozk404');  // Redirect using Next.js Router
            return;
          }

          setRecords(recordsData);
          setStatus('> Scan started');  // Keep scanning
          startNfcScan();  // Restart the scan to keep scanning continuously
        });
      } catch (error) {
        setStatus(`Error: ${error}`);
        setSerialNumber('');
        setRecords([]);
        // Restart the scan
        startNfcScan();
      }
    };

    if (status === '> Scan started') {
      startNfcScan();
    }
  }, [status, router]);

  const handleScanClick = () => {
    setStatus('> Scan started');
  };

  return (
    <div className='text-center'>
    <button
      type="submit"
      onClick={handleScanClick}
className={"w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" }
  >¡Empieza a escanéar ahora!</button>
      
      <p><strong>Status:</strong> {status}</p>
      {serialNumber && (
        <div>
          <p><strong>Serial Number:</strong> {serialNumber}</p>
          <p><strong>Records:</strong></p>
          <ul>
            {records.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NFCReader;
