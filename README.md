# Homomorphic Encryption Demo using Paillier-Bigint

This repository provides a practical demonstration of **homomorphic encryption** using the **paillier-bigint** library. Homomorphic encryption allows you to perform computations on encrypted data without needing to decrypt it, ensuring that sensitive information remains protected throughout the process.

## What Is Homomorphic Encryption?

Homomorphic encryption is a cryptographic technique that enables computations to be performed on encrypted data without decryption. This means you can use external services or computing resources to process data while keeping it encrypted, protecting privacy and security.

### Why Is Homomorphic Encryption Useful?

Homomorphic encryption has a wide range of applications across various industries:

- **Cloud Computing**: Enables third-party cloud providers to perform operations on encrypted data without accessing the original data.
- **Healthcare**: Allows for the analysis of patient data in encrypted form, maintaining privacy while enabling medical research or diagnosis.
- **Finance**: Banks and insurance companies can perform risk analysis or market predictions on encrypted customer data.
- **Government Agencies**: Helps protect sensitive government data while still allowing for statistical analysis and decision-making.

## Demo Overview

This demo demonstrates the additive homomorphism property of Paillier encryption using the **paillier-bigint** JavaScript library. With Paillier encryption, you can perform addition and scalar multiplication on encrypted values without needing to decrypt them.

### Demo Steps

1. **Generate Public and Private Keys**  
   We generate a public-private key pair for encryption and decryption using the following code:

   ```typescript
   const generateKeys = async () => {
     const { publicKey, privateKey } = await paillier.generateRandomKeys(2048);
     return { publicKey, privateKey };
   };
   ```

2. **Encrypt Data**  
    We encrypt integer values using the public key:

   ```typescript
   const encryptNumber = (value: number, publicKey: any) => {
     return publicKey.encrypt(BigInt(value));
   };
   ```

3. **Perform Addition on Encrypted Data**  
    Encrypted values can be added together without decrypting them:

   ```typescript
   const homomorphicAddition = (enc1: bigint, enc2: bigint, publicKey: any) => {
     return publicKey.addition(enc1, enc2);
   };
   ```

4. **Decrypt the Result**  
    The result of the encrypted addition is decrypted to verify the operation:

   ```typescript
   const decryptNumber = (encrypted: bigint, privateKey: any) => {
     return privateKey.decrypt(encrypted).toString();
   };
   ```

## Try the Demo

You can explore the **Homomorphic Encryption Demo** live and interact with the encryption process yourself. This demo showcases how you can securely perform addition on encrypted numbers using the **paillier-bigint** library.

### Live Demo

Click [here](https://homomorphic-encryption-demo-git-main-dan01240s-projects.vercel.app/) to try the demo live and experience homomorphic encryption in action.
![Alt text for the image](https://github.com/user-attachments/assets/cd37a59d-dddf-4c52-bed3-745ef6c1384b)

### Running the Demo Locally

If you'd prefer to run the demo on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/dan01240/homomorphic-encryption-demo.git
```

### 2. Install Dependencies

Navigate into the project directory and install the required packages:

```bash
cd homomorphic-encryption-demo
npm install
```

### 3. Run the Project

Start the project on your local server:

```bash
Copy code
npm run dev
```

This will launch the demo on localhost:3000, where you can interact with the homomorphic encryption demo in your browser.

### 4. Explore the Demo

Input two numbers: Enter two integers in the input fields provided.
Encrypt the numbers: When you click the "Encrypt and Calculate" button, the numbers will be encrypted using Paillier encryption.
Perform addition on encrypted values: The demo performs addition on the encrypted numbers without decrypting them.
Decrypt the result: Finally, the encrypted sum is decrypted to verify the operation.
You can observe the encrypted numbers and their operations without revealing the original data.

## Learn More

For a detailed explanation of homomorphic encryption and how the demo works, check out this [Medium article](https://medium.com/@daiki01240/homomorphic-encryption-how-it-enables-secure-computation-on-encrypted-data-fcde02531c19) that covers the technical details behind the demo.
