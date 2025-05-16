# Setting Up HTTPS for Local AR Development

This guide provides several methods to enable HTTPS for local development of your AR Classroom application, which is necessary for camera access on mobile devices.

## Option 1: Using ngrok (Fastest Method)

[ngrok](https://ngrok.com/) creates a secure tunnel to your local server with a temporary HTTPS URL.

### Installation

```bash
# Using npm
npm install -g ngrok

# Or using Homebrew on macOS
brew install ngrok
```

### Usage

1. Start your local server first:
   ```bash
   cd MTIT/AR-Classroom
   http-server -p 8080
   ```

2. In a new terminal window, create the secure tunnel:
   ```bash
   ngrok http 8080
   ```

3. Use the HTTPS URL provided by ngrok (e.g., `https://a1b2c3d4.ngrok.io`) on your mobile device.

## Option 2: Self-Signed Certificates with http-server

### Generate Self-Signed Certificate

```bash
# Create a directory for certificates
mkdir MTIT/AR-Classroom/certificates
cd MTIT/AR-Classroom/certificates

# Generate key and certificate
openssl req -newkey rsa:2048 -new -nodes -x509 -days 365 -keyout key.pem -out cert.pem
```

### Start http-server with HTTPS

```bash
cd MTIT/AR-Classroom
http-server -S -C certificates/cert.pem -K certificates/key.pem -p 8443
```

Access your application at `https://localhost:8443` or `https://[your-ip-address]:8443`.

> **Note**: You'll need to accept security warnings in your browser since the certificate is self-signed.

## Option 3: Using mkcert (More Secure Method)

[mkcert](https://github.com/FiloSottile/mkcert) creates locally-trusted certificates that browsers will accept.

### Installation

```bash
# macOS with Homebrew
brew install mkcert
brew install nss  # for Firefox support

# Windows with chocolatey
choco install mkcert

# Linux
# See mkcert GitHub page for distribution-specific instructions
```

### Setup

```bash
# Install local CA
mkcert -install

# Generate certificate for localhost and your IP address
cd MTIT/AR-Classroom
mkcert localhost 127.0.0.1 [your-ip-address]
```

### Start Server with HTTPS

```bash
http-server -S -C localhost+2.pem -K localhost+2-key.pem -p 8443
```

## Option 4: Deploy to GitHub Pages (For Testing)

For quick testing, you can deploy to GitHub Pages which provides HTTPS by default:

1. Create a GitHub repository
2. Push your AR-Classroom files to the repository
3. Enable GitHub Pages in repository settings
4. Access your app at `https://[username].github.io/[repository]/`

## Option 5: Simplified Local Testing with Netlify CLI

[Netlify CLI](https://docs.netlify.com/cli/get-started/) provides local HTTPS development with minimal setup.

### Installation & Usage

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to your project folder
cd MTIT/AR-Classroom

# Start development server with HTTPS
netlify dev
```

This automatically opens a browser with a secure local URL.

## Troubleshooting

- **Certificate not trusted**: Install the certificate in your device's trust store or use mkcert
- **Camera still not working**: Ensure your device is on the same network as your development machine
- **CORS issues**: Add appropriate CORS headers if loading resources from different origins
- **iOS issues**: iOS Safari has stricter security requirements; mkcert or a real deployed HTTPS server often works best