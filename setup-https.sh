#!/bin/bash

# setup-https.sh - Script to set up HTTPS for AR-Classroom local development
# This script provides multiple methods to enable HTTPS for local testing

# Text formatting
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Current directory
CURRENT_DIR=$(pwd)
CERT_DIR="$CURRENT_DIR/certificates"

# Print header
echo -e "${BOLD}=======================================${NC}"
echo -e "${BOLD}  AR-Classroom HTTPS Setup Assistant   ${NC}"
echo -e "${BOLD}=======================================${NC}"
echo ""

# Check for required tools
check_dependencies() {
    echo -e "${BOLD}Checking dependencies...${NC}"
    
    # Check for http-server
    if ! command -v http-server &> /dev/null; then
        echo -e "${YELLOW}http-server not found. Installing...${NC}"
        npm install -g http-server
        if [ $? -ne 0 ]; then
            echo -e "${RED}Failed to install http-server. Please install manually with 'npm install -g http-server'${NC}"
            exit 1
        fi
    else
        echo -e "${GREEN}✓ http-server found${NC}"
    fi
    
    echo ""
}

# Method 1: Using ngrok
setup_ngrok() {
    echo -e "${BOLD}Setting up HTTPS with ngrok...${NC}"
    
    # Check if ngrok is installed
    if ! command -v ngrok &> /dev/null; then
        echo -e "${YELLOW}ngrok not found. Installing...${NC}"
        if command -v brew &> /dev/null; then
            brew install ngrok
        else
            npm install -g ngrok
        fi
        
        if [ $? -ne 0 ]; then
            echo -e "${RED}Failed to install ngrok. Please install manually from https://ngrok.com/download${NC}"
            exit 1
        fi
    else
        echo -e "${GREEN}✓ ngrok found${NC}"
    fi
    
    # Start http-server in background
    echo -e "${YELLOW}Starting http-server on port 8080...${NC}"
    http-server -p 8080 &
    HTTP_SERVER_PID=$!
    
    # Give server time to start
    sleep 2
    
    # Start ngrok
    echo -e "${YELLOW}Starting ngrok tunnel...${NC}"
    echo -e "${YELLOW}When you're done testing, press Ctrl+C to stop both servers${NC}"
    echo ""
    echo -e "${BOLD}Your AR application will be available at the https:// URL below:${NC}"
    echo ""
    
    # Start ngrok and capture its process
    ngrok http 8080
    
    # Kill http-server when ngrok exits
    kill $HTTP_SERVER_PID
}

# Method 2: Self-signed certificates
setup_self_signed() {
    echo -e "${BOLD}Setting up HTTPS with self-signed certificates...${NC}"
    
    # Create certificates directory if it doesn't exist
    if [ ! -d "$CERT_DIR" ]; then
        mkdir -p "$CERT_DIR"
    fi
    
    # Generate self-signed certificate if it doesn't exist
    if [ ! -f "$CERT_DIR/cert.pem" ] || [ ! -f "$CERT_DIR/key.pem" ]; then
        echo -e "${YELLOW}Generating self-signed certificate...${NC}"
        openssl req -newkey rsa:2048 -new -nodes -x509 -days 365 -keyout "$CERT_DIR/key.pem" -out "$CERT_DIR/cert.pem" -subj "/CN=localhost"
        
        if [ $? -ne 0 ]; then
            echo -e "${RED}Failed to generate certificates. Please check if openssl is installed.${NC}"
            exit 1
        else
            echo -e "${GREEN}✓ Certificates generated successfully${NC}"
        fi
    else
        echo -e "${GREEN}✓ Certificates already exist${NC}"
    fi
    
    # Get local IP address
    if command -v ipconfig &> /dev/null; then
        # Windows
        IP_ADDRESS=$(ipconfig | grep -i "IPv4 Address" | head -1 | awk '{print $NF}')
    else
        # macOS/Linux
        IP_ADDRESS=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | head -1)
    fi
    
    echo -e "${YELLOW}Starting http-server with HTTPS on port 8443...${NC}"
    echo -e "${GREEN}Your AR application will be available at:${NC}"
    echo -e "${BOLD}https://localhost:8443${NC} ${YELLOW}(on this computer)${NC}"
    
    if [ ! -z "$IP_ADDRESS" ]; then
        echo -e "${BOLD}https://$IP_ADDRESS:8443${NC} ${YELLOW}(on mobile devices)${NC}"
        echo -e "${YELLOW}Note: You will need to accept certificate warnings on your device${NC}"
    fi
    
    echo -e "${YELLOW}Press Ctrl+C to stop the server when done${NC}"
    echo ""
    
    # Start http-server with HTTPS
    http-server -S -C "$CERT_DIR/cert.pem" -K "$CERT_DIR/key.pem" -p 8443
}

# Main menu
check_dependencies

echo -e "${BOLD}Choose HTTPS setup method:${NC}"
echo "1) Use ngrok (Recommended for quick testing)"
echo "2) Use self-signed certificates"
echo "3) Exit"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        setup_ngrok
        ;;
    2)
        setup_self_signed
        ;;
    3)
        echo -e "${YELLOW}Exiting setup assistant.${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice. Exiting.${NC}"
        exit 1
        ;;
esac