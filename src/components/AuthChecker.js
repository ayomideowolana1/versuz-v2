import React, { useEffect } from 'react'

export default function AuthChecker() {
    
    const hashKey = async (key) => {
        // Convert the key to a Uint8Array (byte array)
        const encoder = new TextEncoder();
        const data = encoder.encode(key);
      
        // Use the built-in SubtleCrypto API to create a SHA-256 hash
        return window.crypto.subtle.digest("SHA-256", data).then((hashArray) => {
          // Convert the hash to a hexadecimal string
          const hashHex = Array.from(new Uint8Array(hashArray))
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
          return hashHex;
        });
      };
      
      useEffect(()=>{
        const key = hashKey("");
      const originalKey = "mySecretKey";
      hashKey(originalKey)
            .then((hashedKey) => {
              // console.log("Original Key:", originalKey);
              // console.log("Hashed Key:", hashedKey);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
      })


  return (
    <div>AuthChecker</div>
  )
}
